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
- **Out-of-Gear Warnings:** Visual alerts when the active gear phase exceeds a vehicle's maximum allowable transmission gear.

### 2. Adaptive Tablet & Smartphone Auto-Detection (v1.0.5)
- **Automatic Device & Orientation Detection:** Integrated `DeviceManager` that learns the player's device type (`phone`, `tablet`, `desktop`) and orientation (`portrait`, `landscape`) in real-time.
- **Zero-Truncation Turn & Phase Tracker:** Game Turn (`- 1 +`) and all 6 Gear Phase buttons (`[1][2][3][4][5][6]`) sit side-by-side on Row 1; flexible Dice controls (`[Dice Type] [Dice Count] [🔑] [🕒] [🎲 Roll]`) sit on Row 2 with zero clipping.
- **Collapsible Audience Votes Hub:** Quick `+1 Vote` and collapsible `🎟️ Perks ▾` accordion saves 250px+ of vertical screen space on phones until perks are needed.
- **Play Mode Header Compression:** Garage inputs (Team Name, Sponsor, Budget, Total Spent) automatically hide during Play Mode on mobile and tablet devices, keeping vehicle dashboards front and center.
- **Touch-Optimized Tabletop Controls:** Enlarged tap targets for Hull integrity checkboxes, Hazard tokens, and Gear selectors so fingers never miss during chaotic tabletop games.
- **Adaptive Multi-Column Grids:** Tablet portrait displays balanced 2-column vehicle grids instead of stretched single cards; phones utilize clean single-column cards with touch-friendly spacing and hidden watermarks for maximum readability.
- **Garage Actions 2x2 Grid:** Clean 2x2 grid for Garage top buttons (`+ Add Vehicle`, `🧹 Clear Team`, `📤 Export Team`, `📥 Import Team`).
- **Compact Phone Landscape Viewports:** Streamlined low-profile headers and turn/phase trackers designed for smartphone landscape screens, keeping dashboards fully visible.

### 3. Tactical Radio Comms & Driver Roster (v1.0.4)
- **Real-Time In-Game Radio Network:** Integrated tactical comms channel for coordinating with your table or chatting in the central lobby.
- **Active Driver Roster:** Side-by-side active driver roster displaying usernames, team names, sponsors, table host crowns, and supporter flairs.
- **Mobile-Adaptive Comms Sheet:** Floating resizable/draggable window on desktop; sleek slide-up bottom-sheet drawer with collapsible roster on phones.
- **Audio FX Synthesizer:** Pure Web Audio API synthesizers provide retro radio and alert chimes, with a global "Mute All Sounds" toggle in Settings and the Comms window.
- **Driver Call-Signs & Commands:** Set persistent nicknames or use IRC-style slash commands (`/nick`, `/me`, `/clear`, `/help`).
  - **Direct Private Messaging Windows:** Double-clicking any driver on the right-hand active roster (or tapping their 💬 icon) opens a private message window between those two users. Features multi-window conversation support, unread counters, audio chimes, and `/msg` / `/query` radio commands.

### 4. Full Garage Vehicle Builder
  - **Wasteland Name Auto Generator:** Massively expanded vehicle-type-specific name generator featuring 150+ gritty wasteland adjectives, 80+ brutal suffixes, and type-specific noun matrices across all 16 chassis (Bikes, War Rigs, Gyrocopters, Monster Trucks, Tanks, Ambulances, Ice Cream Trucks, etc.). Features an instant 🎲 quick-roll button on every vehicle card.
- **Complete Ruleset Database:** All official vehicle chassis (Buggy, Car, Performance Car, Truck, Heavy Truck, Monster Truck, Bus, Gyrocopter, Tank, War Rig, Helicopter, Ambulance, etc.).
- **Weapons, Upgrades & Perks:** Accurate Can cost calculations, Build Slot constraints, crew limits, and weapon mount facings (Front, Rear, Left, Right, 360° Turret).
- **Official Sponsors:** Full roster including Rutherford, Miyazaki, Mishkin, Idris, Slime, Rusty's Bootleggers, The Warden, Order of the Inferno, Beverly, Highway Patrol, Verney, Maxxine, and Scarlett.
- **Fleet Management:** Create, clone, customize, and manage multiple teams simultaneously.
- **Import / Export / Print:** Full JSON team roster backup/restore and clean, high-contrast, print-friendly roster output.

### 5. Realtime Multiplayer Tables (Powered by Ably)
- **Online Lobby & Table Matchmaker:** Centralized lobby where racers can idle and chat before entering a game table. Includes instant live player counts, table directory, and quick matchmaker.
- **Host Management & Player Kick:** Table creators hold Table Host status (👑 HOST badge) and can kick players if needed.
- **Auto LAN Discovery:** One-click local WiFi table creation with customizable table names (e.g., "Basement Brawl", "Garage LAN").
- **Peer Synchronization:** Live multi-player dashboard synchronization of hull points, hazard tokens, gears, status effects, and audience votes across all connected devices.

### 6. 3D Physics Dice Roller
- **Authentic Skid Dice:** Full 3D Cannon.js physics simulation of custom Gaslands Skid Dice faces (Shift, Hazard, Spin, Slide).
- **Attack & Defense D6:** Physics-based combat dice with automatic hit counting.

### 7. Audience Vote Perks HUD
- **Live Crowd Vote Counter:** Easily track crowd votes and spend them instantly on canonical perks (Carpe Diem, Reload, Inferno, Cheers, Boos, etc.).

### 8. Settings, Night Vision Mode & Custom Sponsors
- **Themes:** High-contrast Wasteland Day Theme, Desert Sand Theme, and authentic Night Vision Red/Green/Amber cockpit HUD themes.
- **Custom Sponsor Logo Uploads:** Upload your own sponsor crests with real-time transparent white/black background cutout processing.
- **Sound & AI Controls:** Global sound toggle to mute all audio FX, and an AI prompt visibility switch.

### 9. Official Rulebook & Quick Reference Sheet (QRS) Viewers
- **Embedded Document Readers:** Built-in PDF reader for locally linked Gaslands rulebooks with page rotation and split-glyph text search.

---

## 🏷️ Version History

### v1.0.5 - Current Release (02.11.26)
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
