class Game {
    constructor(storyId) {
        this.storyId = storyId;
        this.story = STORIES[storyId];
        this.health = 20;
        this.currentScene = 1;
        this.currentDice = [];
        this.currentChoice = null;
        this.rollConfirmed = false;
        this.waitingForNewRoll = true;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeGame());
        } else {
            this.initializeGame();
        }
    }

    initializeGame() {
        this.setupEventListeners();
        this.loadScene(1);
        this.updateGameState();
    }

    setupEventListeners() {
        const rollSubmitButton = document.getElementById('roll-submit');
        if (rollSubmitButton) {
            rollSubmitButton.addEventListener('click', () => {
                this.submitDiceRoll();
            });
        }

        const diceBoxes = document.querySelectorAll('.dice-box');
        diceBoxes.forEach((box, index) => {
            // Prevent invalid input
            box.addEventListener('keypress', (e) => {
                const char = String.fromCharCode(e.which);
                if (!'123456'.includes(char)) {
                    e.preventDefault();
                }
            });

            // Handle paste events
            box.addEventListener('paste', (e) => {
                e.preventDefault();
            });

            // Clean invalid values and auto-advance
            box.addEventListener('input', (e) => {
                let value = e.target.value;
                value = value.slice(0, 1);
                value = Math.min(Math.max(parseInt(value) || 1, 1), 6);
                e.target.value = value;

                if (value && index < diceBoxes.length - 1) {
                    diceBoxes[index + 1].focus();
                }
            });

            // Handle backspace
            box.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    diceBoxes[index - 1].focus();
                }
            });
        });
    }

    updateGameState() {
        const choices = document.querySelectorAll('.choice-button');
        const dice = document.querySelectorAll('.die');
        const rollPrompt = document.querySelector('.roll-prompt');
        const dicePanel = document.querySelector('.dice-panel');
        
        if (this.waitingForNewRoll) {
            // Need new dice roll
            dicePanel.style.display = 'block';
            rollPrompt.style.display = 'block';
            choices.forEach(choice => choice.classList.remove('available'));
            dice.forEach(die => die.classList.remove('available'));
        } else if (this.rollConfirmed && !this.currentChoice) {
            // Have dice, waiting for action selection
            rollPrompt.style.display = 'none';
            choices.forEach(choice => choice.classList.add('available'));
            dice.forEach(die => die.classList.add('available'));
        }
    }

    loadScene(sceneNumber) {
        const scene = this.story.scenes[sceneNumber];
        if (!scene) {
            console.log("Story complete!");
            this.displayEndGame();
            return;
        }
        this.displayScene(scene);
    }

    displayScene(scene) {
        const storyText = document.querySelector('.story-text');
        const choices = document.querySelector('.choices');
        
        if (!storyText || !choices) {
            console.error('Required DOM elements not found');
            return;
        }

        storyText.innerHTML = scene.text;
        
        if (scene.choices && scene.choices.length > 0) {
            choices.innerHTML = scene.choices.map((choice, index) => `
                <button class="choice-button" data-index="${index}">
                    <div class="choice-header">
                        [Difficulty: ${choice.difficulty}] [${choice.type}]
                    </div>
                    ${choice.text}
                </button>
            `).join('');

            // Add choice listeners
            document.querySelectorAll('.choice-button').forEach(button => {
                button.addEventListener('click', () => this.selectChoice(button));
            });
        } else {
            choices.innerHTML = '<p>End of story reached.</p>';
        }
    }

    submitDiceRoll() {
        const diceValues = Array.from(document.querySelectorAll('.dice-box'))
            .map(box => parseInt(box.value))
            .filter(val => !isNaN(val) && val >= 1 && val <= 6);

        if (diceValues.length === 5) {
            this.currentDice = diceValues;
            this.rollConfirmed = true;
            this.waitingForNewRoll = false;
            this.displayDice();
            this.clearDiceInput();
            this.updateGameState();
        } else {
            // Visual feedback for invalid input
            document.querySelectorAll('.dice-box').forEach(box => {
                if (!box.value || parseInt(box.value) < 1 || parseInt(box.value) > 6) {
                    box.style.borderColor = '#ff0000';
                    setTimeout(() => {
                        box.style.borderColor = '#ff69b4';
                    }, 1000);
                }
            });
        }
    }

    displayDice() {
        const diceContainer = document.querySelector('.current-dice');
        diceContainer.innerHTML = '';
        
        this.currentDice.forEach((value, index) => {
            const die = document.createElement('div');
            die.className = 'die';
            die.textContent = value;
            die.addEventListener('click', () => this.selectDie(index));
            diceContainer.appendChild(die);
        });
    }

    selectChoice(buttonElement) {
        if (!this.rollConfirmed) return;
        
        document.querySelectorAll('.choice-button').forEach(btn => 
            btn.classList.remove('selected'));
        
        buttonElement.classList.add('selected');
        this.currentChoice = parseInt(buttonElement.dataset.index);
    }

    selectDie(index) {
        if (!this.currentChoice) return;
        
        const value = this.currentDice[index];
        const difficulty = this.getCurrentDifficulty();
        this.calculateOutcome(value, difficulty);
        
        // Progress to next scene after outcome
        setTimeout(() => {
            this.advanceStory();
        }, 2000);
    }

    getCurrentDifficulty() {
        const scene = this.story.scenes[this.currentScene];
        if (!scene || !scene.choices || !scene.choices[this.currentChoice]) {
            console.error('Invalid scene or choice');
            return 3; // Default difficulty if something goes wrong
        }
        return scene.choices[this.currentChoice].difficulty;
    }

    calculateOutcome(dieValue, difficulty) {
        const diff = dieValue - difficulty;
        let outcome;
        let healthCost;

        if (dieValue === 6) {
            outcome = "Perfect Success!";
            healthCost = 0;
        } else if (diff > 1) {
            outcome = "Clean Success";
            healthCost = 1;
        } else if (diff === 0) {
            outcome = "Narrow Success";
            healthCost = 2;
        } else if (diff === -1) {
            outcome = "Messy Success";
            healthCost = 3;
        } else {
            outcome = "Failure";
            healthCost = 4;
        }

        this.updateHealth(healthCost);
        this.displayOutcome(outcome, healthCost);
    }

    updateHealth(cost) {
        this.health = Math.max(0, this.health - cost);
        document.querySelector('.health-value').textContent = `${this.health}/20`;
    }

    displayOutcome(outcome, healthCost) {
        const outcomePanel = document.querySelector('.outcome-text');
        outcomePanel.innerHTML = `
            <h3>${outcome}</h3>
            <p>Health cost: ${healthCost}</p>
            <p class="continue-prompt">Continuing in 2 seconds...</p>
        `;
        outcomePanel.style.display = 'block';
    }

    clearDiceInput() {
        document.querySelectorAll('.dice-box').forEach(box => {
            box.value = '';
            box.style.borderColor = '#ff69b4';
        });
        document.querySelectorAll('.dice-box')[0].focus();
    }

    displayEndGame() {
        const storyText = document.querySelector('.story-text');
        const choices = document.querySelector('.choices');
        const dicePanel = document.querySelector('.dice-panel');
        
        if (storyText) {
            storyText.innerHTML = "Mission Complete. Final Health: " + this.health + "/20";
        }
        if (choices) {
            choices.innerHTML = '<a href="index.html" class="choice-button">Return to Main Menu</a>';
        }
        if (dicePanel) {
            dicePanel.style.display = 'none';
        }
    }

    advanceStory() {
        // Reset game state
        this.rollConfirmed = false;
        this.currentChoice = null;
        this.currentDice = [];
        this.waitingForNewRoll = true;
        
        // Clear previous state
        this.clearDiceInput();
        document.querySelector('.current-dice').innerHTML = '';
        document.querySelector('.outcome-text').style.display = 'none';
        
        // Load next scene
        this.currentScene++;
        this.loadScene(this.currentScene);
        
        // Update game state for new roll
        this.updateGameState();
    }
}

// Get story ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const storyId = urlParams.get('story') || 'last_backup';

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(storyId);
}); 