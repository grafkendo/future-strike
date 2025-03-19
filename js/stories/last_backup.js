export default {
    metadata: {
        title: "The Last Backup",
        version: "1.3.0",
        lastUpdated: "2024-03-19",
        author: "FutureStrike Team",
        description: "A cyberpunk thriller in Neo-Shanghai",
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
        1: {
            image: "apartment.png",
            text: "You're a low-level data courier in Neo-Shanghai, tasked with delivering a mysterious neural backup. The neon-lit streets below your apartment pulse with danger. Your client was clear: this data is hot, and corps want it. You need to make your way to the delivery point, but how?",
            turnText: "Choose your initial approach. Once you commit to a path, you'll need to re-assess the situation.",
            choices: [
                {
                    text: "Take to the streets - stick to the crowds",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "street_level",
                    endsTurn: true
                },
                {
                    text: "Use the maintenance tunnels",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "tunnels",
                    endsTurn: true
                },
                {
                    text: "Go high - use the rooftops",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "rooftops",
                    endsTurn: true
                }
            ]
        },
        street_level: {
            image: "street.png",
            text: "The streets of Neo-Shanghai engulf you in a sea of bodies and neon. Street vendors hawk black market tech while corp security drones buzz overhead. Through the crowd, you spot two potential paths: a busy night market that could provide cover, or a quieter side street where your contact left a vehicle.",
            turnText: "You can attempt multiple actions here before committing to your next major move.",
            choices: [
                {
                    text: "Scan the crowd for threats",
                    type: "Light",
                    difficulty: 3,
                    outcome: "You spot potential corp agents in the crowd.",
                    endsTurn: false
                },
                {
                    text: "Check your encrypted messages",
                    type: "Medium",
                    difficulty: 4,
                    outcome: "Your contact confirms the vehicle is still waiting.",
                    endsTurn: false
                },
                {
                    text: "Push through to the night market",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "night_market",
                    endsTurn: true
                },
                {
                    text: "Head for the side street vehicle",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "side_street",
                    endsTurn: true
                }
            ]
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
        night_market: {
            image: "market.png",
            text: "The night market is a sensory overload of illegal tech and synthetic food aromas. Holographic advertisements float between makeshift stalls, while black market vendors hawk their wares.",
            turnText: "The market offers multiple opportunities. You can gather intel before making your next major move.",
            choices: [
                {
                    text: "Monitor market security feeds",
                    type: "Light",
                    difficulty: 3,
                    outcome: "You identify the patrol patterns of market security.",
                    endsTurn: false
                },
                {
                    text: "Purchase counterfeit credentials",
                    type: "Medium",
                    difficulty: 4,
                    outcome: "You acquire a fake corp worker ID.",
                    endsTurn: false
                },
                {
                    text: "Blend in with corp workers",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "corp_crowd",
                    endsTurn: true
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
        hidden_net: {
            image: "network.png",
            text: "The noodle shop's hidden network is a goldmine of underground data. As you connect, you discover it's part of the legendary 'Ramen Net' - a secret network used by fixers and runners. Multiple data streams are available, each offering different advantages for your mission.",
            turnText: "Navigate the digital landscape carefully.",
            choices: [
                {
                    text: "Download corp patrol routes",
                    type: "Light",
                    difficulty: 3,
                    nextScene: "patrol_data"
                },
                {
                    text: "Contact underground allies",
                    type: "Medium",
                    difficulty: 4,
                    nextScene: "underground_help"
                },
                {
                    text: "Hack traffic control systems",
                    type: "Heavy",
                    difficulty: 5,
                    nextScene: "traffic_chaos"
                }
            ]
        }
    }
}; 
; 