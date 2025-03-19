// Main entry point for the game
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('story') || 'last_backup';
    
    const game = new GameEngine(storyId);
}); 