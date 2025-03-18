// Dynamic story loader
class StoryRegistry {
    constructor() {
        this.stories = new Map();
    }

    async initialize() {
        try {
            // List of story modules to load
            const storyModules = [
                { id: 'last_backup', path: './stories/last_backup.js' },
                { id: 'neural_heist', path: './stories/neural_heist.js' },
                { id: 'rogue_signal', path: './stories/rogue_signal.js' },
                { id: 'debug_story', path: './stories/debug_story.js' }
            ];

            for (const module of storyModules) {
                const story = await import(module.path);
                this.stories.set(module.id, {
                    id: module.id,
                    metadata: story.default.metadata
                });
            }

            console.log('Story registry initialized:', this.stories);
            return true;
        } catch (error) {
            console.error('Failed to initialize story registry:', error);
            return false;
        }
    }

    async loadStory(storyId) {
        try {
            const story = await import(`./stories/${storyId}.js`);
            console.log(`Loading story: ${storyId} (v${story.default.metadata.version})`);
            return story.default;
        } catch (error) {
            console.error(`Failed to load story: ${storyId}`, error);
            return null;
        }
    }

    getAvailableStories() {
        return Array.from(this.stories.values());
    }
}

// Create and export the registry instance
const registry = new StoryRegistry();

// Export functions that ensure registry is initialized
export async function getAvailableStories() {
    await registry.initialize();
    return registry.getAvailableStories();
}

export async function loadStory(storyId) {
    await registry.initialize();
    return registry.loadStory(storyId);
} 