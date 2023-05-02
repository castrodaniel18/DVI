const BAR_WIDTH = 70;
const BAR_HEIGHT = 7;
export default class HealthBar extends Phaser.Scene {
    constructor() {
        super('HealthBar');
        this.maxHealth = 100;
    }
    preload(){
		this.load.image('dashIcon','assets/elements/dash.png');
    }
    create(data) {
        this.maxHealth = data.health
        this.bar = this.add.graphics();
        this.bar.fillStyle(0x00f000, 1);
        this.bar.fillRect(data.x, data.y, BAR_WIDTH, BAR_HEIGHT);

        this.levelName=data.levelName;
        this.cameras.main.startFollow(this.scene.get(this.levelName).player);
        this.cameras.main.setBounds(0,0,
            this.scene.get(this.levelName).cameras.main.getBounds().right,
            this.scene.get(this.levelName).cameras.main.getBounds().bottom);
        this.dashIcon=this.add.image(this.bar.x-20,this.bar.y,'dashIcon');
        this.dashIcon.setScale(0.03);
    }

    update() {
    
        this.scene.get(this.levelName).events.on('updatePlayerData', (playerData) => {
            if(playerData.health<0){
                this.bar.clear();
            }
            else{
            let newBarWidth = BAR_WIDTH * (playerData.health / this.maxHealth);
            this.bar.clear();
            let percentage = playerData.health / this.maxHealth;
            let r, g, b;
            
            if (percentage >= 0.5) {
              // Verde -> amarillo
              r = Math.floor(255 * (1 - (percentage - 0.5) * 2));
              g = 255;
              b = 0;
            } else {
              // Amarillo -> rojo
              r = 255;
              g = Math.floor(255 * percentage * 2);
              b = 0;
            }
            let color = (r << 16) | (g << 8) | b;
            this.bar.fillStyle(color, 1); 
            this.bar.fillRect(playerData.x, playerData.y, newBarWidth, BAR_HEIGHT);
            this.dashIcon.x=playerData.x-15;
            this.dashIcon.y=playerData.y;
            if(!playerData.canDash){
                this.dashIcon.setAlpha(0);
            }
            else this.dashIcon.setAlpha(100);
            }
        });
       
    }

}