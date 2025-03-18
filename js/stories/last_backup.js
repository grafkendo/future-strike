export default {
    metadata: {
        title: "The Last Backup",
        author: "FutureStrike Team",
        description: "A cyberpunk thriller in Neo-Shanghai",
        difficulty: "Medium",
        estimatedTime: "30-45 minutes"
    },
    gameConfig: {
        startingHealth: 20,
        maxHealth: 20,
        difficultyModifiers: {
            "Light": -1,
            "Medium": 0,
            "Heavy": 1
        }
    },
    scenes: {
        1: {
            text: "You're a low-level data courier in Neo-Shanghai...",
            choices: [
                {
                    text: "Take the crowded street level",
                    difficulty: 2,
                    type: "Light"
                },
                // ... other choices
            ]
        },
        // ... other scenes
    }
}; 