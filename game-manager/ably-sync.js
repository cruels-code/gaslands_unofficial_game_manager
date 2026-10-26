// Game Manager: Ably Realtime Table Synchronizer
// High-allowance peer-to-peer tabletop game state and 3D dice synchronization.
// Free Tier: 6,000,000 messages / month, 200 concurrent connections, built-in presence & rewind.

(function(window) {
    'use strict';

    const DEFAULT_ABLY_KEY = "A8ZtLw.TuYjNQ:kEL5pokKiyYuiVZXxELR718xnZedaZfZIQp1McLLIKU";

    class AblySyncManager {
        constructor() {
            this.apiKey = localStorage.getItem("gm_ably_api_key") || DEFAULT_ABLY_KEY;
            this.roomCode = localStorage.getItem("gm_room_code") || "";
            this.pin = sessionStorage.getItem("gm_pin_" + this.roomCode) || "";
            this.playerId = localStorage.getItem("gm_player_id");
            if (!this.playerId) {
                this.playerId = "p_" + Math.random().toString(36).substring(2, 9);
                localStorage.setItem("gm_player_id", this.playerId);
            }

            this.ablyClient = null;
            this.channel = null;
            this.localBroadcast = null;
            this.connected = false;
            this.playerCount = 1;
            this.tableRoster = {};
            this.rivals = {}; // Keyed by playerId

            this.onSyncCallback = null;
            this.onDiceRollCallback = null;
            this.onResetCallback = null;
            this.onRivalsChangeCallback = null;

            this.initLocalBroadcast();
        }

        initLocalBroadcast() {
            try {
                if (window.BroadcastChannel) {
                    this.localBroadcast = new BroadcastChannel("gm_local_table_" + (this.roomCode || "default"));
                    this.localBroadcast.onmessage = (e) => this.handleIncomingMessage(e.data, true);
                }
            } catch (e) {
                console.warn("[AblySync] Local broadcast channel not available", e);
            }
        }

        setApiKey(key) {
            this.apiKey = (key || "").trim();
            localStorage.setItem("gm_ably_api_key", this.apiKey);
            this.reconnect();
        }

        setRoom(room, pin = "") {
            const clean = (room || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
            this.roomCode = clean;
            this.pin = pin || "";
            localStorage.setItem("gm_room_code", clean);
            if (pin) sessionStorage.setItem("gm_pin_" + clean, pin);

            if (this.localBroadcast) {
                this.localBroadcast.close();
            }
            this.initLocalBroadcast();
            this.reconnect();
        }

        reconnect() {
            this.disconnect();
            if (this.apiKey && this.roomCode) {
                this.connect();
            } else {
                this.updateUI("offline", "Table: Offline", 0);
            }
        }

        connect() {
            if (!this.apiKey) {
                console.log("[AblySync] No Ably API key provided. Operating in offline/local mode.");
                this.updateUI("offline", "Table: Needs Ably Key", 0);
                return;
            }

            if (!this.roomCode) {
                this.updateUI("offline", "Table: No Room Set", 0);
                return;
            }

            if (typeof window.Ably === 'undefined') {
                console.warn("[AblySync] Ably library not yet loaded. Will retry in 1s.");
                setTimeout(() => this.connect(), 1000);
                return;
            }

            try {
                this.updateUI("connecting", "Table: Connecting...", 1);

                this.ablyClient = new window.Ably.Realtime({
                    key: this.apiKey,
                    clientId: this.playerId,
                    autoConnect: true
                });

                this.ablyClient.connection.on('connected', () => {
                    this.connected = true;
                    console.log("[AblySync] Connected to Ably Realtime network!");
                    this.joinChannel();
                });

                this.ablyClient.connection.on('disconnected', () => {
                    this.connected = false;
                    this.updateUI("connecting", "Table: Reconnecting...", this.playerCount);
                });

                this.ablyClient.connection.on('failed', (err) => {
                    this.connected = false;
                    console.error("[AblySync] Ably connection failed:", err);
                    this.updateUI("error", "Table: Key Invalid", 0);
                });

            } catch (err) {
                console.error("[AblySync] Error initializing Ably client:", err);
                this.updateUI("error", "Table: Connection Error", 0);
            }
        }

        joinChannel() {
            const channelName = `gametable-${this.roomCode}`;
            this.channel = this.ablyClient.channels.get(channelName, {
                params: { rewind: '1' } // Get latest table state immediately on join
            });

            // Subscribe to table events
            this.channel.subscribe('sync', (msg) => this.handleIncomingMessage(msg.data));
            this.channel.subscribe('dice_roll', (msg) => this.handleIncomingDiceRoll(msg.data));
            this.channel.subscribe('reset_game', (msg) => this.handleIncomingReset(msg.data));

            // Enter Presence
            const myName = (window.appState && window.appState.teamName) ? window.appState.teamName : ("Player " + this.playerId.slice(2, 6));
            this.channel.presence.enter({
                playerId: this.playerId,
                playerName: myName,
                pin: this.pin,
                joinedAt: Date.now()
            });

            // Track Presence (Who is at the table)
            this.channel.presence.subscribe(() => {
                this.channel.presence.get((err, members) => {
                    if (!err && members) {
                        this.playerCount = Math.max(1, members.length);
                        this.tableRoster = {};
                        members.forEach(m => {
                            if (m.data) this.tableRoster[m.clientId] = m.data.playerName || m.clientId;
                        });
                        this.updateUI("online", `Table: ${this.roomCode} (${this.playerCount} Online)`, this.playerCount);
                    }
                });
            });

            this.updateUI("online", `Table: ${this.roomCode}`, 1);

            // Announce presence with an initial sync
            setTimeout(() => this.syncVehicles(), 500);
        }

        disconnect() {
            if (this.channel) {
                try {
                    this.channel.presence.leave();
                    this.channel.unsubscribe();
                } catch (e) {}
                this.channel = null;
            }
            if (this.ablyClient) {
                try {
                    this.ablyClient.close();
                } catch (e) {}
                this.ablyClient = null;
            }
            this.connected = false;
        }

        isConnected() {
            return this.connected;
        }

        // Publishing
        syncVehicles() {
            if (!window.appState) return;
            const payload = {
                type: "sync",
                senderId: this.playerId,
                pin: this.pin,
                teamName: window.appState.teamName || "Nameless Crew",
                gameName: window.appState.gameName || "Game Manager",
                sponsor: window.appState.sponsor || "Independent",
                turn: window.appState.turn || 1,
                phase: window.appState.phase || 1,
                votes: window.appState.votes || 0,
                vehicles: (window.appState.vehicles || []).map(v => ({
                    id: v.id,
                    name: v.name,
                    type: v.type,
                    hull: v.hull,
                    damage: v.damage,
                    handling: v.handling,
                    gear: v.gear,
                    hazard: v.hazard,
                    cost: v.cost,
                    onFire: !!v.onFire,
                    ghostRider: !!v.ghostRider,
                    distracted: !!v.distracted,
                    wrecked: !!v.wrecked,
                    weapons: (v.weapons || []).map(w => ({
                        name: w.name,
                        range: w.range,
                        dice: w.dice,
                        ammo: w.ammo,
                        slots: w.slots,
                        facing: w.facing,
                        special: w.special
                    })),
                    upgrades: (v.upgrades || []).map(u => ({
                        name: u.name,
                        special: u.special
                    })),
                    perks: (v.perks || []).map(p => ({
                        name: p.name,
                        desc: p.desc
                    }))
                })),
                timestamp: Date.now()
            };

            // Local broadcast to other browser tabs
            if (this.localBroadcast) {
                try { this.localBroadcast.postMessage(payload); } catch (e) {}
            }

            // Realtime Ably Publish
            if (this.channel && this.connected) {
                this.channel.publish("sync", payload);
            }
        }

        broadcastDiceRoll(rollData) {
            const payload = {
                type: "dice_roll",
                senderId: this.playerId,
                rollerName: (window.appState && window.appState.teamName) ? window.appState.teamName : ("Player " + this.playerId.slice(2, 6)),
                diceType: rollData.diceType || "d6",
                diceCount: rollData.diceCount || 1,
                results: rollData.results || [],
                total: rollData.total || 0,
                timestamp: Date.now()
            };

            if (this.localBroadcast) {
                try { this.localBroadcast.postMessage(payload); } catch (e) {}
            }

            if (this.channel && this.connected) {
                this.channel.publish("dice_roll", payload);
            }
        }

        broadcastResetGame() {
            const payload = {
                type: "reset_game",
                senderId: this.playerId,
                pin: this.pin,
                timestamp: Date.now()
            };

            if (this.localBroadcast) {
                try { this.localBroadcast.postMessage(payload); } catch (e) {}
            }

            if (this.channel && this.connected) {
                this.channel.publish("reset_game", payload);
            }
        }

        // Message Handlers
        handleIncomingMessage(data, isLocal = false) {
            if (!data || data.senderId === this.playerId) return;

            // Security PIN check if room is PIN protected
            if (this.pin && data.pin && this.pin !== data.pin) {
                console.warn("[AblySync] Ignored payload with mismatched room PIN.");
                return;
            }

            // Store rival player state
            this.rivals[data.senderId] = {
                teamName: data.teamName,
                gameName: data.gameName,
                sponsor: data.sponsor,
                vehicles: data.vehicles || [],
                turn: data.turn,
                phase: data.phase,
                votes: data.votes,
                updatedAt: data.timestamp || Date.now()
            };

            if (this.onRivalsChangeCallback) {
                this.onRivalsChangeCallback(this.rivals);
            }

            if (this.onSyncCallback) {
                this.onSyncCallback(data);
            }
        }

        handleIncomingDiceRoll(data) {
            if (!data || data.senderId === this.playerId) return;

            if (this.onDiceRollCallback) {
                this.onDiceRollCallback(data);
            }
        }

        handleIncomingReset(data) {
            if (!data || data.senderId === this.playerId) return;

            if (this.pin && data.pin && this.pin !== data.pin) return;

            if (this.onResetCallback) {
                this.onResetCallback(data);
            }
        }

        updateUI(status, label, count) {
            const dot = document.getElementById("net-status-dot");
            const labelEl = document.getElementById("net-status-label");
            const pill = document.getElementById("net-status-pill");

            if (dot) {
                dot.className = "net-status-dot " + status;
            }
            if (labelEl) {
                labelEl.textContent = label;
            }
            if (pill) {
                pill.title = `Tabletop Multiplayer: ${label} (${count} connected)`;
            }
        }
    }

    window.AblySyncManager = new AblySyncManager();

})(window);
