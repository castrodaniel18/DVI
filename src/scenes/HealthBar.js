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
        //this.bar.stroke();
        this.bar.fillRect(data.x, data.y, BAR_WIDTH, BAR_HEIGHT);

        this.levelName=data.levelName;
        this.cameras.main.startFollow(this.scene.get(this.levelName).player);
        this.cameras.main.setBounds(0,0,
            this.scene.get(this.levelName).cameras.main.getBounds().right,
            this.scene.get(this.levelName).cameras.main.getBounds().bottom);
        //barra de cooldown del dash    
        this.dashBar = this.add.graphics();
        this.dashBar.fillStyle(0x0000f0, 1);
        this.dashBar.fillRect(data.x,data.y+10,BAR_WIDTH,BAR_HEIGHT);
        this.dashIcon=this.add.image(this.bar.x-20,this.bar.y,'dashIcon');
        this.dashIcon.setScale(0.03);
        this.barSize=0;

    }

    update(t,dt) {
    
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
            this.dashBar.clear();
            this.dashIcon.x=playerData.x-15;
            this.dashIcon.y=playerData.y;
            if(!playerData.canDash){
                this.dashIcon.setAlpha(0);
            }
            else this.dashIcon.setAlpha(100);
            //let barSizeStep=5000/(60000*70);
            /*if(!playerData.canDash){
                this.barSize=this.barSize+barSizeStep;
                this.dashBar.fillStyle(0x0000f0,1);
                this.dashBar.fillRect(playerData.x,playerData.y+10,this.barSize,BAR_HEIGHT);
            }
            else{
                this.barSize=null;
                this.barSize=0;
                this.dashBar.fillStyle(0x0000f0,1);
                this.dashBar.fillRect(playerData.x,playerData.y+10,BAR_WIDTH,BAR_HEIGHT);
            }*/
        }
        });
       
    }

}