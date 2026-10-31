# Game Manager — Tabletop Dashboard & Vehicle Builder

**Game Manager** is a customizable tabletop gaming companion designed for vehicular combat games, car wars, post-apocalyptic racing, and custom miniature rulesets.

---

## 🚀 Key Features

1. **Customizable Game Branding:**
   - Change the game system title on the fly (e.g. *Car Wars*, *Autokill*, *Dark Future*, or your custom campaign name).
   - Dynamic page title and table lobby naming.

2. **Custom Equipment & Rules Engine:**
   - Define custom **Weapons**, **Attack Dice** (e.g. `2D6`, `3D6`, `1D10`), **Upgrades**, **Perks**, **Vehicle Chassis**, and **Factions / Sponsors**.
   - **Weapon Mounting & Turret Multipliers:** Select where weapons are mounted (`Front`, `Back`, `Left side`, `Right side`, or `Turret`). Turret-mounted weapons automatically apply a **3x Cans/Points cost multiplier** and check against the vehicle build budget.
   - **Custom Sponsors & Perks:** Enter custom sponsor names, allowable perk classes, and special house rules/perks. Displays live on the team dashboard.
   - Create custom items inline while building vehicles in the Garage or manage them in the **Library** tab.
   - **Export / Import Rulesets:** Save your entire custom library to a `.json` file to backup or share with your table buddies.

3. **High-Allowance Realtime Multiplayer (Ably Realtime):**
   - Direct browser-to-browser synchronization powered by **Ably Realtime**.
   - **Generous Free Tier:** 6,000,000 messages / month and 200 concurrent player connections.
   - Synchronizes vehicle hull damage, hazard tokens, gears, and equipped weapons live across devices.
   - Built-in table presence roster, turn/phase synchronization, and per-car combat telemetry alerts.

4. **3D Physics Dice Roller:**
   - Three.js + Cannon.js 3D physics dice simulation.
   - Supports Standard D6 and custom Skid Dice.
   - Click weapons in Play Mode to instantly roll their user-configured attack dice!
   - Optional **Random.org** API key integration for true atmospheric quantum entropy (TRNG).
   - Draggable roll history log with live network broadcast so all players see rolls in real time.

5. **AI Image Prompt Generator:**
   - Auto-generates detailed text-to-image prompts for **Midjourney**, **DALL-E**, and **Stable Diffusion** tailored to each vehicle's build.
   - Choose between **🗿 3D Model Clay Render** (shadowless isometric white background asset for 3D modeling) and **🏎️ In-Game Card Art** (full-color concept art render with transparent background masking).
   - Accurately captures chassis dimensions, mounted weapon locations (Front, Turret, Sides), upgrades, bumper rams, team name, and sponsor decals.

---

## 🛠️ Getting Started

### 1. Running Locally
Simply open `index.html` inside this `game-manager/` folder in any modern web browser (Chrome, Edge, Firefox, Safari). No installation or server required.

### 2. Setting up Realtime Multiplayer with Ably (Free)
1. Sign up for a free account at [Ably.com](https://ably.com/signup) (no credit card required).
2. Create a free app and copy your **API Key** (e.g. `your-app-id.key-id:secret`).
3. In **Game Manager**, click the **Table: Offline** pill in the top header.
4. Paste your Ably API key into the field. It will be safely saved in your browser's local storage.
5. Enter or generate a **Room Code** (e.g. `TABLE-42`) and click **Connect to Table**.
6. Click **Copy Table Link** and send the URL to your friends!

---

## 📁 File Structure

```
game-manager/
├── index.html           # Main application HTML & UI
├── style.css            # Dark tabletop cyberpunk theme
├── custom-library.js    # Custom equipment, weapons, chassis, & rules library
├── ably-sync.js         # Realtime table synchronization client
├── three.min.js         # 3D WebGL engine
├── cannon.min.js        # 3D physics engine
├── sprites.js           # Dice textures
├── d6_sprites.js        # D6 numeric textures
└── README.md            # This documentation
```
