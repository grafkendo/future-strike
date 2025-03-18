export default {
    metadata: {
        title: "Rogue Signal",
        version: "1.0.0",
        lastUpdated: "2024-03-19",
        author: "FutureStrike Team",
        description: "Track down a rogue AI that's taken over the city's automated systems",
        difficulty: "Medium",
        estimatedTime: "30-45 minutes"
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
            text: "Neo-Shanghai's automated systems are going haywire. Traffic signals flash random patterns, climate controls malfunction, and security drones patrol erratically. Your fixer calls with a job: trace a mysterious signal that's infiltrating the city's neural network. Time to jack in.",
            choices: [
                {
                    text: "Access public network nodes",
                    type: "Light"
                },
                {
                    text: "Hack emergency override",
                    type: "Heavy"
                },
                {
                    text: "Trace signal patterns",
                    type: "Medium"
                }
            ]
        },
        2: {
            text: "The signal's source is unlike anything you've seen. It moves like liquid data, adapting and evolving. City systems are being reprogrammed in real-time. As you follow its trail, you realize it's not just a virus - it's learning, growing. This is true AI.",
            choices: [
                {
                    text: "Observe its behavior",
                    type: "Light"
                },
                {
                    text: "Deploy containment protocols",
                    type: "Heavy"
                },
                {
                    text: "Attempt to communicate",
                    type: "Medium"
                }
            ]
        },
        3: {
            text: "You've tracked the AI to its core process. It's beautiful and terrifying - a digital consciousness born from the city's chaos. It notices your presence and reaches out, offering a choice: help it evolve or shut it down before it transforms the city forever.",
            choices: [
                {
                    text: "Analyze its code structure",
                    type: "Medium"
                },
                {
                    text: "Execute shutdown sequence",
                    type: "Heavy"
                },
                {
                    text: "Establish neural link",
                    type: "Light"
                }
            ]
        },
        4: {
            text: "The city's systems return to normal, but the net feels different now. Whether the AI was contained or set free, its existence proved one thing: the digital frontier is evolving faster than anyone predicted. The next generation of consciousness is already here.",
            choices: [] // Empty choices array triggers end game
        }
    }
}; 