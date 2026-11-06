# Unofficial Gaslands Game Manager

An interactive, full-featured digital tabletop companion, garage vehicle builder, 3D physics dice roller, and realtime multiplayer table manager for **Gaslands: Refuelled (v2)** and the **Gaslands V3 Beta** (by Mike Hutchinson / Osprey Games).

Designed for tabletop miniature players to manage vehicle dashboards, hull damage, hazard tokens, gears, mounted weaponry, driver archetypes, and audience votes seamlessly on mobile, tablet, or desktop browsers with zero installation required.

---

## 🚀 Key Features

### 1. Gaslands V3 Beta & Refuelled Dual-Edition Support (v1.1.0)
- **Instant Edition Switcher:** Toggle between classic **Gaslands: Refuelled (v2)** and **Gaslands V3 Beta (v5.2)** anytime via Settings or the header pill.
- **V3 Vehicle Catalog & Stats:** Full support for Common and Rare vehicles with Hull, Armour (0–5), Weight (1–6), Handling, Max Gear, Crew, Build Slots, and Can costs.
- **17 Specialist Driver Archetypes:** Full roster of archetypes (Arsonist, Blackfinger, Brawler, Daredevil, Fixer, Gunner, Heavy, Leadfoot, Mechanic, Mystic, Professional, Psycho, Raider, Road Warrior, Rough Rider, Spark, Speed Freak) plus Standard Driver (Free / 0 Cans). Driver naming unlocks secondary perk classes.
- **10-Hazard Token Meter:** Expanded hazard tracking up to 10 tokens with danger warnings, quick wipeout roll checks, and excess-to-hull damage conversion in V3.
- **Handling Dice Engine:** Focus (≥ Gear) and Fury (< Gear) dice resolution, Push It re-rolls, and D6 combat hit/crit evaluations.
- **Single-Line Round & Pole Position Tracker:** Streamlined single-row Play Mode header integrating Round tracker, Pole Position toggle (`👑 YOU / OPPONENT`), Clean Up phase automation, and 3D dice roller.

### 2. Wasteland Team Manager (v1.1.0)
- **Multi-Team Storage & Switching:** Store unlimited teams locally and switch between them instantly from the header or garage.
- **Automatic Real-Time Sync:** Garage changes, weapon loadouts, and stat updates auto-save directly to your active saved team.
- **Duplicate & Clone Teams:** Create copies of existing rosters to test different weapon configurations or tournament lists. Unique vehicle IDs and chassis images are safely preserved.
- **New Team Creator Drawer:** Inline team creation drawer with a built-in wasteland team name generator (`🎲`), sponsor selection, can budget, and ruleset toggle.
- **Backup & Restore:** Export individual team JSONs or download an all-teams backup file, with seamless library import.

### 3. Interactive Play Mode Dashboard
- **Tactile Vehicle Dashboards:** Manage Hull Integrity check-boxes, Hazard tokens, and Gearboxes (Reverse, Gears 1–6) with automatic Wipeout detection.
- **Weapon Ammo Tracking:** Real-time ammo spent checkboxes for limited-ammo ordnance (Rockets, Flamethrowers, Cannons, Dropped Weapons).
- **Status Effects:** Themed one-click condition buttons:
  - **On Fire:** Interactive real-time WebGL flame canvas rising over the vehicle card.
  - **Ghost Rider:** Ethereal semi-transparent styling for Beverly spirit vehicles.
  - **Distracted:** Animated WebGL distortion glitch shader overlay.
- **Vehicle Special Rules:** Dedicated chassis rules displayed directly on each play card (Roll Cage, Pivot, Slip Away, Jet Engine, Full Throttle, Prison Car conversions, etc.).
- **In-Game Perks Reference:** Quick reference popup (`🎟️ Perks`) detailing active team vehicles, driver abilities, equipped perks, and Audience Vote spends.
- **Out-of-Gear Warnings:** Visual alerts when the active gear phase exceeds a vehicle's maximum allowable transmission gear.

### 4. Adaptive Tablet & Smartphone Auto-Detection
- **Automatic Device & Orientation Detection:** Integrated `DeviceManager` learns device type (`phone`, `tablet`, `desktop`) and orientation (`portrait`, `landscape`) in real-time.
- **Single-Line Header & Trackers:** Clean, un-truncated layout designed for desktop and mobile viewports.
- **Collapsible Audience Votes Hub:** Quick `+1 Vote` and collapsible `⚡ Spends` accordion saves vertical screen space on smaller screens.
- **Play Mode Header Compression:** Garage inputs automatically hide during Play Mode on mobile and tablet devices, keeping vehicle dashboards front and center.
- **Touch-Optimized Tabletop Controls:** Enlarged tap targets for Hull integrity checkboxes, Hazard tokens, and Gear selectors for effortless gameplay.

### 5. Tactical Radio Comms & Driver Roster
- **Real-Time In-Game Radio Network:** Integrated tactical comms channel for coordinating with your table or chatting in the central lobby.
- **Active Driver Roster:** Side-by-side active driver roster displaying usernames, team names, sponsors, table host crowns, and supporter flairs.
- **Direct Private Messaging Windows:** Double-click any driver on the radio roster (or click 💬) to open a direct private message window.
- **Audio FX Synthesizer:** Pure Web Audio API synthesizers provide retro radio and alert chimes, with a global mute toggle in Settings.
- **Driver Call-Signs & Commands:** Set persistent nicknames or use IRC-style slash commands (`/nick`, `/me`, `/clear`, `/help`).

