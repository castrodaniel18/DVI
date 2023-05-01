import { Scene } from "phaser";
const BAR_WIDTH = 150;
const BAR_HEIGHT = 15;
export default class HealthBar extends Phaser.Scene {
    constructor() {
        super('healthBar');
        this.maxHealth = 100;
    }
    preload() { }
    create(data) {
        this.maxHealth = data.health;
        this.bar = this.add.graphics();
        this.bar.fillStyle(0x00f000, 1);
        this.bar.fillRect(data.x, data.y, BAR_WIDTH, BAR_HEIGHT);
        this.levelName=data.levelName;
        this.cameras.main.setBounds(0, 0, 
            this.scene.get(this.levelName).cameras.main.width, 
            this.scene.get(this.levelName).cameras.main.height);
    }

    update() {
        this.scene.get(this.levelName).events.on('updatePlayerData', (playerData) => {
            let newBarWidth = BAR_WIDTH * (playerData.health / this.maxHealth);
            let barColor;
            if(newBarWidth/BAR_WIDTH>0.5)barColor="0x00f000";
            else if(newBarWidth/BAR_WIDTH<0.5 && newBarWidth/BAR_WIDTH>0.2)barColor="0xffff00";
            else barColor="0xff0000";
            this.bar.clear();
            this.bar.fillStyle(barColor, 1); 
            this.bar.fillRect(playerData.x, playerData.y, newBarWidth, BAR_HEIGHT);
            
        });
    }

}