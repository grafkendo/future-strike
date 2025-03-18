class Game {
    constructor() {
        this.health = 20;
        this.currentScene = 1;
        this.currentDice = [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Dice input handling
        document.getElementById('roll-submit').addEventListener('click', () => {
            this.submitDiceRoll();
        });

        // Enhanced dice input validation
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
                
                // Ensure single digit 1-6
                value = value.slice(0, 1);
                value = Math.min(Math.max(parseInt(value) || 1, 1), 6);
                e.target.value = value;

                // Auto-advance to next box
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

    submitDiceRoll() {
        const diceValues = Array.from(document.querySelectorAll('.dice-box'))
            .map(box => parseInt(box.value))
            .filter(val => !isNaN(val) && val >= 1 && val <= 6);

        if (diceValues.length === 5) {
            this.currentDice = diceValues;
            this.displayDice();
            this.clearDiceInput();
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

    selectDie(index) {
        // Remove previous selections
        document.querySelectorAll('.die').forEach(die => die.classList.remove('selected'));
        // Add selection to clicked die
        document.querySelectorAll('.die')[index].classList.add('selected');
        
        const value = this.currentDice[index];
        const difficulty = this.getCurrentDifficulty();
        this.calculateOutcome(value, difficulty);
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
        
        // Visual feedback for health changes
        const healthDisplay = document.querySelector('.health-value');
        healthDisplay.style.color = '#ff0000';
        setTimeout(() => {
            healthDisplay.style.color = '#ff69b4';
        }, 1000);
    }

    displayOutcome(outcome, healthCost) {
        const outcomePanel = document.querySelector('.outcome-text');
        outcomePanel.innerHTML = `
            <h3>${outcome}</h3>
            <p>Health cost: ${healthCost}</p>
        `;
        
        // Visual feedback for outcome
        outcomePanel.style.opacity = '0';
        setTimeout(() => {
            outcomePanel.style.opacity = '1';
        }, 100);
    }

    getCurrentDifficulty() {
        // This would be set based on the current scene and choice
        return 3; // Default medium difficulty
    }

    clearDiceInput() {
        document.querySelectorAll('.dice-box').forEach(box => {
            box.value = '';
            box.style.borderColor = '#ff69b4';
        });
        document.querySelectorAll('.dice-box')[0].focus();
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    const game = new Game();
}); 