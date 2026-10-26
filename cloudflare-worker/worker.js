// Gaslands Refuelled Table Relay
// Uses Cloudflare Durable Object WebSocket Hibernation API:
// - ZERO duration (GB-s) charges while waiting (the DO hibernates in memory)
// - ZERO KV operations (no KV read/write quotas burned)
// - Instant real-time push: when a player rolls or changes gear, all table mates update immediately.

export class GameTable {
    constructor(state, env) {
        this.state = state;
        this.ctx = state; // state is DurableObjectState (or ctx)
        this.env = env;

        // In-memory table state (persisted in DO storage or memory while active)
        this.roomCode = null;
        this.tableName = null;
        this.pin = null;
        this.turn = 1;
        this.phase = 1;
        this.rollHistory = [];
        this.lobbyTables = new Map(); // Only used on '__lobby__' DO
    }

    async fetch(request) {
        const url = new URL(request.url);

        // Internal HTTP API for the __lobby__ DO singleton
        if (request.method === "POST" && (url.pathname === "/internal/register" || url.pathname === "/register")) {
            const data = await request.json();
            if (this.lobbyTables) {
                this.lobbyTables.set(data.roomCode, {
                    roomCode: data.roomCode,
                    tableName: data.tableName,
                    hasPin: !!data.hasPin,
                    playerCount: data.playerCount || 0,
                    updatedAt: Date.now()
                });
            }
            return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
        }

        if (request.method === "POST" && (url.pathname === "/internal/unregister" || url.pathname === "/unregister")) {
            const data = await request.json();
            if (this.lobbyTables) {
                this.lobbyTables.delete(data.roomCode);
            }
            return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
        }

        if (request.method === "GET" && (url.pathname === "/internal/list" || url.pathname === "/list")) {
            const now = Date.now();
            if (this.lobbyTables) {
                for (const [code, info] of this.lobbyTables.entries()) {
                    if (now - info.updatedAt > 2 * 60 * 60 * 1000) {
                        this.lobbyTables.delete(code);
                    }
                }
                const list = Array.from(this.lobbyTables.values()).sort((a, b) => b.updatedAt - a.updatedAt);
                return new Response(JSON.stringify({ tables: list }), {
                    headers: { "Content-Type": "application/json" }
                });
            }
            return new Response(JSON.stringify({ tables: [] }), { headers: { "Content-Type": "application/json" } });
        }

        // WebSocket Upgrade Handling
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader.toLowerCase() !== "websocket") {
            return new Response("Expected WebSocket upgrade", { status: 426 });
        }

        const roomCode = url.searchParams.get("room") || "";
        const reqPin = url.searchParams.get("pin") || "";
        const reqTableName = (url.searchParams.get("tableName") || "").trim().slice(0, 24);

        if (!this.roomCode && roomCode) {
            this.roomCode = roomCode;
        }
        if (!this.tableName && reqTableName) {
            this.tableName = reqTableName;
        }
        if (this.pin === null && /^\d{4}$/.test(reqPin)) {
            this.pin = reqPin;
        }

        // Verify PIN if table is password protected
        if (this.pin !== null && this.pin !== reqPin) {
            const pair = new WebSocketPair();
            const [client, server] = [pair[0], pair[1]];
            server.accept();
            server.send(JSON.stringify({
                type: "ERROR",
                code: "INVALID_PIN",
                message: "Incorrect 4-digit PIN for this table."
            }));
            setTimeout(() => {
                try { server.close(4001, "Invalid PIN"); } catch (_) {}
            }, 100);

            return new Response(null, {
                status: 101,
                webSocket: client,
            });
        }

        const pair = new WebSocketPair();
        const [client, server] = [pair[0], pair[1]];

        // Accept WebSocket with Cloudflare Hibernation API:
        // When client is idle, DO evicts from memory and incurs 0 duration billing!
        if (this.ctx && typeof this.ctx.acceptWebSocket === "function") {
            this.ctx.acceptWebSocket(server);
        } else if (this.state && typeof this.state.acceptWebSocket === "function") {
            this.state.acceptWebSocket(server);
        } else {
            server.accept();
        }

        // Attach initial metadata to the hibernatable WebSocket
        try {
            server.serializeAttachment({
                playerId: null,
                teamName: "Anonymous Driver",
                sponsor: "Sponsorless",
                vehicles: []
            });
        } catch (_) {}

