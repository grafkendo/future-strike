const STORIES = {
    "last_backup": {
        title: "The Last Backup",
        author: "FutureStrike Team",
        scenes: {
            1: {
                text: "You're a low-level data courier in Neo-Shanghai. Your neural implants ping with an encrypted message from your old mentor, Zhang. He needs a meet - urgent. Something about a 'last backup.'",
                choices: [
                    {
                        text: "Take the crowded street level",
                        difficulty: 4,
                        type: "Light"
                    },
                    {
                        text: "Navigate maintenance tunnels",
                        difficulty: 3,
                        type: "Medium"
                    },
                    {
                        text: "Ride the elevated mag-train",
                        difficulty: 3,
                        type: "Light"
                    }
                ]
            },
            2: {
                text: "The streets are packed with corporate wage slaves and street vendors. Your neural implants highlight multiple surveillance zones ahead.",
                choices: [
                    {
                        text: "Blend with the crowd",
                        difficulty: 3,
                        type: "Light"
                    },
                    {
                        text: "Use back alleys",
                        difficulty: 4,
                        type: "Medium"
                    },
                    {
                        text: "Create a distraction",
                        difficulty: 3,
                        type: "Light"
                    }
                ]
            },
            3: {
                text: "You spot Zhang's meeting spot - an old noodle stand. But something feels off...",
                choices: [
                    {
                        text: "Approach directly",
                        difficulty: 3,
                        type: "Light"
                    },
                    {
                        text: "Scan for threats",
                        difficulty: 3,
                        type: "Medium"
                    },
                    {
                        text: "Contact Zhang",
                        difficulty: 4,
                        type: "Heavy"
                    }
                ]
            }
        }
    }
    // Add more stories here
}; 