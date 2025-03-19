console.log('game.js loading...');

class Game {
    constructor(storyId) {
        console.log('Game constructor called with storyId:', storyId);
        this.storyId = storyId;
        this.story = null;
        this.health = 20;
        this.currentScene = '1'; // Change to string to handle named scenes
        this.currentDice = [];      // Stores the dice values for current turn
        this.usedDice = new Set();  // Tracks which dice indices have been used this turn
        this.currentChoice = null;
        this.rollConfirmed = false;
        this.waitingForNewRoll = true;
        this.canEndTurn = false;
        
        console.log('Game initialized, waiting for first roll');
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
            
            console.log('Story loaded successfully:', {
                title: this.story.metadata.title,
                currentScene: this.currentScene,
                health: this.health
            });
            
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

    loadScene(sceneId) {
        console.log('Loading scene:', sceneId);
        if (!this.story) {
            console.error('Story not loaded');
            return;
        }

        const scene = this.story.scenes[sceneId];
        if (!scene) {
            console.error('Scene not found:', sceneId);
            this.endGame();
            return;
        }

        // Reset turn state for new scene
        this.rollConfirmed = false;
        this.currentChoice = null;
        this.currentDice = [];
        this.usedDice.clear();
        this.waitingForNewRoll = true;
        this.canEndTurn = false;

        // Load scene image
        const sceneImage = document.querySelector('.scene-image');
        if (scene.image) {
            sceneImage.innerHTML = `<img src="assets/images/${scene.image}" alt="Scene ${sceneId}">`;
        } else {
            sceneImage.innerHTML = `<img src="assets/images/${this.storyId}.webp" alt="Story Image">`;
        }

        // Update scene number display
        const sceneDisplay = document.querySelector('.current-scene');
        sceneDisplay.textContent = `SCENE: ${sceneId}`;

        // Clear previous outcome
        const outcome = document.querySelector('.outcome-text');
        outcome.style.display = 'none';

        this.displayScene(scene);
        this.updateGameState();
        this.updateEndTurnButton();
        
        console.log('Scene loaded:', {
            id: sceneId,
            text: scene.text,
            choices: scene.choices
        });
    }

    displayScene(scene) {
        console.log('Displaying scene:', scene);
        
        const storyText = document.querySelector('.story-text');
        const choices = document.querySelector('.choices');
        
        if (!storyText || !choices) {
            console.error('Required DOM elements not found');
            return;
        }

        // Display main story text and turn text if available
        storyText.innerHTML = `
            <p>${scene.text}</p>
            ${scene.turnText ? `<p class="turn-text">${scene.turnText}</p>` : ''}
        `;
        
        choices.innerHTML = '';
        
        scene.choices.forEach((choice, i) => {
            const index = i + 1;
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.dataset.index = index;
            
            button.innerHTML = `
                <div class="choice-header">
                    [${choice.type}]${choice.endsTurn ? ' - ENDS TURN' : ''}
                </div>
                ${choice.text}
            `;
            
            button.addEventListener('click', () => this.selectChoice(button));
            choices.appendChild(button);
        });
    }

    selectChoice(buttonElement) {
        const index = parseInt(buttonElement.dataset.index); // This will be 1-based
        console.log('selectChoice called with display index:', index);
        
        // Don't subtract 1 here anymore - keep using 1-based indexing
        if (isNaN(index) || index < 1 || index > this.story.scenes[this.currentScene].choices.length) {
            console.error('Invalid choice index:', index);
            return;
        }
        
        document.querySelectorAll('.choice-button').forEach(btn => 
            btn.classList.remove('selected'));
        
        buttonElement.classList.add('selected');
        this.currentChoice = index; // Store the 1-based index
        
        document.querySelectorAll('.die').forEach(die => 
            die.classList.add('available'));
        
        console.log('Choice selected:', {
            displayIndex: index,
            choice: this.story.scenes[this.currentScene].choices[index - 1] // Only convert to 0-based when accessing array
        });
    }

    submitDiceRoll() {
        const diceValues = Array.from(document.querySelectorAll('.dice-box'))
            .map(box => parseInt(box.value))
            .filter(val => !isNaN(val) && val >= 1 && val <= 6);

        console.log('Submitted dice values:', diceValues);

        if (diceValues.length === 5) {
            this.currentDice = diceValues;
            this.usedDice.clear();
            this.rollConfirmed = true;
            this.waitingForNewRoll = false;
            this.canEndTurn = true;
            
            // Display the confirmed dice roll
            this.displayDice();
            
            // Don't clear input boxes - keep them for reference
            this.updateGameState();
            this.updateEndTurnButton();
            
            console.log('Dice roll confirmed:', this.currentDice);
        }
    }

    displayDice() {
        const diceContainer = document.querySelector('.current-dice');
        diceContainer.innerHTML = '';
        
        this.currentDice.forEach((value, index) => {
            const die = document.createElement('div');
            die.className = 'die';
            die.textContent = value;
            
            // Only grey out this specific die if it's been used
            if (this.usedDice.has(index)) {
                die.classList.add('used');
                console.log(`Die ${index} is used and greyed out`);
            } else {
                // Only add click listener to unused dice
                die.addEventListener('click', () => {
                    if (this.currentChoice !== null) {
                        console.log(`Clicking die ${index} with value ${value}`);
                        this.selectDie(index);
                    }
                });
            }
            
            diceContainer.appendChild(die);
        });

        console.log('Current dice state:', {
            allDice: this.currentDice,
            usedDice: Array.from(this.usedDice),
            currentChoice: this.currentChoice
        });
    }

    selectDie(index) {
        if (this.usedDice.has(index)) {
            console.log(`Die ${index} is already used`);
            return;
        }

        console.log('Selecting die:', {
            index: index,
            value: this.currentDice[index],
            currentChoice: this.currentChoice
        });

        const value = this.currentDice[index];
        const difficulty = this.getCurrentDifficulty();
        
        // Mark only this specific die as used
        this.usedDice.add(index);
        console.log(`Marked die ${index} as used`);
        
        // Update the display to grey out only the used die
        this.displayDice();
        
        this.calculateOutcome(value, difficulty);
        
        // Reset choice selection
        this.currentChoice = null;
        document.querySelectorAll('.choice-button').forEach(btn => 
            btn.classList.remove('selected'));
    }

    getCurrentDifficulty() {
        const scene = this.story.scenes[this.currentScene];
        console.log('Getting difficulty for:', {
            scene: this.currentScene,
            choice: this.currentChoice, // Now 1-based
            sceneData: scene
        });
        
        if (!scene || !scene.choices || !scene.choices[this.currentChoice - 1]) { // Convert to 0-based for array access
            console.error('Invalid scene or choice');
            return 3;
        }
        
        const difficulty = scene.choices[this.currentChoice - 1].difficulty; // Convert to 0-based for array access
        console.log('Difficulty value:', difficulty);
        return difficulty;
    }

    calculateOutcome(diceValue, difficulty) {
        console.log('Calculating outcome:', { diceValue, difficulty });
        const outcome = document.querySelector('.outcome-text');
        outcome.style.display = 'block';
        
        const scene = this.story.scenes[this.currentScene];
        const choice = scene.choices[this.currentChoice - 1];
        
        if (diceValue >= difficulty) {
            if (choice.outcome) {
                outcome.textContent = `SUCCESS: ${choice.outcome}`;
            } else {
                outcome.textContent = 'SUCCESS: Action completed.';
            }
            outcome.style.color = '#00ff00';
            
            // Scene transition (major choice) always ends turn
            if (choice.nextScene) {
                console.log(`Transitioning to scene: ${choice.nextScene}`);
                setTimeout(() => {
                    this.currentScene = choice.nextScene;
                    this.loadScene(this.currentScene);
                    this.endTurn(); // End turn after scene transition
                }, 2000);
            }
            // Optional turn end for significant actions
            else if (choice.endsTurn) {
                setTimeout(() => {
                    this.endTurn();
                }, 2000);
            }
            
        } else {
            outcome.textContent = 'FAILURE: Action failed. -2 Health';
            outcome.style.color = '#ff0000';
            this.health -= 2;
            this.updateHealth();
            
            if (this.health <= 0) {
                this.endGame();
            }
        }
    }

    updateHealth() {
        const healthValue = document.querySelector('.health-value');
        if (healthValue) {
            healthValue.textContent = `${this.health}/${this.story.gameConfig.maxHealth}`;
        }
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
        // Reset for next turn
        this.rollConfirmed = false;
        this.currentChoice = null;
        this.currentDice = [];
        this.usedDice.clear();
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

    updateEndTurnButton() {
        // Implementation of updateEndTurnButton method
    }

    clearDiceInput() {
        const diceBoxes = document.querySelectorAll('.dice-box');
        diceBoxes.forEach(box => box.value = '');
        document.querySelector('.current-dice').innerHTML = '';
    }

    endGame() {
        console.log('Game ending...');
        const storyText = document.querySelector('.story-text');
        const choices = document.querySelector('.choices');
        const dicePanel = document.querySelector('.dice-panel');
        
        // Display game over message
        storyText.innerHTML = `
            <h2>GAME OVER</h2>
            <p>Final Health: ${this.health}</p>
            <p>Scene Reached: ${this.currentScene}</p>
        `;
        
        // Clear choices and dice
        choices.innerHTML = '';
        dicePanel.innerHTML = `
            <button class="cyber-button" onclick="location.reload()">
                RESTART_GAME.exe
            </button>
        `;
    }

    endTurn() {
        console.log('Ending turn...');
        
        // Clear dice only at turn end
        this.clearDiceInput();
        this.currentDice = [];
        this.usedDice.clear();
        
        // Reset turn state
        this.rollConfirmed = false;
        this.currentChoice = null;
        this.waitingForNewRoll = true;
        this.canEndTurn = false;
        
        // Update UI
        this.updateGameState();
        this.updateEndTurnButton();
        
        // Display turn end message
        const outcome = document.querySelector('.outcome-text');
        outcome.style.display = 'block';
        outcome.textContent = 'TURN ENDED: Roll dice for your next actions.';
        outcome.style.color = '#00ffff';
    }
}

// Initialize game when DOM is loaded
console.log('Setting up DOMContentLoaded listener');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, getting story ID from URL');
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('story') || 'last_backup';
    
    console.log('Creating game instance with story:', storyId);
    window.game = new Game(storyId);
});

console.log('game.js finished loading'); 