        return new Response(null, {
            status: 101,
            webSocket: client,
        });
    }

    // Called automatically by Cloudflare runtime when a hibernated WebSocket receives a message
    async webSocketMessage(ws, message) {
        try {
            const data = typeof message === "string" ? JSON.parse(message) : JSON.parse(new TextDecoder().decode(message));
            this.handleMessage(ws, data);
        } catch (err) {
            console.error("Failed to parse WebSocket message:", err);
        }
    }

    // Called automatically by Cloudflare runtime when a client disconnects
    async webSocketClose(ws, code, reason, wasClean) {
        let attachment = null;
        try {
            attachment = ws.deserializeAttachment ? ws.deserializeAttachment() : null;
        } catch (_) {}

        if (attachment && attachment.playerId) {
            this.broadcastExcept(ws, {
                type: "PLAYER_LEFT",
                playerId: attachment.playerId,
                teamName: attachment.teamName,
                activePlayers: this.getActiveTeamNames(ws)
            });
        }

        try { ws.close(code, reason); } catch (_) {}
        this.syncLobby();
    }

    async webSocketError(ws, error) {
        try { ws.close(1011, "WebSocket error"); } catch (_) {}
    }

    handleMessage(ws, data) {
        let attachment = {};
        try {
            attachment = ws.deserializeAttachment ? (ws.deserializeAttachment() || {}) : {};
        } catch (_) {}

        switch (data.type) {
            case "HELLO": {
                attachment.playerId = data.playerId;
                attachment.teamName = data.teamName || "Anonymous Driver";
                attachment.sponsor = data.sponsor || "Sponsorless";
                attachment.vehicles = data.vehicles || [];

                try {
                    if (ws.serializeAttachment) ws.serializeAttachment(attachment);
                } catch (_) {}

                if (data.turn && data.turn > this.turn) {
                    this.turn = data.turn;
                    this.phase = data.phase || 1;
                }

                // Send WELCOME to newcomer
                ws.send(JSON.stringify({
                    type: "WELCOME",
                    turn: this.turn,
                    phase: this.phase,
                    tableName: this.tableName || this.roomCode || "Table",
                    roomCode: this.roomCode,
                    hasPin: !!this.pin,
                    rollHistory: this.rollHistory,
                    rivals: this.getAllRivals(ws),
                    activePlayers: this.getActiveTeamNames()
                }));

                // Broadcast arrival to everyone else
                this.broadcastExcept(ws, {
                    type: "RIVALS_UPDATE",
                    player: {
                        playerId: attachment.playerId,
                        teamName: attachment.teamName,
                        sponsor: attachment.sponsor,
                        vehicles: attachment.vehicles
                    },
                    activePlayers: this.getActiveTeamNames()
                });

                this.syncLobby();
                break;
            }

            case "SYNC_VEHICLES": {
                if (data.playerId) attachment.playerId = data.playerId;
                if (data.teamName) attachment.teamName = data.teamName;
                if (data.sponsor) attachment.sponsor = data.sponsor;
                if (data.vehicles) attachment.vehicles = data.vehicles;

                try {
                    if (ws.serializeAttachment) ws.serializeAttachment(attachment);
                } catch (_) {}

                this.broadcastExcept(ws, {
                    type: "RIVALS_UPDATE",
                    player: {
                        playerId: attachment.playerId,
                        teamName: attachment.teamName,
                        sponsor: attachment.sponsor,
                        vehicles: attachment.vehicles
                    },
                    activePlayers: this.getActiveTeamNames()
                });
                break;
            }

            case "SYNC_TURN_PHASE": {
                if (typeof data.turn === "number") this.turn = data.turn;
                if (typeof data.phase === "number") this.phase = data.phase;

                this.broadcastExcept(ws, {
                    type: "REMOTE_TURN_PHASE",
                    turn: this.turn,
                    phase: this.phase,
                    updatedBy: attachment.teamName || "Table"
                });
                break;
            }

            case "ROLL_EVENT": {
                const rollItem = {
                    playerId: attachment.playerId || data.playerId,
                    teamName: data.teamName || attachment.teamName,
                    diceType: data.diceType || "skid",
                    count: data.count || 1,
                    results: data.results || [],
                    resultText: data.resultText || "",
                    timestamp: Date.now()
                };

                this.rollHistory.push(rollItem);
                if (this.rollHistory.length > 50) this.rollHistory.shift();

                this.broadcastExcept(ws, {
                    type: "REMOTE_ROLL",
                    roll: rollItem
                });
                break;
            }

            case "RESET_GAME": {
                this.turn = 1;
                this.phase = 1;
                this.rollHistory = [];

                this.broadcast({
                    type: "REMOTE_GAME_RESET",
                    resetBy: attachment.teamName || "A driver"
                });
                break;
            }

            case "PING": {
                ws.send(JSON.stringify({ type: "PONG" }));
                break;
            }
        }
    }

    getSockets() {
        if (this.ctx && typeof this.ctx.getWebSockets === "function") {
            return this.ctx.getWebSockets();
        }
        if (this.state && typeof this.state.getWebSockets === "function") {
            return this.state.getWebSockets();
        }
        return [];
    }

    getAllRivals(exceptWs) {
        const rivals = [];
        for (const sock of this.getSockets()) {
            if (sock !== exceptWs) {
                try {
                    const att = sock.deserializeAttachment ? sock.deserializeAttachment() : null;
                    if (att && att.playerId) {
                        rivals.push(att);
                    }
                } catch (_) {}
            }
        }
        return rivals;
    }

    getActiveTeamNames(excludeWs = null) {
        const names = [];
        for (const sock of this.getSockets()) {
            if (sock !== excludeWs) {
                try {
                    const att = sock.deserializeAttachment ? sock.deserializeAttachment() : null;
                    if (att && att.teamName) {
                        names.push(att.teamName);
                    }
                } catch (_) {}
            }
        }
        return names;
    }

    broadcast(msg) {
        const payload = JSON.stringify(msg);
        for (const sock of this.getSockets()) {
            try {
                sock.send(payload);
            } catch (_) {}
        }
    }

    broadcastExcept(exceptWs, msg) {
        const payload = JSON.stringify(msg);
        for (const sock of this.getSockets()) {
            if (sock !== exceptWs) {
                try {
                    sock.send(payload);
                } catch (_) {}
            }
        }
    }

    async syncLobby() {
        if (!this.env.GAME_TABLE || !this.roomCode || this.roomCode.startsWith("lan_")) {
            return;
        }

        try {
            const lobbyId = this.env.GAME_TABLE.idFromName("__lobby__");
            const lobbyStub = this.env.GAME_TABLE.get(lobbyId);

            const activeCount = this.getActiveTeamNames().length;
            if (activeCount === 0) {
                await lobbyStub.fetch("http://internal/unregister", {
                    method: "POST",
                    body: JSON.stringify({ roomCode: this.roomCode })
                });
            } else {
                await lobbyStub.fetch("http://internal/register", {
                    method: "POST",
                    body: JSON.stringify({
                        roomCode: this.roomCode,
                        tableName: this.tableName || this.roomCode,
                        hasPin: !!this.pin,
                        playerCount: activeCount
                    })
                });
            }
        } catch (_) {}
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // CORS Preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                }
            });
        }

        // Info / Health Check
        if (url.pathname === "/") {
            const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
            const lanPrefix = clientIp.includes(":") ? clientIp.split(":").slice(0, 4).join(":") : clientIp;
            return new Response(JSON.stringify({
                name: "Gaslands Refuelled Table Relay",
                mode: "websocket-hibernation",
                status: "online",
                clientIp: clientIp,
                lanRoom: "lan_" + simpleHash(lanPrefix),
                time: new Date().toISOString()
            }), {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }

        // Public Lobby endpoint: GET /tables
        if (url.pathname === "/tables") {
            try {
                const lobbyId = env.GAME_TABLE.idFromName("__lobby__");
                const lobbyStub = env.GAME_TABLE.get(lobbyId);
                const resp = await lobbyStub.fetch("http://internal/list");
                const data = await resp.json();
                return new Response(JSON.stringify(data), {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            } catch (err) {
                return new Response(JSON.stringify({ error: err.message, tables: [] }), {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                });
            }
        }

        // WebSocket endpoint: /ws
        if (url.pathname === "/ws") {
            let room = cleanRoomCode(url.searchParams.get("room"));
            if (!room) {
                const clientIp = request.headers.get("CF-Connecting-IP") || "local_lan";
                const lanPrefix = clientIp.includes(":") ? clientIp.split(":").slice(0, 4).join(":") : clientIp;
                room = "lan_" + simpleHash(lanPrefix);
            }

            const id = env.GAME_TABLE.idFromName(room);
            const stub = env.GAME_TABLE.get(id);

            return stub.fetch(request);
        }

        return new Response("Not Found", { status: 404 });
    }
};

function cleanRoomCode(raw) {
    if (!raw) return "";
    let str = raw.trim();
    try {
        str = decodeURIComponent(str);
        if (str.includes("%")) str = decodeURIComponent(str);
    } catch (_) {}
    if (str.includes("room=")) {
        const match = str.match(/room=([a-zA-Z0-9_-]+)/i);
        if (match) return match[1].toLowerCase();
        const parts = str.split("room=");
        str = parts[1].split("&")[0];
    }
    str = str.replace(/^https?:\/\//i, "");
    if (str.includes("/")) {
        str = str.split("/").pop();
    }
    return str.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}
