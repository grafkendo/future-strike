class Game {
    constructor(storyId) {
        this.storyId = storyId;
        this.story = null;
        this.health = 20;
        this.currentScene = 1;
        this.currentDice = [];
        this.currentChoice = null;
        this.rollConfirmed = false;
        this.waitingForNewRoll = true;
        
        // Initialize game asynchronously
        this.init();
    }

    async init() {
        try {
            // Import story loader
            const { loadStory } = await import('./story-loader.js');
            
            // Load the story
            this.story = await loadStory(this.storyId);
            
            if (!this.story) {
                throw new Error('Failed to load story');
            }

            // Set initial health from story config
            this.health = this.story.gameConfig.startingHealth;
            
            // Initialize game state
            this.initializeGame();
            
        } catch (error) {
            console.error('Game initialization failed:', error);
            this.displayError('Failed to load story. Please try again.');
        }
    }

    initializeGame() {
        if (!this.story) {
            console.error('Story not loaded');
            return;
        }
        
        this.loadScene(this.currentScene);
        this.setupEventListeners();
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

        // Add random roll button listener
        const randomRollButton = document.getElementById('random-roll');
        if (randomRollButton) {
            randomRollButton.addEventListener('click', () => {
                this.generateRandomRoll();
            });
        }
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
        if (!this.story || !this.story.scenes) {
            console.error('Story or scenes not loaded');
            return;
        }

        const scene = this.story.scenes[sceneNumber];
        if (!scene) {
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
        
        // Clear existing choices
        choices.innerHTML = '';
        
        // Create and append each choice button
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.dataset.index = index;
            button.innerHTML = `
                <div class="choice-header">
                    [${choice.type}]
                </div>
                ${choice.text}
            `;
            
            // Add click listener directly to new button
            button.addEventListener('click', () => {
                if (this.rollConfirmed) {
                    this.selectChoice(button);
                }
            });
            
            choices.appendChild(button);
        });
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
        // Clear any previous selections
        document.querySelectorAll('.choice-button').forEach(btn => 
            btn.classList.remove('selected'));
        
        // Get and validate the choice index
        const index = parseInt(buttonElement.dataset.index);
        if (isNaN(index)) {
            console.error('Invalid choice index');
            return;
        }
        
        // Update selection
        buttonElement.classList.add('selected');
        this.currentChoice = index;
        
        // Enable dice for selection
        document.querySelectorAll('.die').forEach(die => 
            die.classList.add('available'));
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

    generateRandomRoll() {
        const diceBoxes = document.querySelectorAll('.dice-box');
        diceBoxes.forEach(box => {
            const randomValue = Math.floor(Math.random() * 6) + 1;
            box.value = randomValue;
        });
    }

    displayError(message) {
        const errorPanel = document.querySelector('.error-text');
        errorPanel.textContent = message;
        errorPanel.style.display = 'block';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('story') || 'last_backup';
    
    // Create game instance
    window.game = new Game(storyId);
}); 