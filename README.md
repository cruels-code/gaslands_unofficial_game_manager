# Unofficial Gaslands Game Manager

An interactive, full-featured digital tabletop companion, garage vehicle builder, 3D physics dice roller, and realtime multiplayer table manager for **Gaslands: Refuelled** (by Mike Hutchinson / Osprey Games).

Designed for tabletop miniature players to manage vehicle dashboards, hull damage, hazard tokens, gears, mounted weaponry, and audience votes seamlessly on mobile, tablet, or desktop browsers with zero installation required.

---

## 🚀 Key Features

### 1. Interactive Play Mode Dashboard
- **Tactile Vehicle Dashboards:** Manage Hull Integrity check-boxes, Hazard tokens, and Gearboxes (Reverse, Gears 1–6) with automatic Wipeout detection.
- **Weapon Ammo Tracking:** Real-time ammo spent checkboxes for limited-ammo ordnance (Rockets, Flamethrowers, Cannons, Dropped Weapons).
- **Status Effects:** One-click toggles for:
  - **On Fire:** Features an interactive real-time WebGL flame canvas rising over the card.
  - **Ghost Rider:** Semi-transparent ethereal styling for Beverly spirit vehicles.
  - **Distracted:** Animated WebGL static distortion glitch shader overlay.
- **Vehicle Special Rules:** Dedicated chassis rules displayed directly on each play card (Roll Cage, Pivot, Slip Away, Jet Engine, Full Throttle, Prison Car conversions, etc.).
- **Team / Sponsor Traits:** Active sponsor perks, traits, and house rules prominently visible on every card.
- **Out-of-Gear Warnings:** Visual alerts when the active gear phase exceeds a vehicle's current gear.

### 2. Full Garage Vehicle Builder
- **16 Vehicle Types:** Buggy, Car, Performance Car, Truck, Heavy Truck, Bus, Drag Racer, Bike, Bike with Sidecar, Ice Cream Truck, Gyrocopter, Ambulance, Monster Truck, Helicopter, Tank, and War Rig.
- **14 Sponsors:** Rutherford, Miyazaki, Mishkin, Idris, Slime, The Warden, Scarlett, Highway Patrol, Verney, Maxxine, The Order of the Inferno, Beverly, Rusty's Bootleggers, or Sponsorless / None.
- **Complete Armory & Equipment:** Weapons with mounted facing selectors (360°, Front, Rear, Left, Right, Turret with automatic 3x Cans calculation), Upgrades, and Perk classes.
- **Rules & Constraint Validation:** Real-time checking against build slot limits, Cans budget, and sponsor restrictions (e.g. Rutherford lightweight ban, Miyazaki handling minimums, Idris gyrocopter ban).
- **Chassis Image Upload:** Upload custom vehicle photos or AI renders with automatic transparent cutout rendering.
- **Duplicate & Delete:** Quick-clone or remove vehicles with a single click.

### 3. Realtime Multiplayer Tables (Powered by Ably)
- **Direct Realtime Mesh:** Browser-to-browser synchronization with no accounts or server setup needed.
- **Table Presence Radar:** See which drivers and teams are currently at your table.
- **Per-Car Combat Telemetry:** Real-time toast alerts inform all connected players whenever individual cars suffer damage, repair hull, or gain/clear hazard tokens.
- **Turn & Phase Sync:** Shared Turn and Gear Phase controls synchronize live across all players.
- **Table Security:** Optional PIN code locks for private gaming sessions.
- **Auto Table Expiration:** Tables with zero active players for 60 seconds are automatically pruned from the lobby directory.

### 4. 3D Physics Dice Roller
- **Three.js + Cannon.js Simulation:** Realistic 3D dice physics rolling directly in your browser.
- **Official Skid Dice & D6:** Skid Dice featuring official face distributions (3x Shift, 1x Slide, 1x Spin, 1x Hazard) and numeric D6 dice.
- **1 to 10 Dice Throw:** Select anywhere from 1 to 10 dice per roll.
- **Keyboard Hotkeys:**
  - `Space`: Roll active dice
  - `1`–`9`, `0`: Set throw count (1–10 dice)
  - `S`: Toggle between Skid Dice and Standard D6
- **Random.org Quantum TRNG:** Optional integration with Random.org API for true atmospheric quantum entropy.
- **Roll History Terminal:** Draggable, resizable retro terminal log tracking every roll and broadcasting results to connected table rivals.

### 5. Audience Vote Perks HUD
Interactive vote counters with one-click vote spending:
- **Gain Vote (+1):** Increment audience votes from televised carnage.
- **Thunderous Applause (1 Vote):** Remove D6 Hazard Tokens from a friendly vehicle.
- **Burn Rubber (1 Vote):** Shift gear +/- 1 and gain 1 Hazard Token.
- **Carpe Diem (2 Votes):** Immediately move Pole Position or prevent it from moving.
- **Reload Weapon (2 Votes):** Restore 1 ammo token to an equipped weapon or upgrade.
- **Executive Intervention (2 Votes):** Force an enemy vehicle to gain hazards until it has 5.
- **Respawn Wreck (3 Votes / 1 Vote for Beverly):** Respawn a destroyed vehicle at half Hull points.

### 6. AI Image Prompt Generator
- Auto-generates structured prompts for **Midjourney**, **DALL-E**, and **Stable Diffusion** tailored to each vehicle in your garage.
- **Two Rendering Modes:**
  - **🗿 3D Model (Clay Render):** Isometric shadowless white-background asset ready for 3D modeling and sculpting.
  - **🏎️ In-Game Card Art:** Full-color concept art render isolated on solid white for transparent background cutout into vehicle cards.
- Intelligently incorporates chassis type, mounted weapon placements, upgrades, flush bumper rams, team name, and sponsor decals.

### 7. Official Rulebook & Quick Reference Sheet (QRS) Viewers
- Secure, client-side PDF reader for your locally linked official Gaslands: Refuelled rulebook and reference sheets.
- **Live Search Query Tracking:** Split-glyph text indexing with animated canvas match highlights.
- **Zoom & Page Rotation:** 90° canvas rotation and zoom controls for landscape table play.

### 8. Standalone Custom Game Manager Suite
- Located in [`/game-manager/`](./game-manager/) for players running custom vehicular combat campaigns (Car Wars, Autokill, Dark Future, custom homebrews).
- Custom equipment library editor, game branding editor, and full JSON ruleset export/import.

---

## 🛠️ Getting Started

### Run Locally
Simply clone or download this repository and open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari):

```bash
git clone https://github.com/cruels-code/gaslands_unofficial_game_manager.git
cd gaslands_unofficial_game_manager
# Open index.html in your default browser
```

No Node.js, server, or build step is required!

### Setting Up Multiplayer (Ably Realtime)
1. Sign up for a free account at [Ably.com](https://ably.com/signup) (free tier includes 6,000,000 monthly messages and 200 concurrent connections).
2. Create an application and copy your API Key.
3. Click the **Table: Offline** indicator in the top header, enter your key, and join or create a table room code (e.g. `table-1`).
4. Share the room code or click **Copy Table Link** to share the direct URL with your friends!

---

## 📄 License & Legal Notice
Gaslands and Gaslands: Refuelled are © Mike Hutchinson and published by Osprey Games. This project is an unofficial community gaming aid created by fans for fans. Official rulebooks and accessories can be purchased directly from [Osprey Games](https://www.ospreypublishing.com) and [Gaslands.com](https://gaslands.com).
