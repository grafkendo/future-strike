export default {
    metadata: {
        title: "The Last Backup",
        version: "1.6.0",
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
                    text: "Negotiate with data fence",
                    difficulty: 4,
                    nextScene: "data_fence"
                },
                {
                    text: "Look for underground contact",
                    difficulty: 5,
                    nextScene: "start"
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
            text: "The maintenance tunnels are a maze of pipes and forgotten tech. The air is thick with steam and the buzz of ancient machinery. You've avoided the crowds, but you're not alone down here. The echoes of footsteps suggest others use these passages too.",
            turnText: "The tunnels offer multiple paths forward.",
            choices: [
                {
                    text: "Follow the maintenance workers",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "worker_route"
                },
                {
                    text: "Take the abandoned service line",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "service_line"
                },
                {
                    text: "Try to hack a security gate",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "security_gate"
                }
            ]
        },
        rooftops: {
            image: "rooftop.png",
            text: "The vertigo-inducing height of Neo-Shanghai's skyline stretches before you. Corporate spires pierce the smog-filled sky, their surfaces slick with the constant acid rain. Your augmented vision highlights possible routes, but each comes with its own risks.",
            turnText: "The high route is dangerous but offers clear options.",
            choices: [
                {
                    text: "Use maintenance drones for cover",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "drone_cover"
                },
                {
                    text: "Parkour across billboard platforms",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "billboard_run"
                },
                {
                    text: "Find a sky bridge crossing",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "sky_bridge"
                }
            ]
        },
        side_street: {
            image: "alley.png",
            text: "The side street is eerily quiet compared to the main thoroughfare. Your contact's vehicle, a beaten-up delivery drone, hovers near a defunct charging station. But something feels off. You spot unusual network traffic in your HUD, camera drones above, and the distant rumble of approaching vehicles.",
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
                    text: "Accept the connection",
                    difficulty: 3,
                    nextScene: "night_market"
                },
                {
                    text: "Analyze connection first",
                    difficulty: 4,
                    nextScene: "analyze_data"
                }
            ]
        },
        
        analyze_data: {
            image: "analyze.png",
            text: "Your security protocols scan the data package, peeling back layers of encryption and defensive code. The results confirm it's genuine - a fragmented AI consciousness from MegaTech's classified research division. Project Oracle appears to be an advanced predictive algorithm with self-awareness capabilities far beyond current public technology. The timestamps indicate it was created three years ago and has been in hiding since a security breach at MegaTech's central labs. Someone with significant resources wants this AI erased permanently from existence.",
            choices: [
                {
                    text: "Head to Night Market",
                    difficulty: 3,
                    nextScene: "night_market"
                }
            ]
        },
        
        data_fence: {
            image: "fence.png",
            text: "You find Zhi-Ren's booth hidden behind a cascade of glitching holographic advertisements for prohibited tech. The data fence is a wiry man with extensive facial cybernetics that pulse with blue light as he scans you. His right eye is a custom optical implant that whirs softly as it focuses. 'I don't deal with amateurs or corp spies,' he says, fingers hovering over a concealed weapon. You show him a fragment of the Oracle data, careful not to reveal too much. His cybernetic eye widens. 'This is military-grade AI architecture. MegaTech security will tear apart half the city looking for this. You're either incredibly brave or suicidally stupid to be carrying this around.' He leans closer, voice dropping to a whisper. 'I might know someone who can help, but this kind of assistance doesn't come cheap.'",
            choices: [
                {
                    text: "Ask who they recommend",
                    difficulty: 3,
                    nextScene: "night_market"
                },
                {
                    text: "Pay for secure storage",
                    difficulty: 4,
                    nextScene: "start"
                }
            ]
        }
    }
}; 
; 