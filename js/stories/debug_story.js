export default {
    metadata: {
        title: "Debug Story",
        version: "1.3.0",
        lastUpdated: "2024-03-19",
        author: "Debug Team",
        description: "Testing dice and action mechanics",
        difficulty: "Medium",
        estimatedTime: "5-10 minutes"
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
            text: "DEBUG SCENE 1: Roll dice first, then try each action using different dice.",
            choices: [
                {
                    text: "First Action - Should work with any unused die",
                    type: "Light",
                    difficulty: 3
                },
                {
                    text: "Second Action - Should only work with unused dice",
                    type: "Medium",
                    difficulty: 4
                },
                {
                    text: "Third Action - Should only work with remaining dice",
                    type: "Heavy",
                    difficulty: 5
                }
            ]
        },
        2: {
            text: "DEBUG SCENE 2: New turn, new dice roll needed.",
            choices: [
                {
                    text: "New Turn First Action",
                    type: "Light",
                    difficulty: 3
                },
                {
                    text: "New Turn Second Action",
                    type: "Medium",
                    difficulty: 4
                },
                {
                    text: "New Turn Third Action",
                    type: "Heavy",
                    difficulty: 5
                }
            ]
        }
    }
}; 