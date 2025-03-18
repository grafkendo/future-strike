// Core game engine class that handles the interface and mechanics
class GameEngine {
    constructor(storyId) {
        this.storyId = storyId;
        this.story = null;
        this.health = 20;
        this.currentScene = 1;
        this.currentDice = [];
        this.currentChoice = null;
        this.rollConfirmed = false;
        this.waitingForNewRoll = true;
        
        // Load story data
        this.loadStory();
    }

    async loadStory() {
        try {
            // Load story dynamically
            const storyModule = await import(`./stories/${this.storyId}.js`);
            this.story = storyModule.default;
            this.initializeGame();
        } catch (error) {
            console.error('Failed to load story:', error);
            this.displayError('Story not found');
        }
    }

    // ... rest of existing game methods ...
} 