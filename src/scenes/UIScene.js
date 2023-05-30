const BAR_WIDTH = 70;
const BAR_HEIGHT = 7;
export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
        this.maxHealth = 100;
        this.playerItems=[];
		this.playerItemsBorder = [];
		this.itemsOnBag = [];
		this.itemImages = [];
		this.itemLevels = [];
    }
    preload() {
        this.load.image('dashIcon', 'assets/elements/dash.png');
        this.load.image('pauseButton', 'assets/elements/pauseButton.png');
        this.load.image('levelPanel', 'assets/elements/levelPanel.png');
        this.load.image('item', 'assets/elements/marco_objeto.png');
    }
    create(data) {
        this.levelName = data.levelName;
        this.scene.moveAbove(this.levelName);
        this.maxHealth = data.health
        this.inventorySize=data.inventorySize;
        this.bar = this.add.graphics();
        this.bar.fillStyle(0x00f000, 1);
        //this.bar.stroke();
        this.bar.fillRect(data.x, data.y, BAR_WIDTH, BAR_HEIGHT);

        this.cameras.main.startFollow(this.scene.get(this.levelName).player);
        this.cameras.main.setBounds(0, 0,
            this.scene.get(this.levelName).cameras.main.getBounds().right,
            this.scene.get(this.levelName).cameras.main.getBounds().bottom);
        //barra de cooldown del dash    
        this.dashBar = this.add.graphics();
        this.dashBar.fillStyle(0x0000f0, 1);
        this.dashBar.fillRect(data.x, data.y + 10, BAR_WIDTH, BAR_HEIGHT);
        this.dashIcon = this.add.image(this.bar.x - 20, this.bar.y, 'dashIcon');
        this.dashIcon.setScale(0.03);
        this.barSize = 0;

        this.currentLevel=this.game.scene.getScene(this.levelName);
        //Botón de pausa
        this.pauseButton = this.add.image(750, 25, 'pauseButton').setInteractive();
        this.pauseButton.setScale(2);
        this.pauseButton.on('pointerdown', () => {
            this.currentLevel.waveController.initialPauseTime = new Date();
            this.currentLevel.waveController.pause = true;
            this.currentLevel.scene.pause();
            this.currentLevel.scene.run('PauseScene', { difficulty: this.difficulty, actualScene: this.levelName });
        });
        this.pauseButton.on('pointerover',()=>{
            this.currentLevel.player.cursorOnPauseButton=true;
        })
        this.pauseButton.on('pointerout',()=>{
            this.currentLevel.player.cursorOnPauseButton=false;
        })
        //texto para el nivel
        this.playerLevelText = this.add.text(10, 10, 'Level: 1 - Exp: ' + this.playerExp, { fontFamily: 'myFont',fontSize: '32px', fill: '#FFFFFF' });
        //Marco para nivel
        this.levelPanel = this.add.image(140, 30, 'levelPanel');
        this.levelPanel.setScale(.8, .35);
        //Objetos del jugador
        this.playerItemsBorder[0] = this.add.image(50, 100, 'item');
        this.playerItemsBorder[1] = this.add.image(100, 100, 'item');

    }

    update(t, dt) {
        //texo del nivel del jugador
        this.playerLevelText.destroy();
        this.playerLevelText = this.add.text(15, 20, 'Level: ' + this.playerLevel + ' - Exp: ' + this.playerExp, { fontFamily: 'myFont', fontSize: '26px', fill: '#FFFFFF' });
        this.playerLevelText.setPosition(this.cameras.main.scrollX + 17, this.cameras.main.scrollY + 20);
        //posicion del nivel
        this.levelPanel.setPosition(this.cameras.main.scrollX + 140, this.cameras.main.scrollY + 30);
        //posicion de botones
        this.pauseButton.setPosition(this.cameras.main.scrollX + 750, this.cameras.main.scrollY + 25);
        //posicion de objetos
        let pos = 50;
        for (let i = 0; i < this.inventorySize; i++) {
            this.playerItemsBorder[i].setPosition(this.cameras.main.scrollX + pos, this.cameras.main.scrollY + 100);
            pos += 50;
        }
        pos = 50;
        for (let i = 0; i < this.inventorySize; i++) {
            if (this.itemImages[i]) {
                this.itemImages[i].setPosition(this.cameras.main.scrollX + pos, this.cameras.main.scrollY + 100);
                pos += 50;
            }
        }
        pos = 30;
        for (let i = 0; i < this.inventorySize; i++) {
            if (this.itemLevels[i]) {
                this.itemLevels[i].setPosition(this.cameras.main.scrollX + pos, this.cameras.main.scrollY + 127);
                pos += 50;
            }
        }

        this.scene.get(this.levelName).events.on('updatePlayerData', (playerData) => {
            this.playerLevel=playerData.playerLevel;
            this.playerExp=playerData.playerExp
            this.health=playerData.health;
            this.x=playerData.x;
            this.y=playerData.y;
            this.canDash=playerData.canDash
           
        });
        if (this.health < 0) {
            this.bar.clear();
        }
        else {
            let newBarWidth = BAR_WIDTH * (this.health / this.maxHealth);
            this.bar.clear();
            let percentage = this.health / this.maxHealth;
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
            this.bar.fillRect(this.x, this.y, newBarWidth, BAR_HEIGHT);
            this.dashBar.clear();
            let fps = (dt/1000)/(1/60);
            let barSizeStep=(70/330)*fps;
            if(!this.canDash){
                this.barSize+=barSizeStep;
                this.dashBar.fillStyle(0x0000f0,1);
                this.dashBar.fillRect(this.x,this.y+10,this.barSize,BAR_HEIGHT);
            }
            else{
                this.barSize=0;
                this.dashBar.fillStyle(0x0000f0,1);
                this.dashBar.fillRect(this.x,this.y+10,BAR_WIDTH,BAR_HEIGHT);
            }
        }

    }

}