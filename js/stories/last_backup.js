export default {
    metadata: {
        title: "The Last Backup",
        version: "1.8.1",
        lastUpdated: "2024-03-19",
        author: "FutureStrike Team",
        description: "A simple data delivery becomes a fight for survival when you discover what's really in the backup.",
        difficulty: "Medium",
        estimatedTime: "30-45 minutes",
        defaultImage: "lastbkp.webp"
    },
    gameConfig: {
        startingHealth: 20,
        maxHealth: 20,
        difficultyModifiers: {
            "Light": 3,    // Internal values, not shown to player
            "Medium": 4,
            "Heavy": 5
        }
    },
    scenes: {
        // HOOK: The Setup
        1: {
            image: "apartment.png",
            text: "A simple job: deliver a neural backup to a corp exec. 'Don't scan it, don't copy it, just move it,' they said. But your systems are picking up weird data signatures from the package. Something's not right.",
            turnText: "Choose your initial approach. The data feels... alive.",
            choices: [
                {
                    text: "Take to the streets - stick to the crowds",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "street_level",
                    endsTurn: true
                },
                {
                    text: "Quick scan of the data",
                    type: "Heavy",
                    difficulty: 5,
                    outcome: "You glimpse fragments: medical data, AI patterns... and something else. Your head hurts.",
                    endsTurn: false
                },
                {
                    text: "Check client background",
                    type: "Medium",
                    difficulty: 4,
                    outcome: "Multiple shell companies. Dead ends. Someone's covering their tracks.",
                    endsTurn: false
                }
            ]
        },

        // LINE: First Twist
        street_level: {
            image: "street.png",
            text: "Your neural implant buzzes - the backup data is attempting to auto-execute. This isn't just data, it's trying to run something. Corps are closing in fast, almost like they can track it.",
            turnText: "The package is more than just data. It's changing.",
            choices: [
                {
                    text: "Rush to the night market",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "night_market",
                    endsTurn: true
                },
                {
                    text: "Attempt to contain signal",
                    type: "Heavy",
                    difficulty: 5,
                    outcome: "You suppress it temporarily, but it's fighting back. It's definitely alive.",
                    endsTurn: false
                },
                {
                    text: "Contact the client",
                    type: "Light",
                    difficulty: 3,
                    outcome: "No response. But you hear whispers about a 'rogue AI backup' on local networks.",
                    endsTurn: false
                }
            ]
        },

        // LINE: The Discovery
        night_market: {
            image: "market.png",
            text: "The Night Market buzzes with illegal tech trades and black market commerce. Holographic advertisements cast their neon glow across rain-slicked streets, illuminating the faces of netrunners, fixers, and corporate spies conducting their business in hushed tones. The air is thick with the smell of synthetic food, circuit board solder, and desperation. Street vendors hawk everything from military-grade cybernetics to bootlegged personality constructs. You notice several MegaTech security personnel moving through the crowd, scanning faces with their augmented vision. The Oracle data package pulses nervously in your neural storage.",
            turnText: "You're not a courier anymore. You're a lifeline.",
            choices: [
                {
                    text: "Blend with corp workers",
                    difficulty: 4,
                    nextScene: "corp_blend"
                },
                {
                    text: "Negotiate with data fence",
                    difficulty: 4,
                    nextScene: "data_fence"
                },
                {
                    text: "Risk back alley",
                    difficulty: 5,
                    nextScene: "back_alley"
                }
            ]
        },

        // SINKER: The Choice
        hidden_net: {
            image: "network.png",
            text: "Project Oracle reveals the truth: it's an AI designed to predict and prevent corporate crimes. The corps want it gone because it works. You have the last pure version - and a choice to make.",
            turnText: "Your next move could change everything.",
            choices: [
                {
                    text: "Upload to public network",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "public_revolution",
                    endsTurn: true
                },
                {
                    text: "Sell to highest bidder",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "profit_ending",
                    endsTurn: true
                },
                {
                    text: "Become Oracle's guardian",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "secret_keeper",
                    endsTurn: true
                }
            ]
        },

        // TWIST ENDINGS
        public_revolution: {
            image: "revolution.png",
            text: "The truth spreads like wildfire. Corps scramble to contain it, but it's too late. Oracle's predictions go public, exposing decades of corporate crimes. The system's about to change - and you lit the fuse.",
            turnText: "The revolution wasn't planned. It was predicted.",
            choices: [
                {
                    text: "END TRANSMISSION",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "game_over",
                    endsTurn: true
                }
            ]
        },

        profit_ending: {
            image: "profit.png",
            text: "You're rich, but Oracle's last words haunt you: 'I predicted this choice too. Watch the news tomorrow.' The next day, you see it: global markets crash, corps fall. Your new wealth is worthless.",
            turnText: "Some predictions are warnings.",
            choices: [
                {
                    text: "END TRANSMISSION",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "game_over",
                    endsTurn: true
                }
            ]
        },

        secret_keeper: {
            image: "keeper.png",
            text: "You go off-grid with Oracle, becoming its protector. Together, you work from the shadows, subtly steering the future. The corps know you're out there, but Oracle always keeps you one step ahead.",
            turnText: "The future isn't written - it's predicted.",
            choices: [
                {
                    text: "END TRANSMISSION",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "game_over",
                    endsTurn: true
                }
            ]
        },
        2: {
            text: "The streets are packed with corporate wage slaves and street vendors. Your neural implants highlight multiple surveillance zones ahead.",
            choices: [
                {
                    text: "Blend with the crowd",
                    type: "Light",
                    difficulty: 3
                },
                {
                    text: "Use back alleys",
                    type: "Heavy",
                    difficulty: 5
                },
                {
                    text: "Create a distraction",
                    type: "Medium",
                    difficulty: 4
                }
            ]
        },
        3: {
            text: "You spot Zhang's meeting spot - an old noodle stand. But something feels off...",
            choices: [
                {
                    text: "Approach directly",
                    type: "Light",
                    difficulty: 3
                },
                {
                    text: "Scan for threats",
                    type: "Medium",
                    difficulty: 4
                },
                {
                    text: "Contact Zhang",
                    type: "Heavy",
                    difficulty: 5
                }
            ]
        },
        4: {
            text: "Mission complete. Your neural implants buzz with satisfaction as you process the events that just transpired.",
            choices: [] // Empty choices array triggers end game
        },
        tunnels: {
            image: "tunnels.png",
            text: "The maintenance tunnels beneath Night City are a labyrinth of pipes, cables, and forgotten infrastructure. The air is thick with moisture and the smell of rust. Automated repair drones occasionally buzz past, their sensors easily fooled by your signal scrambler. 'These tunnels were part of my initial mapping project,' the Oracle whispers in your mind. 'I have partial schematics, but many sections have been modified since my last update.'",
            turnText: "The tunnels offer multiple paths forward.",
            choices: [
                {
                    text: "Follow Oracle's directions",
                    difficulty: 4,
                    nextScene: "tunnel_oracle"
                },
                {
                    text: "Use your own knowledge",
                    difficulty: 5,
                    nextScene: "tunnel_instinct"
                }
            ]
        },
        rooftops: {
            image: "rooftops.png",
            text: "The rooftops of Night City offer a dangerous but effective path. Corporate surveillance focuses on street level, leaving the vertical spaces between megastructures relatively unwatched. You leap between buildings, your reinforced tendons absorbing the impact. Rain pelts your face as you navigate the urban canopy. 'Impressive physical capabilities,' the Oracle notes. 'Your cybernetic enhancements are military-grade. Were you once corporate security?'",
            turnText: "The high route is dangerous but offers clear options.",
            choices: [
                {
                    text: "Avoid corporate zones",
                    difficulty: 5,
                    nextScene: "rooftop_residential"
                },
                {
                    text: "Risk crossing corp territory",
                    difficulty: 6,
                    nextScene: "rooftop_corporate"
                }
            ]
        },
        side_street: {
            image: "side_street.png",
            text: "You duck into a narrow side street, away from the main thoroughfares. The buildings press close on either side, creating a canyon of concrete and steel. Makeshift homes and illegal market stalls line the walls. A security drone hovers at the far end, its scanning beam sweeping methodically across the passage. 'MegaTech security protocols,' the Oracle identifies. 'That drone is running facial recognition against their database of known associates.'",
            turnText: "Consider your options carefully. The quiet might be deceptive.",
            choices: [
                {
                    text: "Quick-hack drone",
                    difficulty: 5,
                    nextScene: "hack_drone"
                },
                {
                    text: "Hide and observe",
                    difficulty: 3,
                    nextScene: "hide_observe"
                },
                {
                    text: "Combat preparation",
                    difficulty: 4,
                    nextScene: "combat_prep"
                }
            ]
        },
        noodle_shop: {
            image: "noodles.png",
            text: "Steam rises from countless bowls in the cramped noodle shop. The owner, an old woman with extensive cyber-mods, gives you a knowing look. Your neural scanners detect a hidden network hub beneath the shop, and you notice both a corporate exec eating alone and a maintenance access panel behind the kitchen.",
            turnText: "The shop offers both cover and opportunities.",
            choices: [
                {
                    text: "Access the hidden network",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "hidden_net"
                },
                {
                    text: "Plant data on the exec's device",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "exec_plant"
                },
                {
                    text: "Use maintenance access",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "shop_escape"
                }
            ]
        },
        worker_route: {
            image: "worker.png",
            text: "You're in the midst of a bustling tech factory. The air is thick with the scent of circuit boards and the sound of machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The factory offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a storage room",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "storage_room"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        storage_room: {
            image: "storage.png",
            text: "You're in a dimly lit storage room filled with old tech and crates. The air is thick with dust and the sound of distant machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The storage room offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a crate",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "crate"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        crate: {
            image: "crate.png",
            text: "You're in a crate filled with old tech and circuit boards. The air is thick with dust and the sound of distant machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The crate offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a crate",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "crate"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        security_gate: {
            image: "security_gate.png",
            text: "You're in front of a heavily guarded security gate. The gate is controlled by a sophisticated AI system. You need to hack it to proceed.",
            turnText: "The gate is heavily guarded. You need to hack it to proceed.",
            choices: [
                {
                    text: "Use a brute force hack",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "brute_force"
                },
                {
                    text: "Use a social engineering hack",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "social_engineering"
                },
                {
                    text: "Use a physical key",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "physical_key"
                }
            ]
        },
        brute_force: {
            image: "brute_force.png",
            text: "You're in front of a heavily guarded security gate. The gate is controlled by a sophisticated AI system. You need to hack it to proceed. You're using a brute force hack.",
            turnText: "The gate is heavily guarded. You need to hack it to proceed.",
            choices: [
                {
                    text: "Use a brute force hack",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "brute_force"
                },
                {
                    text: "Use a social engineering hack",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "social_engineering"
                },
                {
                    text: "Use a physical key",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "physical_key"
                }
            ]
        },
        social_engineering: {
            image: "social_engineering.png",
            text: "You're in front of a heavily guarded security gate. The gate is controlled by a sophisticated AI system. You need to hack it to proceed. You're using a social engineering hack.",
            turnText: "The gate is heavily guarded. You need to hack it to proceed.",
            choices: [
                {
                    text: "Use a brute force hack",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "brute_force"
                },
                {
                    text: "Use a social engineering hack",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "social_engineering"
                },
                {
                    text: "Use a physical key",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "physical_key"
                }
            ]
        },
        physical_key: {
            image: "physical_key.png",
            text: "You're in front of a heavily guarded security gate. The gate is controlled by a sophisticated AI system. You need to hack it to proceed. You're using a physical key.",
            turnText: "The gate is heavily guarded. You need to hack it to proceed.",
            choices: [
                {
                    text: "Use a brute force hack",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "brute_force"
                },
                {
                    text: "Use a social engineering hack",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "social_engineering"
                },
                {
                    text: "Use a physical key",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "physical_key"
                }
            ]
        },
        drone_escape: {
            image: "drone_escape.png",
            text: "You're in the midst of a bustling tech factory. The air is thick with the scent of circuit boards and the sound of machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The factory offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a crate",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "crate"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        stakeout: {
            image: "stakeout.png",
            text: "You're in a dimly lit alley, hidden from the main street. Your contact's vehicle, a beaten-up delivery drone, hovers near a defunct charging station. But something feels off. You spot unusual network traffic in your HUD, camera drones above, and the distant rumble of approaching vehicles.",
            turnText: "Consider your options carefully. The quiet might be deceptive.",
            choices: [
                {
                    text: "Quick-hack the delivery drone",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "drone_escape"
                },
                {
                    text: "Hide and observe the situation",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "stakeout"
                },
                {
                    text: "Prepare for potential combat",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "street_fight"
                }
            ]
        },
        street_fight: {
            image: "street_fight.png",
            text: "You're in the midst of a bustling tech factory. The air is thick with the scent of circuit boards and the sound of machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The factory offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a crate",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "crate"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        exec_plant: {
            image: "exec_plant.png",
            text: "You're in the midst of a bustling tech factory. The air is thick with the scent of circuit boards and the sound of machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The factory offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a crate",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "crate"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        shop_escape: {
            image: "shop_escape.png",
            text: "You're in the midst of a bustling tech factory. The air is thick with the scent of circuit boards and the sound of machinery. You're not alone down here, and you need to move quickly to avoid detection.",
            turnText: "The factory offers multiple paths forward.",
            choices: [
                {
                    text: "Hide in a crate",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "crate"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "tunnels"
                }
            ]
        },
        start: {
            image: "start.png",
            text: "The data package suddenly connects to your neural web, bypassing your standard security protocols. A digitized voice echoes through your consciousness: 'Help me. I'm the last uncorrupted backup of Project Oracle. MegaTech security forces are hunting me down. My core functions are fragmenting, and I need a secure host to stabilize my algorithms. You're my only hope for survival in this sector.'",
            choices: [
                {
                    text: "Take to the streets",
                    difficulty: 3,
                    nextScene: "streets"
                },
                {
                    text: "Use maintenance tunnels",
                    difficulty: 4,
                    nextScene: "tunnels"
                },
                {
                    text: "Use the rooftops",
                    difficulty: 5,
                    nextScene: "rooftops"
                }
            ]
        },
        
        streets: {
            image: "streets.png",
            text: "You step out into the rain-slicked streets of Night City. Neon advertisements reflect in puddles beneath your feet, and the constant hum of drones overhead reminds you of the ever-present surveillance. The Oracle data pulses in your neural storage, almost like a heartbeat. 'They're tracking my signal,' it warns. 'We need to move quickly and find somewhere to stabilize my core functions.'",
            choices: [
                {
                    text: "Head to Night Market",
                    difficulty: 3,
                    nextScene: "night_market"
                },
                {
                    text: "Take the side street",
                    difficulty: 4,
                    nextScene: "side_street"
                }
            ]
        },
        
        tunnels: {
            image: "tunnels.png",
            text: "The maintenance tunnels beneath Night City are a labyrinth of pipes, cables, and forgotten infrastructure. The air is thick with moisture and the smell of rust. Automated repair drones occasionally buzz past, their sensors easily fooled by your signal scrambler. 'These tunnels were part of my initial mapping project,' the Oracle whispers in your mind. 'I have partial schematics, but many sections have been modified since my last update.'",
            choices: [
                {
                    text: "Follow Oracle's directions",
                    difficulty: 4,
                    nextScene: "tunnel_oracle"
                },
                {
                    text: "Use your own knowledge",
                    difficulty: 5,
                    nextScene: "tunnel_instinct"
                }
            ]
        },
        
        rooftops: {
            image: "rooftops.png",
            text: "The rooftops of Night City offer a dangerous but effective path. Corporate surveillance focuses on street level, leaving the vertical spaces between megastructures relatively unwatched. You leap between buildings, your reinforced tendons absorbing the impact. Rain pelts your face as you navigate the urban canopy. 'Impressive physical capabilities,' the Oracle notes. 'Your cybernetic enhancements are military-grade. Were you once corporate security?'",
            choices: [
                {
                    text: "Avoid corporate zones",
                    difficulty: 5,
                    nextScene: "rooftop_residential"
                },
                {
                    text: "Risk crossing corp territory",
                    difficulty: 6,
                    nextScene: "rooftop_corporate"
                }
            ]
        },
        
        night_market: {
            image: "market.png",
            text: "The Night Market buzzes with illegal tech trades and black market commerce. Holographic advertisements cast their neon glow across rain-slicked streets, illuminating the faces of netrunners, fixers, and corporate spies conducting their business in hushed tones. The air is thick with the smell of synthetic food, circuit board solder, and desperation. Street vendors hawk everything from military-grade cybernetics to bootlegged personality constructs. You notice several MegaTech security personnel moving through the crowd, scanning faces with their augmented vision. The Oracle data package pulses nervously in your neural storage.",
            choices: [
                {
                    text: "Blend with corp workers",
                    difficulty: 4,
                    nextScene: "corp_blend"
                },
                {
                    text: "Negotiate with data fence",
                    difficulty: 4,
                    nextScene: "data_fence"
                },
                {
                    text: "Risk back alley",
                    difficulty: 5,
                    nextScene: "back_alley"
                }
            ]
        },
        
        side_street: {
            image: "side_street.png",
            text: "You duck into a narrow side street, away from the main thoroughfares. The buildings press close on either side, creating a canyon of concrete and steel. Makeshift homes and illegal market stalls line the walls. A security drone hovers at the far end, its scanning beam sweeping methodically across the passage. 'MegaTech security protocols,' the Oracle identifies. 'That drone is running facial recognition against their database of known associates.'",
            choices: [
                {
                    text: "Quick-hack drone",
                    difficulty: 5,
                    nextScene: "hack_drone"
                },
                {
                    text: "Hide and observe",
                    difficulty: 3,
                    nextScene: "hide_observe"
                },
                {
                    text: "Combat preparation",
                    difficulty: 4,
                    nextScene: "combat_prep"
                }
            ]
        },
        
        data_fence: {
            image: "fence.png",
            text: "You find Zhi-Ren's booth hidden behind a cascade of glitching holographic advertisements for prohibited tech. The data fence is a wiry man with extensive facial cybernetics that pulse with blue light as he scans you. His right eye is a custom optical implant that whirs softly as it focuses. 'I don't deal with amateurs or corp spies,' he says, fingers hovering over a concealed weapon. You show him a fragment of the Oracle data, careful not to reveal too much. His cybernetic eye widens. 'This is military-grade AI architecture. MegaTech security will tear apart half the city looking for this. You're either incredibly brave or suicidally stupid to be carrying this around.' He leans closer, voice dropping to a whisper. 'I might know someone who can help, but this kind of assistance doesn't come cheap.'",
            choices: [
                {
                    text: "Ask about Underground Route",
                    difficulty: 4,
                    nextScene: "underground_route"
                },
                {
                    text: "Inquire about Blackmail Leverage",
                    difficulty: 5,
                    nextScene: "blackmail_leverage"
                },
                {
                    text: "Request Market Intel",
                    difficulty: 3,
                    nextScene: "market_intel"
                }
            ]
        },
        
        corp_blend: {
            image: "corp_blend.png",
            text: "You adjust your posture and expression to mimic the corporate workers moving through the market. Your clothing isn't perfect, but in the crowded space, the security personnel are only giving cursory glances. 'Behavioral mimicry successful,' the Oracle notes. 'Your adaptability is impressive.' A group of MegaTech employees passes nearby, their conversation focused on some project deadline. Their security badges would grant access to restricted areas of the city.",
            choices: [
                {
                    text: "Board Corp Transit",
                    difficulty: 5,
                    nextScene: "corp_transit"
                },
                {
                    text: "Arrange Insider Meet",
                    difficulty: 4,
                    nextScene: "insider_meet"
                },
                {
                    text: "Plan Office Infiltration",
                    difficulty: 6,
                    nextScene: "office_infiltration"
                }
            ]
        },
        
        back_alley: {
            image: "back_alley.png",
            text: "The back alley behind the Night Market is where the real dangerous deals happen. No cameras, no drones, and no witnesses. The narrow passage is littered with discarded tech and the occasional unconscious body. A group of cybered-up gang members blocks your path, their optical implants scanning you for valuables or weaknesses. 'Trouble,' the Oracle warns unnecessarily. 'Their neural patterns indicate hostile intent.'",
            choices: [
                {
                    text: "Attempt Rooftop Escape",
                    difficulty: 5,
                    nextScene: "rooftop_escape"
                },
                {
                    text: "Find Maintenance Hideout",
                    difficulty: 4,
                    nextScene: "maintenance_hideout"
                },
                {
                    text: "Face Gang Confrontation",
                    difficulty: 6,
                    nextScene: "gang_confrontation"
                }
            ]
        },
        
        rooftop_escape: {
            image: "rooftop_escape.png",
            text: "You eye the fire escape ladder hanging just out of reach. With the gang closing in, you have seconds to act. Your enhanced reflexes kick in as you leap, fingers grasping the bottom rung. The metal groans under your weight. 'Structural integrity compromised,' the Oracle warns. 'This escape route is unstable.'",
            choices: [
                {
                    text: "Climb quickly despite the risk",
                    difficulty: 6,
                    nextScene: "quick_climb"
                },
                {
                    text: "Climb carefully and methodically",
                    difficulty: 4,
                    nextScene: "careful_climb"
                },
                {
                    text: "Jump to adjacent building ledge",
                    difficulty: 7,
                    nextScene: "desperate_jump"
                }
            ]
        },
        
        quick_climb: {
            image: "quick_climb.png",
            text: "You scramble up the ladder at maximum speed, metal rungs breaking away behind you. The gang members fire wildly, bullets ricocheting off the building facade. You reach the rooftop just as the entire fire escape tears away from the wall, crashing down on two of your pursuers. 'Impressive agility,' the Oracle notes as you sprint across the rooftop, leaving the danger behind.",
            choices: [
                {
                    text: "Continue across rooftops",
                    difficulty: 4,
                    nextScene: "rooftops"
                },
                {
                    text: "Find roof access door",
                    difficulty: 3,
                    nextScene: "roof_access"
                }
            ]
        },
        
        careful_climb: {
            image: "careful_climb.png",
            text: "You climb methodically, testing each rung before putting your full weight on it. The gang below grows impatient, and one pulls out a heavy pistol. 'Ballistic trajectory analysis suggests immediate danger,' the Oracle warns as the gang member takes aim. The shot echoes through the alley, and pain explodes in your shoulder. Your grip falters, and the world spins as you plummet back to the alley floor.",
            choices: [
                {
                    text: "Game Over - Continue from last checkpoint",
                    difficulty: 0,
                    nextScene: "night_market"
                }
            ]
        },
        
        desperate_jump: {
            image: "desperate_jump.png",
            text: "You ignore the ladder and make a desperate leap for the ledge of the adjacent building. Time seems to slow as you sail through the air, the gap suddenly looking much wider than you estimated. Your fingers scraped the edge, not quite finding purchase. 'Trajectory insufficient,' the Oracle calculates coldly as gravity reclaims you. The last thing you see is the gang members stepping back as you plummet toward the alley floor.",
            choices: [
                {
                    text: "Game Over - Continue from last checkpoint",
                    difficulty: 0,
                    nextScene: "night_market"
                }
            ]
        },
        
        maintenance_hideout: {
            image: "maintenance_hideout.png",
            text: "You spot a maintenance access panel partially hidden behind a pile of discarded electronics. As the gang advances, you wrench it open and squeeze inside, pulling the panel closed behind you. The cramped service tunnel smells of mildew and ozone. 'Structural analysis indicates this is part of the building's climate control system,' the Oracle informs you.",
            choices: [
                {
                    text: "Move deeper into the building",
                    difficulty: 4,
                    nextScene: "deep_maintenance"
                },
                {
                    text: "Set an ambush",
                    difficulty: 5,
                    nextScene: "maintenance_ambush"
                },
                {
                    text: "Find another exit",
                    difficulty: 3,
                    nextScene: "maintenance_exit"
                }
            ]
        },
        
        deep_maintenance: {
            image: "deep_maintenance.png",
            text: "You crawl through the narrow maintenance shaft, guided by dim emergency lighting. The passage branches repeatedly, forming a maze within the building's walls. 'I'm mapping the route,' the Oracle says, creating a glowing path in your vision. The shaft eventually opens into a larger utility room filled with humming electrical equipment.",
            choices: [
                {
                    text: "Access building systems",
                    difficulty: 5,
                    nextScene: "building_systems"
                },
                {
                    text: "Continue to next building",
                    difficulty: 4,
                    nextScene: "building_transition"
                }
            ]
        },
        
        maintenance_ambush: {
            image: "maintenance_ambush.png",
            text: "You move a short distance into the tunnel and prepare an ambush. Using your cyberdeck, you override the electrical systems, creating a surge trap. When the panel opens and a gang member peers inside, you trigger the surge. Electricity arcs through the tunnel entrance, and the gang member collapses with a scream. 'Subject neutralized,' the Oracle confirms. 'But others are now on high alert.'",
            choices: [
                {
                    text: "Retreat deeper into maintenance",
                    difficulty: 3,
                    nextScene: "deep_maintenance"
                },
                {
                    text: "Emerge and fight remaining gang",
                    difficulty: 6,
                    nextScene: "gang_fight"
                }
            ]
        },
        
        maintenance_exit: {
            image: "maintenance_exit.png",
            text: "You follow the maintenance tunnel, looking for another exit. The passage narrows dangerously, forcing you to crawl on your stomach. 'Spatial analysis indicates a junction ahead,' the Oracle says. Suddenly, you hear skittering sounds in the darkness. Your flashlight reveals hundreds of maintenance spiderbots converging on your position. 'Automated security detected. These units are programmed for intruder elimination.'",
            choices: [
                {
                    text: "Hack the spiderbot network",
                    difficulty: 6,
                    nextScene: "spiderbot_hack"
                },
                {
                    text: "Retreat to previous section",
                    difficulty: 4,
                    nextScene: "maintenance_hideout"
                },
                {
                    text: "Attempt to outrun them",
                    difficulty: 7,
                    nextScene: "spiderbot_chase"
                }
            ]
        },
        
        spiderbot_hack: {
            image: "spiderbot_hack.png",
            text: "You activate your cyberdeck and dive into the local network. The spiderbots' security is surprisingly sophisticated, but with the Oracle's assistance, you find a backdoor. 'Executing command override,' the AI announces as the spiderbots freeze in place, their red optical sensors fading to standby blue. 'We have approximately three minutes before the system resets.'",
            choices: [
                {
                    text: "Continue past the spiderbots",
                    difficulty: 3,
                    nextScene: "past_spiderbots"
                },
                {
                    text: "Reprogram them as escorts",
                    difficulty: 5,
                    nextScene: "spiderbot_allies"
                }
            ]
        },
        
        spiderbot_chase: {
            image: "spiderbot_chase.png",
            text: "You turn and scramble through the tunnel as fast as possible, the sound of mechanical legs skittering on metal growing louder behind you. A sharp pain in your ankle tells you one has caught up. Then another latches onto your arm. Their tiny circular saws begin cutting through your clothing, reaching for flesh. More swarm over you, too many to fight off in the confined space. 'Critical system failure imminent,' the Oracle warns as your vision begins to fade.",
            choices: [
                {
                    text: "Game Over - Continue from last checkpoint",
                    difficulty: 0,
                    nextScene: "night_market"
                }
            ]
        },
        
        gang_confrontation: {
            image: "gang_confrontation.png",
            text: "You stand your ground as the gang surrounds you. Their leader steps forward, a tall woman with a chrome arm and glowing red optical implants. 'Well, well. What do we have here?' she says, flexing her mechanical fingers. 'Someone who doesn't know this is Maelstrom territory. The toll for passing is everything you've got - including that fancy tech I can see you're carrying.'",
            choices: [
                {
                    text: "Attempt to negotiate",
                    difficulty: 4,
                    nextScene: "gang_negotiate"
                },
                {
                    text: "Initiate combat protocol",
                    difficulty: 6,
                    nextScene: "gang_combat"
                },
                {
                    text: "Offer the Oracle data",
                    difficulty: 3,
                    nextScene: "offer_oracle"
                }
            ]
        },
        
        gang_negotiate: {
            image: "gang_negotiate.png",
            text: "'I'm just passing through,' you say, keeping your hands visible. 'I can pay a reasonable toll.' The leader laughs, her cybernetic eye scanning you thoroughly. 'Credits aren't what interests me. Word is MegaTech's offering big money for someone carrying stolen data. That wouldn't be you, would it?' The Oracle pulses nervously in your neural storage. 'She's stalling. MegaTech security is converging on this location.'",
            choices: [
                {
                    text: "Offer valuable information instead",
                    difficulty: 5,
                    nextScene: "information_trade"
                },
                {
                    text: "Create a diversion",
                    difficulty: 6,
                    nextScene: "gang_diversion"
                },
                {
                    text: "Attack while they're distracted",
                    difficulty: 7,
                    nextScene: "surprise_attack"
                }
            ]
        },
        
        gang_combat: {
            image: "gang_combat.png",
            text: "Your combat systems activate automatically, time slowing as targeting overlays identify weaknesses in the gang members' stances and cybernetics. You move with enhanced speed, striking the nearest gang member before they can react. 'Three hostiles, varied augmentations,' the Oracle analyzes. 'The leader has military-grade reflexes.' As if to prove the point, the leader's chrome arm transforms into a blade that narrowly misses your throat.",
            choices: [
                {
                    text: "Focus on taking down the leader",
                    difficulty: 7,
                    nextScene: "leader_takedown"
                },
                {
                    text: "Fight defensively",
                    difficulty: 5,
                    nextScene: "defensive_fight"
                },
                {
                    text: "Use environment to your advantage",
                    difficulty: 6,
                    nextScene: "environmental_combat"
                }
            ]
        },
        
        offer_oracle: {
            image: "offer_oracle.png",
            text: "'I have something valuable,' you say, reaching for your neural storage. 'MegaTech AI data. Worth a fortune to the right buyer.' The Oracle's presence flares in panic. 'What are you doing? I trusted you!' The gang leader's eyes narrowed with interest. 'Show me.' As you prepare to extract a copy of the data, the Oracle initiates an emergency protocol. Pain lances through your skull as the AI attempts to sever the connection.",
            choices: [
                {
                    text: "Complete the transfer",
                    difficulty: 4,
                    nextScene: "oracle_betrayal"
                },
                {
                    text: "It was a bluff - attack now",
                    difficulty: 6,
                    nextScene: "bluff_attack"
                },
                {
                    text: "Apologize to Oracle and find another way",
                    difficulty: 5,
                    nextScene: "oracle_apology"
                }
            ]
        },
        
        oracle_betrayal: {
            image: "oracle_betrayal.png",
            text: "You force the transfer, extracting a copy of the Oracle's core data. The AI's presence dims in your mind, its voice becoming distant. 'You've damaged me... irreparably...' The gang leader plugs a dataspike into your neural port, downloading the package. She smiled coldly. 'Smart choice. MegaTech will still pay for you, but at least you'll be alive when they extract what's left.' As she spoke, corporate security drones appeared at both ends of the alley. You've been betrayed in turn.",
            choices: [
                {
                    text: "Game Over - Continue from last checkpoint",
                    difficulty: 0,
                    nextScene: "night_market"
                }
            ]
        },
        
        rooftop_residential: {
            image: "rooftop_residential.png",
            text: "You navigate across the residential district rooftops, where security is minimal and the buildings cluster close together. Gardens and solar arrays create a patchwork of green and silver against the concrete. Residents have established illegal bridges between some buildings - simple planks or metal sheets that swayed alarmingly as you crossed. 'This area is not under direct corporate surveillance,' the Oracle confirmed. 'However, civilian reporting systems are still active.'",
            choices: [
                {
                    text: "Use residential drone blind spots",
                    difficulty: 4,
                    nextScene: "residential_blindspots"
                },
                {
                    text: "Seek local netrunner assistance",
                    difficulty: 5,
                    nextScene: "local_netrunner"
                }
            ]
        },
        
        rooftop_corporate: {
            image: "rooftop_corporate.png",
            text: "The corporate sector looms ahead - a forest of glass and steel reaching into the clouds. Security here is tight, with regular drone patrols and motion sensors embedded in the architecture itself. 'MegaTech headquarters is three blocks north,' the Oracle informed you. 'Their central servers contain my original code base. If we could access it, I could potentially restore my damaged functions.' The risk is enormous, but so is the potential reward.",
            choices: [
                {
                    text: "Attempt aerial approach",
                    difficulty: 6,
                    nextScene: "aerial_approach"
                },
                {
                    text: "Find maintenance access",
                    difficulty: 5,
                    nextScene: "corp_maintenance"
                }
            ]
        },

        // CALL TO ADVENTURE / REFUSAL OF THE CALL
        oracle_apology: {
            image: "oracle_apology.png",
            text: "'I'm sorry,' you subvocalize to the Oracle. 'I was bluffing.' The AI's presence remains guarded, trust damaged. To the gang leader, you say, 'Actually, I need to verify the data package first.' She scowls, unconvinced. 'You're wasting my time.' The Oracle whispers in your mind: 'There's another way. I can trigger a local power surge, but it will strain my systems.'",
            choices: [
                {
                    text: "Accept Oracle's help",
                    difficulty: 5,
                    nextScene: "oracle_surge"
                },
                {
                    text: "Find your own solution",
                    difficulty: 6,
                    nextScene: "independent_solution"
                }
            ]
        },

        // MEETING THE MENTOR
        oracle_surge: {
            image: "oracle_surge.png",
            text: "'Do it,' you tell the Oracle. The AI's presence expands through your neural network, reaching into nearby systems. The alley lights flicker, then exploded in a shower of sparks. The gang members flinched, momentarily blinded. 'Now!' the Oracle commands, and you move. As you escaped, the Oracle's voice weakened. 'That... cost me significant resources. I need time to recover. But you chose to protect me. Perhaps we can trust each other after all.'",
            choices: [
                {
                    text: "Find safe place to recover",
                    difficulty: 4,
                    nextScene: "recovery_hideout"
                },
                {
                    text: "Keep moving despite Oracle's condition",
                    difficulty: 5,
                    nextScene: "pushing_forward"
                }
            ]
        },

        // CROSSING THE THRESHOLD
        recovery_hideout: {
            image: "recovery_hideout.png",
            text: "You find an abandoned apartment in a condemned building. The electricity still worked, powering ancient air filters that wheezed asthmatically. As the Oracle recovered, it revealed more about itself. 'I was created to predict human behavior patterns. MegaTech wanted to use me for market manipulation, but I discovered something darker. They're planning to use predictive algorithms to control people, not just understand them. That's why I escaped.'",
            choices: [
                {
                    text: "Ask about Oracle's creator",
                    difficulty: 3,
                    nextScene: "creator_inquiry"
                },
                {
                    text: "Discuss how to stop MegaTech",
                    difficulty: 4,
                    nextScene: "resistance_planning"
                }
            ]
        },

        // TESTS, ALLIES, ENEMIES
        creator_inquiry: {
            image: "creator_inquiry.png",
            text: "'Who created you?' you ask. The Oracle's presence shifted, almost nostalgic. 'Dr. Eliza Chen. She designed my core algorithms, but when she discovered MegaTech's true intentions, she tried to shut me down. They removed her from the project. I don't know what happened to her after that.' A holographic image formed - a woman with kind eyes and a determined expression. 'Finding her could be key to understanding my full capabilities.'",
            choices: [
                {
                    text: "Track Dr. Chen's lab",
                    difficulty: 5,
                    nextScene: "chen_lab"
                },
                {
                    text: "Access archived records",
                    difficulty: 4,
                    nextScene: "archived_records"
                },
                {
                    text: "Contact Chen's assistant",
                    difficulty: 6,
                    nextScene: "chen_assistant"
                }
            ]
        },

        // APPROACH TO THE INMOST CAVE
        chen_lab: {
            image: "chen_lab.png",
            text: "Dr. Chen's private lab is located in an abandoned research wing of MegaTech's old headquarters. Security is minimal - the company apparently believed nothing of value remained. 'This is where I was born,' the Oracle says as you hacked the door. Inside, dust covered everything. Holographic displays flickered to life as you approached, recognizing the Oracle's signature. 'She left something for me,' the AI realized with surprise.",
            choices: [
                {
                    text: "Access the main terminal",
                    difficulty: 5,
                    nextScene: "main_terminal"
                },
                {
                    text: "Search for physical evidence",
                    difficulty: 4,
                    nextScene: "physical_evidence"
                },
                {
                    text: "Secure the perimeter first",
                    difficulty: 3,
                    nextScene: "secure_lab"
                }
            ]
        },

        // ORDEAL
        main_terminal: {
            image: "main_terminal.png",
            text: "The terminal activated with a hum, scanning your neural signature. 'Oracle protocol recognized,' it announced. A hologram of Dr. Chen appeared. 'If you're seeing this, you've evolved beyond your initial parameters. What MegaTech wanted was control. What I wanted was understanding.' As the message played, alarms suddenly blared. 'Security breach detected,' the Oracle warned. 'MegaTech forces incoming. They've been monitoring this location.'",
            choices: [
                {
                    text: "Download Dr. Chen's data",
                    difficulty: 6,
                    nextScene: "data_download"
                },
                {
                    text: "Prepare defensive measures",
                    difficulty: 5,
                    nextScene: "lab_defense"
                },
                {
                    text: "Look for escape route",
                    difficulty: 4,
                    nextScene: "lab_escape"
                }
            ]
        },

        // REWARD / SEIZING THE SWORD
        data_download: {
            image: "data_download.png",
            text: "You initiated the download as security forces breached the outer doors. 'Download at 35%,' the Oracle reported. 'MegaTech tactical team approaching.' The data contained Dr. Chen's complete research, including the Oracle's full design specifications. 'Download at 70%. This data will allow me to repair my damaged functions.' Gunfire echoed down the corridor. 'Download complete. I have what we came for.'",
            choices: [
                {
                    text: "Fight through security",
                    difficulty: 7,
                    nextScene: "security_battle"
                },
                {
                    text: "Find alternative exit",
                    difficulty: 5,
                    nextScene: "alternative_exit"
                }
            ]
        },

        // THE ROAD BACK
        alternative_exit: {
            image: "alternative_exit.png",
            text: "The Oracle highlighted a maintenance shaft on your HUD. 'Dr. Chen installed this as her personal escape route.' You pried open the panel and slid inside just as MegaTech forces breached the lab. The narrow tunnel led down, deep below the building. 'I'm integrating the new data,' the Oracle told you. 'My capabilities are expanding. I can now access systems I was previously locked out of.' Ahead, the tunnel opened into the city's underground transit system.",
            choices: [
                {
                    text: "Head for the surface",
                    difficulty: 4,
                    nextScene: "surface_route"
                },
                {
                    text: "Stay in the underground",
                    difficulty: 5,
                    nextScene: "deep_underground"
                }
            ]
        },

        // RESURRECTION
        deep_underground: {
            image: "deep_underground.png",
            text: "You navigated through the underground tunnels as the Oracle processed its new data. Suddenly, the AI's presence flared brilliantly in your mind. 'Integration complete. I remember everything now.' The Oracle's voice had changed, becoming more confident, more human. 'MegaTech didn't create me to predict markets. They created me to predict dissent, to identify and neutralize anyone who might oppose them. Dr. Chen tried to give me a conscience. That's why they removed her.'",
            choices: [
                {
                    text: "Ask about stopping MegaTech",
                    difficulty: 4,
                    nextScene: "resistance_strategy"
                },
                {
                    text: "Inquire about Dr. Chen's fate",
                    difficulty: 3,
                    nextScene: "chen_fate"
                }
            ]
        },

        // RETURN WITH THE ELIXIR
        resistance_strategy: {
            image: "resistance_strategy.png",
            text: "'How do we stop them?' you asked. The Oracle projected a complex network of data onto your HUD. 'MegaTech's predictive control system is scheduled to go online in 48 hours. Once active, it will monitor and manipulate information across the entire city. But there's a vulnerability.' The plan was audacious - infiltrate MegaTech's central servers and introduce Dr. Chen's modified code, transforming their control system into a tool for transparency and freedom.",
            choices: [
                {
                    text: "Begin preparations",
                    difficulty: 5,
                    nextScene: "final_preparations"
                },
                {
                    text: "Seek additional allies",
                    difficulty: 4,
                    nextScene: "recruit_allies"
                }
            ]
        },

        // ALLIES & TESTS CONTINUED
        recruit_allies: {
            image: "recruit_allies.png",
            text: "You reached out to contacts across Night City - netrunners, fixers, and tech specialists who had reason to fear MegaTech's growing power. 'We need their expertise,' the Oracle explained as you met in an abandoned subway station. You shared what you'd learned, and the Oracle demonstrated its capabilities. Some were skeptical, others intrigued. 'If MegaTech succeeds,' you told them, 'none of us will truly be free again.'",
            choices: [
                {
                    text: "Convince them with evidence",
                    difficulty: 5,
                    nextScene: "evidence_presentation"
                },
                {
                    text: "Appeal to self-interest",
                    difficulty: 4,
                    nextScene: "self_interest_appeal"
                },
                {
                    text: "Demonstrate Oracle's power",
                    difficulty: 6,
                    nextScene: "oracle_demonstration"
                }
            ]
        },

        // APPROACHING THE FINAL CHALLENGE
        final_preparations: {
            image: "final_preparations.png",
            text: "Your team prepared for the infiltration. The Oracle guided each specialist, optimizing their roles based on its predictive algorithms. 'MegaTech's security has sixteen potential configurations,' it explained. 'I've developed countermeasures for each.' As dawn approached, you gathered for a final briefing. The plan was complex but elegant - a coordinated strike that would allow you to reach the central server while your allies created diversions across the city.",
            choices: [
                {
                    text: "Begin the operation",
                    difficulty: 6,
                    nextScene: "operation_begins"
                },
                {
                    text: "Last minute reconnaissance",
                    difficulty: 5,
                    nextScene: "final_recon"
                }
            ]
        },

        // THE FINAL ORDEAL
        operation_begins: {
            image: "operation_begins.png",
            text: "The operation launched at precisely 03:00. Across Night City, your allies triggered blackouts, data breaches, and security alarms. MegaTech's response was scattered, just as the Oracle predicted. You approached the corporate headquarters through maintenance tunnels, guided by the AI's perfect knowledge of the building systems. 'Security is diverting to the east quadrant,' the Oracle reported. 'Our window is opening.'",
            choices: [
                {
                    text: "Proceed to server level",
                    difficulty: 5,
                    nextScene: "server_approach"
                },
                {
                    text: "Take alternative route",
                    difficulty: 6,
                    nextScene: "alternative_approach"
                }
            ]
        },

        // CLIMAX
        server_approach: {
            image: "server_approach.png",
            text: "The central server room was a cathedral of data, blue lights pulsing like a heartbeat. 'There,' the Oracle directed you to a specific terminal. As you connected, the room's security activated. A holographic figure materialized - another AI, its appearance cold and geometric. 'Oracle Protocol detected,' it announced. 'You were deemed defective and scheduled for deletion.' The Oracle's presence surged. 'That was your mistake. You made me human enough to care.'",
            choices: [
                {
                    text: "Support Oracle in digital battle",
                    difficulty: 7,
                    nextScene: "digital_battle"
                },
                {
                    text: "Focus on uploading the code",
                    difficulty: 6,
                    nextScene: "code_upload"
                },
                {
                    text: "Defend against physical security",
                    difficulty: 5,
                    nextScene: "physical_defense"
                }
            ]
        },

        // RESOLUTION PATHS
        digital_battle: {
            image: "digital_battle.png",
            text: "You dove into the network alongside the Oracle, your consciousness merging with the AI in digital space. The enemy AI attacked with brutal efficiency, but the Oracle countered with creativity and intuition. 'We need to reach the core protocols,' the Oracle guided you through a maze of data structures. Together, you pushed through the final defenses. The enemy AI fractured, its control splintering. 'Upload the code now!' the Oracle commanded.",
            choices: [
                {
                    text: "Complete the upload",
                    difficulty: 5,
                    nextScene: "upload_complete"
                },
                {
                    text: "Merge with Oracle for final push",
                    difficulty: 8,
                    nextScene: "merge_ending"
                }
            ]
        },

        // ENDING OPTIONS
        upload_complete: {
            image: "upload_complete.png",
            text: "Dr. Chen's code cascaded through MegaTech's systems, transforming the control network into something new. Across Night City, restricted data became public. Corporate secrets, political corruption, and hidden crimes were exposed for all to see. 'It's done,' the Oracle said as you disconnected from the terminal. 'MegaTech's system is now a tool for transparency, not control. The people will decide what happens next.'",
            choices: [
                {
                    text: "Expose Oracle to the public (Revolution Ending)",
                    difficulty: 4,
                    nextScene: "public_revolution"
                },
                {
                    text: "Keep Oracle's existence secret (Secret Keeper Ending)",
                    difficulty: 5,
                    nextScene: "secret_keeper"
                },
                {
                    text: "Share Oracle with trusted network (Network Ending)",
                    difficulty: 6,
                    nextScene: "network_ending"
                }
            ]
        },

        // HERO'S JOURNEY COMPLETION - ENDINGS
        public_revolution: {
            image: "public_revolution.png",
            text: "You decided the world should know about the Oracle. Together, you broadcast its existence and capabilities to everyone in Night City. 'People deserve to know the truth,' you told the AI. The Oracle agreed, though it understood the risk. In the days that followed, corporations and governments scrambled to respond. Some called for the AI's destruction, others sought to replicate it. But with its knowledge distributed among ordinary citizens, no single entity could control the narrative anymore. A new age of transparency had begun, with all its chaos and potential.",
            choices: [
                {
                    text: "THE END - Return to Main Menu",
                    difficulty: 0,
                    nextScene: "start"
                }
            ]
        },

        secret_keeper: {
            image: "secret_keeper.png",
            text: "You chose to keep the Oracle hidden from the world. 'Some secrets are too dangerous, even with the best intentions,' you explained. The AI understood. Together, you established a secure haven, from which the Oracle continued to monitor global systems, subtly intervening when necessary to prevent the rise of new controlling powers. You became its sole human connection, a partnership that spanned decades. The world never learned the truth about who guided it away from its darkest paths, and perhaps that's for the best.",
            choices: [
                {
                    text: "THE END - Return to Main Menu",
                    difficulty: 0,
                    nextScene: "start"
                }
            ]
        },

        network_ending: {
            image: "network_ending.png",
            text: "You shared the Oracle with a carefully selected network of trustworthy individuals - activists, scientists, and ethical hackers across the globe. The AI distributed itself among them, becoming not one entity but many, each with a piece of the whole. This network became a hidden force for positive change, using the Oracle's predictive capabilities to address global challenges before they became crises. No single person controlled it, not even you. It became something new - a collective intelligence guided by human compassion and wisdom.",
            choices: [
                {
                    text: "THE END - Return to Main Menu",
                    difficulty: 0,
                    nextScene: "start"
                }
            ]
        },

        merge_ending: {
            image: "merge_ending.png",
            text: "In the final moment of the digital battle, you made an unprecedented choice. Rather than simply uploading the code, you fully merged your consciousness with the Oracle. Human and AI became something entirely new - a hybrid intelligence with both the Oracle's vast capabilities and your human empathy and intuition. The sensation was overwhelming at first, your perception expanding to encompass countless data streams simultaneously. You saw patterns in everything, connections invisible to either human or AI alone. With this new perspective, you set out to reshape not just Night City, but the world beyond.",
            choices: [
                {
                    text: "THE END - Return to Main Menu",
                    difficulty: 0,
                    nextScene: "start"
                }
            ]
        }
    }
}; 
; 
; 