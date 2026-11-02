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

### 4. Full Garage Vehicle Builder
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
- **Smartphone Portrait Tabletop Overhaul:** Full layout optimization for mobile phones (360px–430px portrait). Eliminated all horizontal stretching and overflow.
- **Zero-Truncation Turn & Gear Phase Tracker:** Game Turn (`- 1 +`) and Gear Phase buttons (`[1][2][3][4][5][6]`) fit side-by-side on Row 1 without wrapping; Dice controls fit cleanly on Row 2.
- **Collapsible Audience Votes HUB:** Compact counter with quick `+1 Vote` and collapsible `🎟️ Perks ▾` toggle to conserve 250px+ vertical dashboard height.
- **Play Mode Header Compression:** Automatically hides Garage inputs on mobile/tablet during active play to maximize table dashboard space.
- **Swipeable Mode Bar & 2x2 Garage Grid:** Full-width touch swipe mode navigation bar, plus a 2x2 grid for Garage team actions.
- **Multi-Homed LAN Server Support:** Node.js static server daemon bound to `0.0.0.0:8080` with verified Windows Firewall private network permissions for instant phone/tablet LAN connectivity.
- **AI Prompt Generator Overhaul:** Foremost untextured clay render prompts with 3D miniature printing optimization (watertight manifold geometry, 28mm–32mm scale), Bambu AMS multi-material 4-colour FDM palette selector, and cinematic action-movie crew postures (1 driver actively steering even if armed, remaining crew actively leaning out and firing config-chosen weapons).

### v1.0.4 (01.11.26)
- **Adaptive Tablet & Smartphone Auto-Detection:** Integrated `DeviceManager` that dynamically detects device class (phone, tablet, desktop) and orientation (portrait, landscape), tailoring grids, layouts, and typography.
- **Touch-Optimized Hit Targets:** Hull boxes, hazard dots, and gear selector buttons enlarged to 36px–40px for error-free tabletop finger tapping.
- **Responsive Grids:** 2-column balanced layouts for tablet portrait; clean single-column cards with hidden watermarks for smartphones.
- **Tactical Radio Comms:** Split chat buffer and active driver roster with draggable/resizable window on desktop and bottom-sheet drawer on mobile.
- **Audio FX Synthesizer:** Web Audio API sound chimes with a global "Mute All Sounds" toggle in Settings and the Comms window.
- **Persistent Driver ID & Supporter System:** Persistent IDs, Ko-fi supporter links, and VIP flair activation.
- **Online Lobby Default Routing:** Automatic lobby connection on launch before joining tables.

### v1.0.3 (01.11.26)
- **Online Table Lobby & Matchmaker:** Real-time lobby directory with instant player counts.
- **Table Host Controls:** 👑 Host badge and player kick capability.
- **Auto LAN Friendly Naming:** Custom naming for local network rooms.
- **Default Garage Screen:** Automatic routing to Garage Mode upon load and join.

### v1.0.2 (01.11.26)
- **Night Vision Tactical Themes:** Authentic tactical red, amber, and green cockpit themes.
- **Custom Sponsor System:** Upload custom logos with instant transparency extraction.

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
