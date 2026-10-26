// Game Manager: Equipment, Vehicle, Upgrade, Perk & Rules Library Manager
// Standalone, extensible, user-customizable library for tabletop vehicle combat games.

(function(window) {
    'use strict';

    const STORAGE_KEY = "gm_custom_library_v2";

    const DEFAULT_VEHICLES = [
        { id: "v_buggy", name: "Buggy", weight: "Lightweight", hull: 6, handling: 4, maxGear: 6, crew: 2, slots: 2, cost: 6, special: "Roll Cage: May choose to ignore the 2 hits received from a flip." },
        { id: "v_car", name: "Car", weight: "Middleweight", hull: 10, handling: 3, maxGear: 5, crew: 2, slots: 2, cost: 12, special: "" },
        { id: "v_perf_car", name: "Performance Car", weight: "Middleweight", hull: 8, handling: 4, maxGear: 6, crew: 1, slots: 2, cost: 15, special: "Slip Away: If targeted with tailgate/T-Bone smash and evades, get free activation after." },
        { id: "v_truck", name: "Truck", weight: "Middleweight", hull: 12, handling: 2, maxGear: 4, crew: 3, slots: 3, cost: 15, special: "" },
        { id: "v_heavytruck", name: "Heavy Truck", weight: "Heavyweight", hull: 14, handling: 2, maxGear: 3, crew: 4, slots: 5, cost: 25, special: "" },
        { id: "v_bus", name: "Bus", weight: "Heavyweight", hull: 16, handling: 2, maxGear: 3, crew: 8, slots: 3, cost: 30, special: "" },
        { id: "v_dragster", name: "Drag Racer", weight: "Lightweight", hull: 6, handling: 4, maxGear: 6, crew: 1, slots: 2, cost: 5, special: "Jet Engine: Infinite Nitro Booster ammo, explodes on wreck, must booster every turn." },
        { id: "v_bike", name: "Bike", weight: "Lightweight", hull: 4, handling: 5, maxGear: 6, crew: 1, slots: 1, cost: 5, special: "Full Throttle (Long Straight always permitted), Pivot at Gear 1." },
        { id: "v_sidecar", name: "Bike with Sidecar", weight: "Lightweight", hull: 4, handling: 5, maxGear: 6, crew: 2, slots: 2, cost: 8, special: "Full Throttle (Long Straight always permitted), Pivot at Gear 1." },
        { id: "v_icecream", name: "Ice Cream Truck", weight: "Middleweight", hull: 10, handling: 2, maxGear: 4, crew: 2, slots: 2, cost: 8, special: "Infuriating Jingle: Tailgaters get no collision hazards step 6." },
        { id: "v_gyrocopter", name: "Gyrocopter", weight: "Middleweight", hull: 4, handling: 4, maxGear: 6, crew: 1, slots: 0, cost: 10, special: "Airwolf (+2 hazard to 90-deg pivot), Airborne (ignore non-tall obstructions), Bombs Away (dropped weapons take 0 slots)." },
        { id: "v_ambulance", name: "Ambulance", weight: "Middleweight", hull: 12, handling: 2, maxGear: 5, crew: 3, slots: 3, cost: 20, special: "Uppers (collisions force +1 gear/hazard), Downers (smash removes 2 target hazards & reduces crew)." },
        { id: "v_monstertruck", name: "Monster Truck", weight: "Heavyweight", hull: 10, handling: 3, maxGear: 4, crew: 2, slots: 2, cost: 25, special: "All Terrain (ignore rough/treacherous), Up and Over (drives over lighter vehicles)." },
        { id: "v_helicopter", name: "Helicopter", weight: "Heavyweight", hull: 8, handling: 3, maxGear: 4, crew: 3, slots: 4, cost: 30, special: "Airborne, Airwolf, Bombs Away, Restricted." },
        { id: "v_tank", name: "Tank", weight: "Heavyweight", hull: 20, handling: 4, maxGear: 3, crew: 3, slots: 4, cost: 40, special: "Pivot at Gear 1, Up and Over, All Terrain, 1 free Turret weapon, Restricted." },
        { id: "v_warrig", name: "War Rig", weight: "Heavyweight", hull: 26, handling: 2, maxGear: 4, crew: 5, slots: 5, cost: 40, special: "Articulated, Ponderous, Piledriver. Articulated cab and trailer." }
    ];

    const DEFAULT_WEAPONS = [
        // Basic
        { id: "w_handgun", name: "Handgun", range: "Medium", dice: "1D6", special: "Crew Fired. 360-deg Arc.", slots: 0, cost: 0, category: "Crew Fired" },
        { id: "w_machine_gun", name: "Machine Gun", range: "Double", dice: "2D6", special: "", slots: 1, cost: 2, category: "Basic" },
        { id: "w_heavy_machine_gun", name: "Heavy Machine Gun", range: "Double", dice: "3D6", special: "", slots: 1, cost: 3, category: "Basic" },
        { id: "w_minigun", name: "Minigun", range: "Double", dice: "4D6", special: "", slots: 1, cost: 5, category: "Basic" },
        // Advanced
        { id: "w_cannon_125mm", name: "125mm Cannon", range: "Double", dice: "8D6", special: "Ammo 3. Blast. Recoil hazard (+2 hazards if not Tank).", slots: 3, cost: 6, ammo: 3, category: "Advanced" },
        { id: "w_arc_lightning", name: "Arc Lightning Projector", range: "Double", dice: "6D6", special: "Ammo 1. Electrical. Chains to another target within Short on damage.", slots: 2, cost: 6, ammo: 1, electrical: true, category: "Advanced" },
        { id: "w_bazooka", name: "Bazooka", range: "Double", dice: "3D6", special: "Ammo 3. Blast.", slots: 2, cost: 4, ammo: 3, category: "Advanced" },
        { id: "w_bfg", name: "BFG", range: "Double", dice: "10D6", special: "Ammo 1. Forced move Medium Straight backwards, Gear 1 and +3 hazards. Front only.", slots: 3, cost: 1, ammo: 1, category: "Advanced" },
        { id: "w_combat_laser", name: "Combat Laser", range: "Double", dice: "3D6", special: "Splash.", slots: 1, cost: 5, category: "Advanced" },
        { id: "w_death_ray", name: "Death Ray", range: "Double", dice: "3D6", special: "Ammo 1. Electrical. 5+ hits instantly wrecks target.", slots: 1, cost: 3, ammo: 1, electrical: true, category: "Advanced" },
        { id: "w_flamethrower", name: "Flamethrower", range: "Large Burst", dice: "6D6", special: "Ammo 3. Splash. Fire. Indirect.", slots: 2, cost: 4, ammo: 3, category: "Advanced" },
        { id: "w_grabber_arm", name: "Grabber Arm", range: "Short", dice: "3D6", special: "Reposition same/lighter weight target on hit.", slots: 1, cost: 6, category: "Advanced" },
        { id: "w_grav_gun", name: "Grav Gun", range: "Double", dice: "(3D6)", special: "Ammo 1. Electrical. Hits shift target weight class up or down.", slots: 1, cost: 2, ammo: 1, electrical: true, category: "Advanced" },
        { id: "w_harpoon", name: "Harpoon", range: "Double", dice: "(5D6)", special: "Spins and reels target in. Shifter to reverse if target heavier.", slots: 1, cost: 2, category: "Advanced" },
        { id: "w_kinetic_super_booster", name: "Kinetic Super Booster", range: "Double", dice: "(6D6)", special: "Ammo 1. Electrical. No damage, increases gear on hit.", slots: 2, cost: 6, ammo: 1, electrical: true, category: "Advanced" },
        { id: "w_magnetic_jammer", name: "Magnetic Jammer", range: "Double", dice: "-", special: "Electrical. Target cannot discard ammo next activation.", slots: 0, cost: 2, electrical: true, category: "Advanced" },
        { id: "w_mortar", name: "Mortar", range: "Double", dice: "4D6", special: "Ammo 3. Indirect.", slots: 1, cost: 4, ammo: 3, category: "Advanced" },
        { id: "w_rockets", name: "Rockets", range: "Double", dice: "6D6", special: "Ammo 3.", slots: 2, cost: 5, ammo: 3, category: "Advanced" },
        { id: "w_thumper", name: "Thumper", range: "Medium", dice: "-", special: "Ammo 1. Electrical. Indirect. 360-deg. Flip checks to all within Medium range.", slots: 2, cost: 4, ammo: 1, electrical: true, category: "Advanced" },
        { id: "w_wall_of_amplifiers", name: "Wall of Amplifiers", range: "Medium", dice: "-", special: "360-deg. Automatic 1 hit to all within range: Evadable, add or discard 1 hazard.", slots: 3, cost: 4, category: "Advanced" },
        { id: "w_wreck_lobber", name: "Wreck Lobber", range: "Double/Dropped", dice: "-", special: "Ammo 3. Launch Car wreck, low-loader reload.", slots: 4, cost: 4, ammo: 3, category: "Advanced" },
        { id: "w_wrecking_ball", name: "Wrecking Ball", range: "Short", dice: "*", special: "360-deg. Smash collision with all within Short range.", slots: 3, cost: 2, category: "Advanced" },
        // Crew Fired
        { id: "w_blunderbuss", name: "Blunderbuss", range: "Small Burst", dice: "2D6", special: "Crew Fired. Splash.", slots: 0, cost: 2, category: "Crew Fired" },
        { id: "w_gas_grenades", name: "Gas Grenades", range: "Medium", dice: "(1D6)", special: "Ammo 5. Crew Fired. Indirect. Blitz. Reduces target crew.", slots: 0, cost: 1, ammo: 5, category: "Crew Fired" },
        { id: "w_grenades", name: "Grenades", range: "Medium", dice: "1D6", special: "Ammo 5. Crew Fired. Blast. Indirect. Blitz.", slots: 0, cost: 1, ammo: 5, category: "Crew Fired" },
        { id: "w_magnum", name: "Magnum", range: "Double", dice: "1D6", special: "Crew Fired. Blast.", slots: 0, cost: 3, category: "Crew Fired" },
        { id: "w_molotov", name: "Molotov Cocktails", range: "Medium", dice: "1D6", special: "Ammo 5. Crew Fired. Fire. Indirect. Blitz.", slots: 0, cost: 1, ammo: 5, category: "Crew Fired" },
        { id: "w_shotgun", name: "Shotgun", range: "Long", dice: "*", special: "Crew Fired. 3D6 short / 2D6 med / 1D6 long range.", slots: 0, cost: 4, category: "Crew Fired" },
        { id: "w_steel_nets", name: "Steel Nets", range: "Short", dice: "(3D6)", special: "Crew Fired. Blast. No damage, just hazard tokens.", slots: 0, cost: 2, category: "Crew Fired" },
        { id: "w_submachine_gun", name: "Submachine Gun", range: "Medium", dice: "3D6", special: "Crew Fired.", slots: 0, cost: 5, category: "Crew Fired" },
        // Dropped
        { id: "w_caltrop_dropper", name: "Caltrop Dropper", range: "Dropped", dice: "2D6", special: "Ammo 3. Treacherous. Hits first affected vehicle.", slots: 1, cost: 1, ammo: 3, category: "Dropped" },
        { id: "w_glue_dropper", name: "Glue Dropper", range: "Dropped", dice: "-", special: "Ammo 1. Treacherous. Reduces gear by 2 at end of movement.", slots: 1, cost: 1, ammo: 1, category: "Dropped" },
        { id: "w_mine_dropper", name: "Mine Dropper", range: "Dropped", dice: "4D6", special: "Ammo 3. Blast. Hits first affected vehicle.", slots: 1, cost: 1, ammo: 3, category: "Dropped" },
        { id: "w_napalm_dropper", name: "Napalm Dropper", range: "Dropped", dice: "4D6", special: "Ammo 3. Fire. Hits first affected vehicle.", slots: 1, cost: 1, ammo: 3, category: "Dropped" },
        { id: "w_oil_slick_dropper", name: "Oil Slick Dropper", range: "Dropped", dice: "-", special: "Ammo 3. Treacherous.", slots: 0, cost: 2, ammo: 3, category: "Dropped" },
        { id: "w_rc_car_bombs", name: "RC Car Bombs", range: "Dropped", dice: "4D6", special: "Ammo 3. Drop lightweight tiny RC car, explodes on wreck.", slots: 0, cost: 3, ammo: 3, category: "Dropped" },
        { id: "w_sentry_gun", name: "Sentry Gun", range: "Dropped", dice: "2D6", special: "Ammo 3. Drop lightweight sentry, shoots nearby enemies.", slots: 0, cost: 3, ammo: 3, category: "Dropped" },
        { id: "w_smoke_dropper", name: "Smoke Dropper", range: "Dropped", dice: "-", special: "Ammo 3. Distracted & +1 hazard to vehicles touching template.", slots: 0, cost: 1, ammo: 3, category: "Dropped" },
        // Melee / Rams
        { id: "w_exploding_ram", name: "Exploding Ram", range: "Smash", dice: "+6D6", special: "Declare facing. Non-lightweight only. +6 attack dice. Suffer 1 damage for each 1 or 2 rolled. (Once)", slots: 0, cost: 3, ammo: 1, category: "Basic" },
        { id: "w_ram", name: "Ram", range: "Smash", dice: "+2D6", special: "Declare facing. +2 Smash Attack dice, ignore hazards from collision on this facing.", slots: 1, cost: 4, category: "Basic" }
    ];

    const DEFAULT_UPGRADES = [
        { id: "u_armour_plating", name: "Armour Plating", slots: 1, cost: 4, special: "+2 Hull Points. Can be purchased multiple times." },
        { id: "u_nuclear_engine", name: "Experimental Nuclear Engine", slots: 0, cost: 5, electrical: true, special: "Mishkin only. Non-lightweight only. +2 Max Gear, Long Straight is permitted, explodes on Flip failure." },
        { id: "u_teleporter", name: "Experimental Teleporter", slots: 0, cost: 7, electrical: true, special: "Mishkin only. Teleport start of activation on Skid Die check." },
        { id: "u_extra_crew", name: "Extra Crewmember", slots: 0, cost: 4, special: "+1 Crew, up to double the vehicle's starting Crew Value." },
        { id: "u_sludge_thrower", name: "Improvised Sludge Thrower", slots: 1, cost: 2, special: "May place burst template anywhere in Medium range, 360-deg Arc." },
        { id: "u_louder_siren", name: "Louder Siren", slots: 0, cost: 2, special: "Highway Patrol only. Siren applies to any enemy vehicle, not just bogey." },
        { id: "u_nitro_booster", name: "Nitro Booster", slots: 0, cost: 6, ammo: 1, special: "Ammo 1. Start of movement: forced Long Straight move, set hazards to 5, no reverse. Repeat at end of movement." },
        { id: "u_roll_cage", name: "Roll Cage", slots: 1, cost: 4, special: "Ignore the 2 damage received from a flip." },
        { id: "u_tank_tracks", name: "Tank Tracks", slots: 1, cost: 4, special: "-1 Max Gear, +1 Handling, ignore rough/treacherous surfaces. (No tank/heli/gyro)" }
    ];

    const DEFAULT_PERKS = [
        // Aggression
        { id: "p_double_barreled", name: "Double-Barreled", cost: 2, class: "aggression", desc: "Up to three Crew Fired weapons gain +1 to hit." },
        { id: "p_boarding_party", name: "Boarding Party", cost: 2, class: "aggression", desc: "Ignore Distracted; may shoot while touching obstacle." },
        { id: "p_battlehammer", name: "Battlehammer", cost: 4, class: "aggression", desc: "Gain +1 Smash Attack die per Hazard Token you have." },
        { id: "p_terrifying_lunatic", name: "Terrifying Lunatic", cost: 5, class: "aggression", desc: "Enemies ending movement in Short range gain 1 hazard." },
        { id: "p_grinderman", name: "Grinderman", cost: 5, class: "aggression", desc: "Convert Smash damage into target hazards instead of hull loss." },
        { id: "p_murder_tractor", name: "Murder Tractor", cost: 5, class: "aggression", desc: "May make piledriver attacks like a War Rig." },
        // Badass
        { id: "p_powder_keg", name: "Powder Keg", cost: 1, class: "badass", desc: "+1 to explosion check and treat as 1 weight class heavier." },
        { id: "p_crowd_pleaser", name: "Crowd Pleaser", cost: 1, class: "badass", desc: "If you Wipeout, gain 1 Audience Vote." },
        { id: "p_road_warrior", name: "Road Warrior", cost: 2, class: "badass", desc: "Hit an enemy = remove 1 hazard at end of Attack Step (once)." },
        { id: "p_cover_me", name: "Cover Me", cost: 2, class: "badass", desc: "Once per activation, move 1 hazard to a friend in Double range." },
        { id: "p_madman", name: "Madman", cost: 3, class: "badass", desc: "4+ hazards: move 1 hazard to target in Medium range at end of move." },
        { id: "p_bullet_time", name: "Bullet-Time", cost: 3, class: "badass", desc: "Resolve a Slide: count 1 weapon as Turreted for this activation." },
        // Built
        { id: "p_dead_weight", name: "Dead Weight", cost: 2, class: "built", desc: "Gain 2 hazards to count as 1 weight heavier until next turn." },
        { id: "p_barrel_roll", name: "Barrel Roll", cost: 2, class: "built", desc: "Flip template may be placed on sides or rear instead of front." },
        { id: "p_bruiser", name: "Bruiser", cost: 4, class: "built", desc: "Declare non-Evade reaction: target immediately gains 1 hazard." },
        { id: "p_splashback", name: "Splashback", cost: 5, class: "built", desc: "Lose hull: make a 1D6 attack to all in Medium range." },
        { id: "p_crusher", name: "Crusher", cost: 7, class: "built", desc: "Gain Up and Over special rule (drive over lighter cars)." },
        { id: "p_feel_no_pain", name: "Feel No Pain", cost: 8, class: "built", desc: "Roll 2 or fewer uncancelled hits against you? Cancel them all." },
        // Daring
        { id: "p_chrome_whisperer", name: "Chrome-Whisperer", cost: 2, class: "daring", desc: "Push It any number of times in movement step." },
        { id: "p_slippery", name: "Slippery", cost: 3, class: "daring", desc: "Enemies attacking you with Smash suffer -2 dice." },
        { id: "p_handbrake_artist", name: "Handbrake Artist", cost: 3, class: "daring", desc: "Spin result allows facing ANY direction." },
        { id: "p_evasive", name: "Evasive", cost: 5, class: "daring", desc: "Gain hazards before Evade roll to get +1 per die (1 still fails)." },
        { id: "p_powerslide", name: "Powerslide", cost: 5, class: "daring", desc: "Use any template (except Long) for slides." },
        { id: "p_stunt_driver", name: "Stunt Driver", cost: 7, class: "daring", desc: "Light/Medium only: ignore obstructions in move, gain 3 hazards." },
        // Horror
        { id: "p_purifying_flames", name: "Purifying Flames", cost: 1, class: "horror", desc: "Suffer up to 3 fire damage to heal a friend same amount." },
        { id: "p_ecstatic_visions", name: "Ecstatic Visions", cost: 1, class: "horror", desc: "Gain up to 3 hazards: clear that many hazards from a friend." },
        { id: "p_sympathy_devil", name: "Sympathy for the Devil", cost: 1, class: "horror", desc: "Evade check: add nearby friend's gear; share damage." },
        { id: "p_highway_hell", name: "Highway to Hell", cost: 2, class: "horror", desc: "Straight move: suffer 2 fire damage to drop Napalm template." },
        { id: "p_violent_manifestation", name: "Violent Manifestation", cost: 3, class: "horror", desc: "Respawning causes a Blast + Fire explosion." },
        { id: "p_angel_of_death", name: "Angel of Death", cost: 4, class: "horror", desc: "Suffer up to 3 damage to add that many attack dice." },
        // Military
        { id: "p_dead_eye", name: "Dead-Eye", cost: 2, class: "military", desc: "+1 to hit at Double range (not within Medium)." },
        { id: "p_loader", name: "Loader", cost: 2, class: "military", desc: "Reduce crew by 1 in Attack Step to gain +1 to hit with 1 weapon." },
        { id: "p_fully_loaded", name: "Fully Loaded", cost: 2, class: "military", desc: "Weapon has 3+ ammo: get +1 attack die." },
        { id: "p_rapid_fire", name: "Rapid Fire", cost: 2, class: "military", desc: "Once per round, gain extra Attack Step for a single weapon." },
        { id: "p_headshot", name: "Headshot", cost: 4, class: "military", desc: "Critical hits inflict 3 hits instead of 2." },
        { id: "p_return_fire", name: "Return Fire", cost: 5, class: "military", desc: "Shot at: gain 2 hazards to shoot back immediately (once/phase)." },
        // Precision
        { id: "p_mister_fahrenheit", name: "Mister Fahrenheit", cost: 2, class: "precision", desc: "Cannot gain more than 2 hazards from collisions in activation." },
        { id: "p_moment_of_glory", name: "Moment of Glory", cost: 2, class: "precision", desc: "Once per game, set all Skid Dice results to whatever you choose." },
        { id: "p_restraint", name: "Restraint", cost: 2, class: "precision", desc: "Shift down: clear 1 hazard instead of gaining one." },
        { id: "p_expertise", name: "Expertise", cost: 3, class: "precision", desc: "Permanently add +1 to Handling Value." },
        { id: "p_trick_driving", name: "Trick Driving", cost: 3, class: "precision", desc: "Select templates as if gear is 1 higher or lower." },
        { id: "p_easy_rider", name: "Easy Rider", cost: 5, class: "precision", desc: "Once per round, discard one Skid Die result." },
        // Pursuit
        { id: "p_on_your_tail", name: "On Your Tail", cost: 2, class: "pursuit", desc: "Enemy slide/spin ending in Short range grants them 1 hazard." },
        { id: "p_schadenfreude", name: "Schadenfreude", cost: 2, class: "pursuit", desc: "Enemy wipes out in Short range: clear all your hazards." },
        { id: "p_taunt", name: "Taunt", cost: 2, class: "pursuit", desc: "Roll Skid Die: place result on target in Short range (no re-rolls)." },
        { id: "p_out_run", name: "Out Run", cost: 2, class: "pursuit", desc: "Cars within Short range in lower gear gain 1 hazard." },
        { id: "p_pit", name: "Pit", cost: 4, class: "pursuit", desc: "Collision reaction: force target to resolve turning template move." },
        { id: "p_unnerving_contact", name: "Unnerving Eye Contact", cost: 5, class: "pursuit", desc: "Enemies in Short range cannot use Shifts to clear hazards." },
        // Reckless
        { id: "p_drive_angry", name: "Drive Angry", cost: 1, class: "reckless", desc: "Start activation: gain 1 Hazard Token." },
        { id: "p_hog_wild", name: "Hog Wild", cost: 2, class: "reckless", desc: "Wipeout step collisions: get +2 Smash attack dice." },
        { id: "p_in_for_penny", name: "In For a Penny", cost: 2, class: "reckless", desc: "Gained 6+ hazards: double your Smash attack dice." },
        { id: "p_dont_come_knocking", name: "Don't Come Knocking", cost: 4, class: "reckless", desc: "Start activation: gain 4 hazards, immune to hazard changes." },
        { id: "p_biggern_you", name: "Bigger'n You", cost: 4, class: "reckless", desc: "Double weight difference Smash bonuses/penalties." },
        { id: "p_beerserker", name: "Beerserker", cost: 5, class: "reckless", desc: "Damage outside activation reduced by 1 (minimum 1)." },
        // Speed
        { id: "p_hot_start", name: "Hot Start", cost: 1, class: "speed", desc: "Start game: roll D6 for starting gear (capped at max)." },
        { id: "p_slipstream", name: "Slipstream", cost: 2, class: "speed", desc: "Tailgate: no hazards, change gear up/down, enemy gets no reaction." },
        { id: "p_overload", name: "Overload", cost: 2, class: "speed", desc: "May roll 1 extra Skid Die; must change gear up or gain hazard." },
        { id: "p_downshift", name: "Downshift", cost: 3, class: "speed", desc: "Changed gear down: resolve forced Short Straight move." },
        { id: "p_time_extended", name: "Time Extended!", cost: 3, class: "speed", desc: "Passing a race gate clears all your Hazard Tokens." },
        { id: "p_hell_for_leather", name: "Hell for Leather", cost: 5, class: "speed", desc: "Long Straight template permitted in any gear without hazard/trivial." },
        // Technology
        { id: "p_rocket_thrusters", name: "Rocket Thrusters", cost: 1, class: "technology", desc: "Flip move can use Long Straight, Gentle, or Veer templates." },
        { id: "p_whizbang", name: "Whizbang", cost: 1, class: "technology", desc: "Gain 1 random Speed perk for this game." },
        { id: "p_gyroscope", name: "Gyroscope", cost: 1, class: "technology", desc: "Gain 1 random Daring perk for this game." },
        { id: "p_satellite_nav", name: "Satellite Navigation", cost: 2, class: "technology", desc: "Store Shift results for any team car to use later." },
        { id: "p_mobile_mechanic", name: "Mobile Mechanic", cost: 3, class: "technology", desc: "Reduce crew by 1 in Attack Step to repair 1 Hull." },
        { id: "p_eureka", name: "Eureka!", cost: 4, class: "technology", desc: "Once per game: fire any weapon you don't actually own." },
        // Tuning
        { id: "p_fenderkiss", name: "Fenderkiss", cost: 2, class: "tuning", desc: "Both cars suffer -2 Smash attack dice in collisions with you." },
        { id: "p_rear_drive", name: "Rear Drive", cost: 2, class: "tuning", desc: "Pivot about front edge instead of center on spins." },
        { id: "p_delicate_touch", name: "Delicate Touch", cost: 3, class: "tuning", desc: "Ignore hazard icons on movement templates." },
        { id: "p_momentum", name: "Momentum", cost: 3, class: "tuning", desc: "Set aside Slide/Spin to re-roll a Skid Die." },
        { id: "p_purring", name: "Purring", cost: 6, class: "tuning", desc: "Max 1 hazard per activation from spins, slides, or hazard results each." },
        { id: "p_skiing", name: "Skiing", cost: 6, class: "tuning", desc: "Handling 3+: gain 3 hazards to be ignored/phased by cars in move." }
    ];

    const DEFAULT_SPONSORS = [
        { id: "sp_sponsorless", name: "Sponsorless", perks: ["aggression", "badass", "built", "daring", "horror", "military", "precision", "pursuit", "reckless", "speed", "technology", "tuning"], sponsored: [], desc: "No restrictions on perk selection. Standard team rules apply." },
        { id: "sp_rutherford", name: "Rutherford", perks: ["badass", "military"], sponsored: ["Might Is Right: Cannot purchase Lightweight vehicles.", "Well Stocked: Ammo 3 weapons gain Ammo 4 instead.", "Military Hardware: May purchase a single Tank and Helicopter.", "Televised Carnage: Gain 1 Audience Vote if causing 6+ hits in an Attack Step."], desc: "Aggressive military surplus. No Lightweight vehicles. High ammo capacity." },
        { id: "sp_miyazaki", name: "Miyazaki", perks: ["daring", "precision"], sponsored: ["Elegance: Cannot buy vehicle types with base Handling <= 2.", "Virtuoso: First Push It each activation is hazard-free.", "Showing Off: Spin, Slide, and Gear change in activation grants Showing Off token. Convert to votes at turn end."], desc: "Elegance and drift performance. High handling only." },
        { id: "sp_mishkin", name: "Mishkin", perks: ["military", "technology"], sponsored: ["Thumpermonkey: Only team permitted to buy Electrical weapons/upgrades.", "Dynamo: +1 Ammo to electrical item after activating in Gear Phase 4, 5, or 6.", "All the Toys: Gain 1 Audience Vote when attacking with a weapon not fired yet this game."], desc: "Hi-tech gadgets and electrical weaponry." },
        { id: "sp_idris", name: "Idris", perks: ["precision", "speed"], sponsored: ["N2O Addict: Buy Nitro Booster upgrade at half cost (3 Cans).", "Speed Demon: Nitro Booster hazard check capped at 3 instead of 5.", "Cult of Speed: Selecting Long Straight template in Gear 1-3 grants 1 Audience Vote.", "Kiss My Asphalt: Cannot purchase Gyrocopters."], desc: "Fanatical speed-worship. Fast Straight template rewards." },
        { id: "sp_slime", name: "Slime", perks: ["tuning", "reckless"], sponsored: ["Pinball: Smash attack along side edges lets you resolve another Movement Step.", "Spiked Fist: Ram upgrade requires 0 build slots.", "Live Fast: Begin Wipeout with hazards > hull = gain 1 Audience Vote."], desc: "Wild Australian wasteland drift-smasher. Slotless rams." },
        { id: "sp_warden", name: "The Warden", perks: ["aggression", "badass"], sponsored: ["Prison Cars: Middleweights can buy 'Prison Car' (-4 Cans, -2 Hull, max 1).", "Fireworks: Exploding grants 1/2 Audience Votes. Discard all ammo from wreck."], desc: "Heavy steel coffin cars and explosive wrecks." },
        { id: "sp_scarlett", name: "Scarlett", perks: ["tuning", "aggression"], sponsored: ["Crew Quarters: Buy Extra Crewmember upgrade at half cost (2 Cans).", "Raiders: Can sacrifice crew at end of Attack Step to damage cars in contact.", "Raise the Sails: Sacrifice crew after Skid Dice for free Shift result.", "Press Gang: When nearby car is Wrecked, gain 1 crew or 2 Audience Votes."], desc: "Dashing desert pirates. Crew recycling mechanics." },
        { id: "sp_highway_patrol", name: "Highway Patrol", perks: ["speed", "pursuit"], sponsored: ["Hot Pursuit: Designate an enemy as the 'bogey'.", "Bogey at 12: Move again if bogey is in front Arc and past Double range.", "Siren: Bogey in rear Arc must reduce gear by 1 or gain 2 hazards.", "Steel Justice: Wrecking or wiping out the bogey grants Audience Votes.", "Louder Siren: Upgrade option (2 Cans) applies Siren to any enemy vehicle."], desc: "Vigilante interceptors hunting the 'bogey'." },
        { id: "sp_verney", name: "Verney", perks: ["technology", "built"], sponsored: ["MicroPlate Armour: Upgrade option (6 Cans, 0 Slots, +2 Hull).", "Trunk of Junk: Can fire multiple dropped weapons in a single activation.", "Tombstone: Rear Cover provides +1 Evade. Gain 2 hazards to force Head-on collisions.", "That's Entertainment: Gain 1 Audience Vote when your dropped template is removed."], desc: "Frankenstein customizer. Microplates and dropped weaponry." },
        { id: "sp_maxxine", name: "Maxxine", perks: ["tuning", "pursuit"], sponsored: ["Dizzy: Resolve multiple spin results separately to spin > 90 deg.", "Maxximum Drift: Use Straight templates in place of slides on 2+ slide results.", "Meshuggah: Drift ending within Medium range of friend grants 1 Audience Vote."], desc: "Swan-lake mechanised ballet drifting." },
        { id: "sp_inferno", name: "The Order of the Inferno", perks: ["horror", "speed"], sponsored: ["Fire Walk With Me: Reduce Fire damage by up to 3 (minimum 1).", "Burning Man: +1 to Evade dice if On Fire.", "Cult of Flame: End of phase, gain votes if more enemies are on fire than friends."], desc: "Pyromaniacs who thrive when On Fire." },
        { id: "sp_beverly", name: "Beverly", perks: ["horror", "built"], sponsored: ["Graveyard Shift: All vehicles except one gain 'Ghost Rider' at start.", "Ghost Rider: Cannot collide, cannot shoot/be shot, ignored by all, ignores victory rules.", "Soul Anchor: If all active cars are Ghost Riders, remove team from play.", "Soul Harvest: Passing through cars gains Soul tokens. Dump tokens to heal friends or gain votes."], desc: "Haunting spirits drifting through steel walls." },
        { id: "sp_bootleggers", name: "Rusty's Bootleggers", perks: ["reckless", "built"], sponsored: ["Dutch Courage: Only Wipeout at 8+ Hazard tokens.", "Party Hard: Gain votes based on nearby enemy hazards.", "Trailer Trash: Must contain articulated trailers or War Rig. Trailers get free Cargo.", "Over the Limit: Veer is permitted/Trivial in any gear. Straights are NEVER permitted.", "As Straight as I'm Able: Ignore articulated template hazards for turning."], desc: "Moonshiners pulling articulated trailers." }
    ];

    const LibraryManager = {
        data: {
            vehicles: JSON.parse(JSON.stringify(DEFAULT_VEHICLES)),
            weapons: JSON.parse(JSON.stringify(DEFAULT_WEAPONS)),
            upgrades: JSON.parse(JSON.stringify(DEFAULT_UPGRADES)),
            perks: JSON.parse(JSON.stringify(DEFAULT_PERKS)),
            sponsors: JSON.parse(JSON.stringify(DEFAULT_SPONSORS))
        },

        init() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed.weapons && Array.isArray(parsed.weapons)) this.data.weapons = parsed.weapons;
                    if (parsed.upgrades && Array.isArray(parsed.upgrades)) this.data.upgrades = parsed.upgrades;
                    if (parsed.perks && Array.isArray(parsed.perks)) this.data.perks = parsed.perks;
                    if (parsed.vehicles && Array.isArray(parsed.vehicles)) this.data.vehicles = parsed.vehicles;
                    if (parsed.sponsors && Array.isArray(parsed.sponsors)) this.data.sponsors = parsed.sponsors;
                }
            } catch (e) {
                console.warn("[LibraryManager] Failed to load saved custom library, using defaults:", e);
            }
        },

        save() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
            } catch (e) {
                console.error("[LibraryManager] Failed to persist custom library to localStorage:", e);
            }
        },

        resetToDefaults() {
            this.data = {
                vehicles: JSON.parse(JSON.stringify(DEFAULT_VEHICLES)),
                weapons: JSON.parse(JSON.stringify(DEFAULT_WEAPONS)),
                upgrades: JSON.parse(JSON.stringify(DEFAULT_UPGRADES)),
                perks: JSON.parse(JSON.stringify(DEFAULT_PERKS)),
                sponsors: JSON.parse(JSON.stringify(DEFAULT_SPONSORS))
            };
            this.save();
        },

        exportJSON() {
            const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "game-manager-library.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },

        importJSON(jsonString) {
            try {
                const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
                if (!parsed || typeof parsed !== 'object') throw new Error("Invalid library format");
                if (parsed.weapons && Array.isArray(parsed.weapons)) this.data.weapons = parsed.weapons;
                if (parsed.upgrades && Array.isArray(parsed.upgrades)) this.data.upgrades = parsed.upgrades;
                if (parsed.perks && Array.isArray(parsed.perks)) this.data.perks = parsed.perks;
                if (parsed.vehicles && Array.isArray(parsed.vehicles)) this.data.vehicles = parsed.vehicles;
                if (parsed.sponsors && Array.isArray(parsed.sponsors)) this.data.sponsors = parsed.sponsors;
                this.save();
                return { success: true };
            } catch (err) {
                return { success: false, error: err.message };
            }
        },

        // Item CRUD
        addWeapon(item) {
            if (!item.id) item.id = "w_custom_" + Date.now();
            this.data.weapons.push(item);
            this.save();
            return item;
        },
        updateWeapon(id, item) {
            const idx = this.data.weapons.findIndex(x => x.id === id || x.name === id);
            if (idx >= 0) {
                this.data.weapons[idx] = { ...this.data.weapons[idx], ...item };
                this.save();
            }
        },
        removeWeapon(id) {
            this.data.weapons = this.data.weapons.filter(x => x.id !== id && x.name !== id);
            this.save();
        },

        addUpgrade(item) {
            if (!item.id) item.id = "u_custom_" + Date.now();
            this.data.upgrades.push(item);
            this.save();
            return item;
        },
        updateUpgrade(id, item) {
            const idx = this.data.upgrades.findIndex(x => x.id === id || x.name === id);
            if (idx >= 0) {
                this.data.upgrades[idx] = { ...this.data.upgrades[idx], ...item };
                this.save();
            }
        },
        removeUpgrade(id) {
            this.data.upgrades = this.data.upgrades.filter(x => x.id !== id && x.name !== id);
            this.save();
        },

        addPerk(item) {
            if (!item.id) item.id = "p_custom_" + Date.now();
            this.data.perks.push(item);
            this.save();
            return item;
        },
        updatePerk(id, item) {
            const idx = this.data.perks.findIndex(x => x.id === id || x.name === id);
            if (idx >= 0) {
                this.data.perks[idx] = { ...this.data.perks[idx], ...item };
                this.save();
            }
        },
        removePerk(id) {
            this.data.perks = this.data.perks.filter(x => x.id !== id && x.name !== id);
            this.save();
        },

        addVehicleType(item) {
            if (!item.id) item.id = "v_custom_" + Date.now();
            this.data.vehicles.push(item);
            this.save();
            return item;
        },
        updateVehicleType(id, item) {
            const idx = this.data.vehicles.findIndex(x => x.id === id || x.name === id);
            if (idx >= 0) {
                this.data.vehicles[idx] = { ...this.data.vehicles[idx], ...item };
                this.save();
            }
        },
        removeVehicleType(id) {
            this.data.vehicles = this.data.vehicles.filter(x => x.id !== id && x.name !== id);
            this.save();
        },

        addSponsor(item) {
            if (!item.id) item.id = "sp_custom_" + Date.now();
            this.data.sponsors.push(item);
            this.save();
            return item;
        },
        updateSponsor(id, item) {
            const idx = this.data.sponsors.findIndex(x => x.id === id || x.name === id);
            if (idx >= 0) {
                this.data.sponsors[idx] = { ...this.data.sponsors[idx], ...item };
                this.save();
            }
        },
        removeSponsor(id) {
            this.data.sponsors = this.data.sponsors.filter(x => x.id !== id && x.name !== id);
            this.save();
        }
    };

    LibraryManager.init();
    window.LibraryManager = LibraryManager;

})(window);
