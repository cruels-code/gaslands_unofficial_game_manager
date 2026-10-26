# Gaslands Refuelled - Cloudflare Table Relay

This Cloudflare Worker provides real-time LAN & WAN multiplayer synchronization for the Gaslands Car Manager:
- **Same-WiFi Auto-Connect:** Devices on the same WiFi router share the same public IP and automatically join the same game room without entering any codes.
- **WAN & Remote Play:** Remote players join using a shareable link or room code (`?room=XYZ`).
- **Synchronized 3D Dice Rolls:** Instant live relay of dice rolls and full shared dice history log.
- **Rivals Vehicle Tracker:** Live synchronization of opponent vehicle hull damage, hazard tokens, gears, status, and weapons (with secret ammo counts kept private).

---

## Deployment Option 1: Wrangler CLI (Fastest)

1. Open PowerShell or terminal in this folder:
   ```bash
   cd "cloudflare-worker"
   ```
2. Log into Cloudflare (only needed once):
   ```bash
   npx wrangler login
   ```
3. Deploy the worker:
   ```bash
   npx wrangler deploy
   ```
4. Copy your worker URL (e.g., `https://gaslands-relay.<your-subdomain>.workers.dev`).
5. Open your Gaslands Manager app, click the **Table / Network** pill in the header, and paste your Worker URL!

---

## Deployment Option 2: Cloudflare Web Dashboard

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, go to **Compute (Workers) > Workers & Pages**.
3. Click **Create Application** > **Create Worker**.
4. Name it `gaslands-relay` and click **Deploy**.
5. Click **Edit code** (Quick Edit) in the browser.
6. Replace the entire code with the contents of `worker.js`.
7. Go to **Settings > Bindings > Add**:
   - Type: **Durable Object**
   - Variable name: `GAME_TABLE`
   - Class name: `GameTable`
8. Click **Save and Deploy**.
9. Copy your Worker URL and paste it into the Gaslands Manager Table settings!
