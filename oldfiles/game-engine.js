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
        
        this.loadStory();
    }

    async loadStory() {
        const { loadStory } = await import('../js/story-loader.js');
        this.story = await loadStory(this.storyId);
        
        if (this.story) {
            this.health = this.story.gameConfig.startingHealth;
            this.initializeGame();
        } else {
            console.error('Failed to load story');
        }
    }


    // ... rest of existing game methods ...

    displayScene(scene) {
        const storyText = document.querySelector('.story-text');
        const choices = document.querySelector('.choices');
        
        if (!storyText || !choices) {
            console.error('Required DOM elements not found');
            return;
        }

        storyText.innerHTML = scene.text;
        choices.innerHTML = scene.choices.map((choice, index) => `
            <button class="choice-button" data-index="${index}">
                <div class="choice-header">
                    [${choice.type}]
                </div>
                ${choice.text}
            </button>
        `).join('');

        // Add choice listeners
        document.querySelectorAll('.choice-button').forEach(button => {
            button.addEventListener('click', () => this.selectChoice(button));
        });
    }

    calculateOutcome(dieValue, difficulty) {
        const success = dieValue >= difficulty;
        let outcome;
        let healthCost;

        if (dieValue === 6) {
            outcome = "CRITICAL SUCCESS";
            healthCost = 0;
        } else if (success && (dieValue - difficulty) >= 2) {
            outcome = "CLEAN SUCCESS";
            healthCost = 1;
        } else if (success) {
            outcome = "NARROW SUCCESS";
            healthCost = 2;
        } else if (dieValue === 1) {
            outcome = "CRITICAL FAILURE";
            healthCost = 4;
        } else {
            outcome = "FAILURE";
            healthCost = 3;
        }

        this.updateHealth(healthCost);
        this.displayOutcome(outcome, healthCost);
    }

    loadScene(sceneNumber) {
        const scene = this.story.scenes[sceneNumber];
        if (!scene) {
            this.displayEndGame();
            return;
        }
        this.displayScene(scene);
    }

    displayEndGame() {
        const storyText = document.querySelector('.story-text');
        const choices = document.querySelector('.choices');
        const dicePanel = document.querySelector('.dice-panel');
        const outcomeText = document.querySelector('.outcome-text');
        
        if (storyText) {
            storyText.innerHTML = `
                <h2>MISSION COMPLETE</h2>
                <p>Final Health: ${this.health}/${this.story.gameConfig.maxHealth}</p>
            `;
        }
        
        if (choices) {
            choices.innerHTML = `
                <button class="choice-button available" onclick="window.location.href='index.html'">
                    <div class="choice-header">[SYSTEM]</div>
                    RETURN_TO_MAIN_MENU.exe
                </button>
            `;
        }
        
        // Hide dice panel and outcome text at the end
        if (dicePanel) {
            dicePanel.style.display = 'none';
        }
        if (outcomeText) {
            outcomeText.style.display = 'none';
        }
    }
} 