### 6. Full Garage Vehicle Builder
- **Wasteland Name Auto Generator:** Hundreds of gritty wasteland adjectives, suffixes, and vehicle-specific names with a 🎲 quick-roll button on each vehicle card.
- **Complete Ruleset Database:** All official vehicle chassis, weapons, upgrades, and perks with accurate slot and Can calculations.
- **Official Sponsors:** Full roster across both Refuelled and V3 editions (Rutherford, Miyazaki, Mishkin, Idris, Slime, Rusty's Bootleggers, The Warden, Order of the Inferno, Beverly, Highway Patrol, Verney, Maxxine, and Scarlett).

### 7. Realtime Multiplayer Tables (Powered by Ably)
- **Online Lobby & Matchmaker:** Centralized lobby where racers can idle and chat before entering a game table.
- **Host Management & Player Kick:** Table creators hold Table Host status (👑 HOST badge) and can kick players if needed.
- **Auto LAN Discovery:** One-click local Wi-Fi table creation with customizable table names.
- **Peer Synchronization:** Live multi-player dashboard synchronization of hull points, hazard tokens, gears, status effects, and audience votes across all connected devices.

### 8. 3D Physics Dice Roller
- **Authentic Skid & Handling Dice:** Full 3D Cannon.js physics simulation of custom Gaslands Skid Dice and V3 Handling Dice.
- **Combat & Wipeout Rolls:** Standard D6, Attack dice, and Wipeout checks with automatic evaluation.

### 9. Official Rulebook & Reference Viewers
- **Embedded Document Readers:** Built-in PDF reader for locally linked Gaslands rulebooks with page rotation and text search.

---

## 🏷️ Version History

### v1.1.0 - Current Release (06.11.26)
- **Gaslands V3 Beta Support:** Switch between classic Refuelled (v2) and the new V3 Beta ruleset anytime in Settings.
- **Wasteland Team Manager:** Store multiple team rosters, switch between teams on the fly, duplicate setups, and backup your collection.
- **V3 Vehicles & Drivers:** Added new vehicle classes, Armour and Weight stats, and free specialist driver archetypes.
- **Expanded Hazard Tracker:** Hazards now track up to 10 tokens with automatic wipeout danger warnings.
- **Single-Line Play Mode Tracker:** Cleaned up the Round and Pole Position tracker bar with Handling Dice controls on one line.
- **In-Game Perks Guide:** Instant cheat sheet for team perks, driver abilities, and Audience Vote spends.

### v1.0.5 (02.11.26)
- **Vehicle Name Generator:** Overhauled name generator with hundreds of wasteland adjectives and chassis-specific names, plus a 🎲 quick-roll button on each vehicle card.
- **Private Messaging:** Double-click any driver on the radio roster (or click 💬) to open a direct private message window.
- **Mobile & Tablet Improvements:** Refined layouts for phones and tablets with smooth navigation, compact turn/phase trackers, and collapsible perks.
- **Play Mode Dashboard:** Automatically hides garage setup during active play to focus on vehicles, with themed condition buttons (On Fire, Ghost, Distracted).
- **Local Wi-Fi Play:** Easy multiplayer connection for phones and tablets on the same local network.

### v1.0.4 (01.11.26)
- **Smart Device Adaptation:** Automatically adjusts layouts and card grids for phones, tablets, and desktops.
- **Larger Touch Controls:** Bigger buttons and checkboxes for Hull, Hazards, and Gears to avoid mis-taps.
- **Tactical Radio & Roster:** Live chat and active driver roster with desktop floating window and mobile drawer.
- **Sound FX:** Audio alerts for radio messages with a mute toggle in Settings.
- **Supporter Badges & IDs:** Persistent Driver IDs and special in-game badges for Ko-fi supporters.
- **Online Lobby:** Central lobby to chat and find game tables.

### v1.0.3 (01.11.26)
- **Online Table Lobby:** Browse open game tables with live player counts.
- **Host Controls:** Table hosts receive a 👑 badge and can kick players.
- **Custom LAN Table Names:** Friendly naming for local Wi-Fi games.
- **Default Garage View:** Starts directly in the garage when launching or joining games.
- **Version & Update Log:** View new features and updates from the Settings menu.

### v1.0.2 (01.11.26)
- **Settings Menu:** Unified settings modal replacing the old About button.
- **Night Vision Cockpit Themes:** Authentic red, amber, and green tabletop themes.
- **Custom Sponsor Logos:** Upload custom team sponsor images with instant transparency.
- **Hide AI Prompt Toggle:** Option in Settings to toggle AI prompt buttons.

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

## ☕ Support the Project
If you enjoy using the Unofficial Gaslands Game Manager, you can support further development:
- **Ko-fi:** [https://ko-fi.com/gaslands_game_manager](https://ko-fi.com/gaslands_game_manager)
- All supporters receive a custom VIP Supporter Badge flair next to their driver call-sign!

---

## 📄 License & Legal Notice
Gaslands and Gaslands: Refuelled are © Mike Hutchinson and published by Osprey Games. This project is an unofficial community gaming aid created by fans for fans. Official rulebooks and accessories can be purchased directly from [Osprey Games](https://www.ospreypublishing.com) and [Gaslands.com](https://gaslands.com).
