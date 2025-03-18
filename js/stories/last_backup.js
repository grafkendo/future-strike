export default {
    metadata: {
        title: "The Last Backup",
        version: "1.3.0",
        lastUpdated: "2024-03-19",
        author: "FutureStrike Team",
        description: "A cyberpunk thriller in Neo-Shanghai",
        difficulty: "Medium",
        estimatedTime: "30-45 minutes"
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
            text: "You're a low-level data courier in Neo-Shanghai. Your neural implants ping with an encrypted message from your old mentor, Zhang. He needs a meet - urgent. Something about a 'last backup.'",
            choices: [
                {
                    text: "Take the crowded street level",
                    type: "Light",
                    difficulty: 3
                },
                {
                    text: "Navigate maintenance tunnels",
                    type: "Heavy",
                    difficulty: 5
                },
                {
                    text: "Ride the elevated mag-train",
                    type: "Medium",
                    difficulty: 4
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
        }
    }
}; 