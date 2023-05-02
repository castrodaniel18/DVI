import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: 'GameOver' });
    }
  
    preload() {
        this.load.image('bg','assets/elements/settingsPanel.png');
        this.load.image('button', 'assets/elements/button.png');
    }

    init(data) {
        this.difficulty = data.difficulty;
        this.characterName = data.characterName;
        this.level = data.level
    }
  
    create() {
        this.scene.bringToTop();
        //Fondo
        var background = this.add.image(0, 0, 'bg');
        background.setScale(800 / background.width, 600 / background.height);
        background.setOrigin(0, 0);
        
        //Título Game Over
        this.add.text(235, 70 , 'GAME OVER', { fontFamily: 'myFont', fontSize: '54px', color: '#FF0000' });
        // Try again
        this.tryAgainButton = this.add.image(400, 200, 'button').setInteractive();
        this.tryAgainButton.setScale(6, 3.5)
        this.add.text(340, 195, 'Try again', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
        this.tryAgainButton.on('pointerdown', () => {
            this.scene.start(this.level , { difficulty: this.difficulty, characterName: this.characterName});
        });
        //Level selector
        this.levelSelectorButton = this.add.image(400, 300, 'button').setInteractive();
        this.levelSelectorButton.setScale(8, 3.5)
        this.add.text(310, 295, 'Level Selector', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
        this.levelSelectorButton.on('pointerdown', () => {
            this.scene.start('LevelSelector', { difficulty: this.difficulty, characterName: this.characterName});
        });
        // Boton de volver a main menu
        this.startButton = this.add.image(400, 400, 'button').setInteractive();
        this.startButton.setScale(6, 3.5);
        this.add.text(340, 395, 'Main menu', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
        this.startButton.on('pointerdown', () => {
            this.scene.start('StartScene', { difficulty: this.difficulty});
        });

    }
      
  }