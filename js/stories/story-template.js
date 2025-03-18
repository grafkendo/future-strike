export default {
    metadata: {
        title: "Story Title",
        author: "Author Name",
        description: "Brief description",
        difficulty: "Easy|Medium|Hard",
        estimatedTime: "Estimated playtime"
    },
    gameConfig: {
        startingHealth: 20,
        maxHealth: 20,
        difficultyModifiers: {
            // Custom difficulty settings
        }
    },
    scenes: {
        1: {
            text: "Scene description",
            choices: [
                {
                    text: "Choice text",
                    difficulty: 2,
                    type: "Light|Medium|Heavy"
                }
            ]
        }
    }
}; 