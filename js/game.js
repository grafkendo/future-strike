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
        this.availableLocations = new Set(['apartment']);
        this.currentLocation = 'apartment';
        this.visitedLocations = new Set(['apartment']);
        
        // Add to existing properties
        this.gameTime = {
            hour: 21,    // Start at 9 PM
            minute: 0,
            day: 1
        };
        
        // Update inventory max size
        this.inventory = {
            items: [],
            maxSize: 6,  // Changed from 12 to 6
            credits: 1000
        };
        
        // Define available items
        this.itemDatabase = {
            medkit: {
                id: 'medkit',
                name: 'MediGel',
                description: 'Standard street doc healing compound. Restores 5 HP.',
                icon: 'medkit.png',
                usable: true,
                stackable: true,
                value: 100,
                effect: () => {
                    this.heal(5);
                }
            },
            deck_basic: {
                id: 'deck_basic',
                name: 'NetDeck Basic',
                description: 'Entry-level cyberdeck. Required for basic hacking.',
                icon: 'deck.png',
                usable: false,
                stackable: false,
                value: 500
            },
            cred_chip: {
                id: 'cred_chip',
                name: 'Credit Chip',
                description: 'Encrypted digital currency.',
                icon: 'chip.png',
                usable: true,
                stackable: true,
                value: 50,
                effect: () => {
                    this.addCredits(50);
                }
            }
        };
        
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
        this.setupInventory();
        this.updateInventoryDisplay();
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

        if (['noodle_shop', 'night_market', 'tunnels', 'rooftops'].includes(sceneId)) {
            this.visitedLocations.add(sceneId);
        }

        this.updateLocations();
        this.updateTimeDisplay();
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
            
            // Add time for successful action
            this.updateGameTime(15);  // 15 minutes per action
        } else {
            outcome.textContent = 'FAILURE: Action failed. -2 Health';
            outcome.style.color = '#ff0000';
            this.health -= 2;
            this.updateHealth();
            
            if (this.health <= 0) {
                this.endGame();
            }
            
            // Failed actions take longer
            this.updateGameTime(30);  // 30 minutes on failure
        }

        if (this.currentChoice) {
            const choice = this.story.scenes[this.currentScene].choices[this.currentChoice - 1];
            if (choice.healAmount && diceValue >= difficulty) {
                this.health = Math.min(this.health + choice.healAmount, this.story.gameConfig.maxHealth);
                this.updateHealth();
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

    updateLocations() {
        const locationValue = document.querySelector('.location-value');
        const locationButtons = document.querySelector('.location-buttons');
        
        // Update current location display
        locationValue.textContent = this.currentLocation.toUpperCase();
        
        // Clear and rebuild location buttons
        locationButtons.innerHTML = '';
        
        // Define revisitable locations
        const revisitableLocations = {
            'apartment': {
                name: 'APARTMENT',
                choices: [
                    {
                        text: "Rest and recover",
                        type: "Light",
                        difficulty: 3,
                        outcome: "Restored 2 health points",
                        healAmount: 2,
                        endsTurn: false
                    },
                    {
                        text: "Check medical supplies",
                        type: "Light",
                        difficulty: 3,
                        outcome: "Found some stims. Restored 2 health points",
                        healAmount: 2,
                        endsTurn: false
                    }
                ]
            },
            'noodle_shop': {
                name: 'NOODLE_SHOP',
                choices: [/* shop specific choices */]
            },
            'night_market': {
                name: 'NIGHT_MARKET',
                choices: [/* market specific choices */]
            },
            'tunnels': {
                name: 'TUNNELS',
                choices: [/* tunnel specific choices */]
            },
            'rooftops': {
                name: 'ROOFTOPS',
                choices: [/* rooftop specific choices */]
            }
        };

        // Create buttons for each available location
        Object.keys(revisitableLocations).forEach(loc => {
            if (this.visitedLocations.has(loc)) {
                const btn = document.createElement('button');
                btn.className = 'location-button';
                btn.textContent = revisitableLocations[loc].name;
                
                if (loc !== this.currentLocation) {
                    btn.addEventListener('click', () => this.travelTo(loc));
                } else {
                    btn.disabled = true;
                }
                
                locationButtons.appendChild(btn);
            }
        });
    }

    travelTo(location) {
        console.log(`Traveling to ${location}`);
        this.currentLocation = location;
        
        // Add travel time
        this.updateGameTime(30);  // 30 minutes for travel
        
        // Load location-specific scene
        if (location === 'apartment') {
            this.loadApartmentScene();
        } else {
            this.loadScene(location);
        }
        
        this.updateLocations();
    }

    loadApartmentScene() {
        const apartmentScene = {
            image: "apartment.png",
            text: "Your apartment. A cramped haven in the sprawling city. Medical supplies and basic security systems keep you alive between runs.",
            turnText: "Time to recover and plan your next move.",
            choices: [
                {
                    text: "Rest and recover",
                    type: "Light",
                    difficulty: 3,
                    outcome: "Restored 2 health points",
                    healAmount: 2,
                    endsTurn: false
                },
                {
                    text: "Check medical supplies",
                    type: "Light",
                    difficulty: 3,
                    outcome: "Found some stims. Restored 2 health points",
                    healAmount: 2,
                    endsTurn: false
                },
                {
                    text: "Review mission data",
                    type: "Medium",
                    difficulty: 4,
                    outcome: "Gained new insights about your situation.",
                    endsTurn: false
                }
            ]
        };
        
        this.displayScene(apartmentScene);
    }

    updateGameTime(minutesElapsed = 15) {  // Default 15 minutes per action
        this.gameTime.minute += minutesElapsed;
        
        // Handle hour rollover
        while (this.gameTime.minute >= 60) {
            this.gameTime.minute -= 60;
            this.gameTime.hour += 1;
            
            // Handle day rollover
            if (this.gameTime.hour >= 24) {
                this.gameTime.hour -= 24;
                this.gameTime.day += 1;
            }
        }
        
        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        const currentScene = document.querySelector('.current-scene');
        const timeString = `${String(this.gameTime.hour).padStart(2, '0')}:${String(this.gameTime.minute).padStart(2, '0')}`;
        const dayString = `DAY ${this.gameTime.day}`;
        
        currentScene.innerHTML = `
            <div class="scene-info">
                <span class="scene-number">SCENE: ${this.currentScene}</span>
                <span class="game-time">${timeString}</span>
                <span class="game-day">${dayString}</span>
            </div>
        `;
    }

    setupInventory() {
        // Add starting items
        this.addItem('medkit', 2);
        this.addItem('deck_basic', 1);
    }

    addItem(itemId, quantity = 1) {
        const itemData = this.itemDatabase[itemId];
        if (!itemData) return false;

        if (this.inventory.items.length >= this.inventory.maxSize && !itemData.stackable) {
            console.log('Inventory full');
            return false;
        }

        if (itemData.stackable) {
            const existingItem = this.inventory.items.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.inventory.items.push({ ...itemData, quantity });
            }
        } else {
            this.inventory.items.push({ ...itemData, quantity: 1 });
        }

        this.updateInventoryDisplay();
        return true;
    }

    removeItem(itemId, quantity = 1) {
        const itemIndex = this.inventory.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return false;

        const item = this.inventory.items[itemIndex];
        if (item.quantity > quantity) {
            item.quantity -= quantity;
        } else {
            this.inventory.items.splice(itemIndex, 1);
        }

        this.updateInventoryDisplay();
        return true;
    }

    useItem(itemId) {
        const item = this.inventory.items.find(item => item.id === itemId);
        if (!item || !item.usable) return false;

        if (item.effect) {
            item.effect();
        }

        this.removeItem(itemId, 1);
        return true;
    }

    updateInventoryDisplay() {
        const inventoryGrid = document.querySelector('.inventory-grid');
        const creditsDisplay = document.querySelector('.credits-value');
        
        // Update credits
        creditsDisplay.textContent = this.inventory.credits.toLocaleString();

        // Clear grid
        inventoryGrid.innerHTML = '';

        // Create slots
        for (let i = 0; i < this.inventory.maxSize; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot empty';
            
            if (i < this.inventory.items.length) {
                const item = this.inventory.items[i];
                slot.classList.remove('empty');
                slot.innerHTML = `
                    <img src="assets/images/items/${item.icon}" alt="${item.name}">
                    ${item.stackable && item.quantity > 1 ? `<span class="item-count">x${item.quantity}</span>` : ''}
                `;
                slot.addEventListener('click', () => this.showItemDetails(item));
            }
            
            inventoryGrid.appendChild(slot);
        }
    }

    showItemDetails(item) {
        const details = document.querySelector('.item-details');
        const slot = event.currentTarget;
        const slotRect = slot.getBoundingClientRect();
        
        details.style.display = 'block';
        details.style.left = `${slotRect.left}px`;
        details.style.top = `${slotRect.bottom + 5}px`; // 5px gap
        
        // Close details when clicking outside
        const closeDetails = (e) => {
            if (!details.contains(e.target) && !slot.contains(e.target)) {
                details.style.display = 'none';
                document.removeEventListener('click', closeDetails);
            }
        };
        
        document.addEventListener('click', closeDetails);
        
        // Update details content
        details.querySelector('.item-name').textContent = item.name;
        details.querySelector('.item-description').textContent = item.description;
        
        const actions = details.querySelector('.item-actions');
        actions.innerHTML = '';
        
        if (item.usable) {
            const useBtn = document.createElement('button');
            useBtn.className = 'item-action';
            useBtn.textContent = 'USE';
            useBtn.addEventListener('click', () => {
                this.useItem(item.id);
                details.style.display = 'none';
            });
            actions.appendChild(useBtn);
        }
        
        const dropBtn = document.createElement('button');
        dropBtn.className = 'item-action';
        dropBtn.textContent = 'DROP';
        dropBtn.addEventListener('click', () => {
            this.removeItem(item.id);
            details.style.display = 'none';
        });
        actions.appendChild(dropBtn);
    }

    addCredits(amount) {
        this.inventory.credits += amount;
        this.updateInventoryDisplay();
    }

    removeCredits(amount) {
        if (this.inventory.credits >= amount) {
            this.inventory.credits -= amount;
            this.updateInventoryDisplay();
            return true;
        }
        return false;
    }

    // Add to existing heal method
    heal(amount) {
        const oldHealth = this.health;
        this.health = Math.min(this.health + amount, this.story.gameConfig.maxHealth);
        const healed = this.health - oldHealth;
        
        if (healed > 0) {
            const outcome = document.querySelector('.outcome-text');
            outcome.style.display = 'block';
            outcome.textContent = `HEALED: Restored ${healed} health points`;
            outcome.style.color = '#00ff00';
        }
        
        this.updateHealth();
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