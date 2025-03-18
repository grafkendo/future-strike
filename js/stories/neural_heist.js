export default {
    metadata: {
        title: "Neural Heist",
        version: "1.0.0",
        lastUpdated: "2024-03-19",
        author: "FutureStrike Team",
        description: "Break into a corporate vault - inside someone's mind",
        difficulty: "Hard",
        estimatedTime: "45-60 minutes"
    },
    gameConfig: {
        startingHealth: 20,
        maxHealth: 20,
        difficultyModifiers: {
            "Light": 3,
            "Medium": 4,
            "Heavy": 5
        }
    },
    scenes: {
        1: {
            text: "The target: a high-level Arasaka exec with classified data locked in a neural vault. Your team needs you to make the connection while they run interference. The building's security is top-notch, but you've got an edge - they don't know you're coming.",
            choices: [
                {
                    text: "Use standard neural link protocol",
                    type: "Light"
                },
                {
                    text: "Force aggressive connection",
                    type: "Heavy"
                },
                {
                    text: "Spoof security credentials",
                    type: "Medium"
                }
            ]
        },
        2: {
            text: "You're in their neural space. Crystalline data structures tower around you like neon skyscrapers. Security ICE patrols the digital pathways, their code signatures pulsing with deadly intent. You need to reach the central data core without triggering the black ICE.",
            choices: [
                {
                    text: "Move slowly, avoid detection",
                    type: "Light"
                },
                {
                    text: "Deploy counter-ICE program",
                    type: "Heavy"
                },
                {
                    text: "Create false data trail",
                    type: "Medium"
                }
            ]
        },
        3: {
            text: "The vault's right there, but something's wrong. The security patterns are... organic. This isn't standard ICE. The patterns shift and swirl like living thoughts. Someone's consciousness is actively defending the data - and they know you're here.",
            choices: [
                {
                    text: "Analyze the patterns",
                    type: "Medium"
                },
                {
                    text: "Brute force approach",
                    type: "Heavy"
                },
                {
                    text: "Try to communicate",
                    type: "Light"
                }
            ]
        },
        4: {
            text: "Mission complete. The neural connection terminates, leaving you with encrypted data and more questions than answers. Your team's waiting, but you can't shake the feeling that what you saw in there wasn't just security software. Someone's consciousness was watching...",
            choices: [] // Empty choices array triggers end game
        }
    }
}; 