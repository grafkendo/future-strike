export class StatusPanel {
    constructor() {
        this.health = 10;
        this.credits = 1000;
        this.xp = 0;
        this.time = '21:00';
        this.scene = 1;
        this.element = this.createStatusPanel();
    }

    createStatusPanel() {
        const panel = document.createElement('div');
        panel.className = 'status-panel';
        panel.innerHTML = `
            <div class="status-item">
                <span class="status-label">HEALTH</span>
                <span class="health-value">${this.health}</span>
            </div>
            <div class="status-item">
                <span class="status-label">CREDITS</span>
                <span class="credits-value">${this.credits}</span>
            </div>
            <div class="status-item">
                <span class="status-label">XP</span>
                <span class="xp-value">${this.xp}</span>
            </div>
            <div class="status-item">
                <span class="status-label">TIME</span>
                <span class="time-value">${this.time}</span>
            </div>
            <div class="status-item">
                <span class="status-label">SCENE</span>
                <span class="scene-value">${this.scene}</span>
            </div>
        `;
        return panel;
    }

    updateHealth(value) {
        this.health = value;
        this.element.querySelector('.health-value').textContent = value;
    }

    updateCredits(value) {
        this.credits = value;
        this.element.querySelector('.credits-value').textContent = value;
    }

    updateXP(value) {
        this.xp = value;
        this.element.querySelector('.xp-value').textContent = value;
    }

    updateTime(value) {
        this.time = value;
        this.element.querySelector('.time-value').textContent = value;
    }

    updateScene(value) {
        this.scene = value;
        this.element.querySelector('.scene-value').textContent = value;
    }

    mount(parentElement) {
        parentElement.appendChild(this.element);
    }
}

export const StatusPanelHTML = `
    <div class="status-panel">
        <div class="status-item">
            <span class="status-label">HEALTH</span>
            <span class="health-value">10</span>
        </div>
        <div class="status-item">
            <span class="status-label">CREDITS</span>
            <span class="credits-value">1000</span>
        </div>
        <div class="status-item">
            <span class="status-label">XP</span>
            <span class="xp-value">0</span>
        </div>
        <div class="status-item">
            <span class="status-label">TIME</span>
            <span class="time-value">21:00</span>
        </div>
        <div class="status-item">
            <span class="status-label">SCENE</span>
            <span class="scene-value">1</span>
        </div>
    </div>
`; 