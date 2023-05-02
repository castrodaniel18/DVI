import Phaser from "phaser";

export default class LevelCompleted extends Phaser.Scene {
    constructor() {
      super({ key: 'LevelCompleted' });
    }
  
    preload() {
        this.load.image('bg','assets/elements/settingsPanel.png');
        this.load.image('button', 'assets/elements/button.png');
    }

    init(data) {
        this.difficulty = data.difficulty;
        this.characterName = data.characterName;
    }
  
    create() {
        this.scene.bringToTop();
        //Fondo
        var background = this.add.image(0, 0, 'bg');
        background.setScale(800 / background.width, 600 / background.height);
        background.setOrigin(0, 0);
        
        //Título Level completed
        this.add.text(230, 75 , 'Level Completed!', { fontFamily: 'myFont', fontSize: '40px', color: '#008000' });
        
        //Level selector
        this.levelSelectorButton = this.add.image(400, 230, 'button').setInteractive();
        this.levelSelectorButton.setScale(8, 3.5)
        this.add.text(305, 225, 'Level Selector', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
        this.levelSelectorButton.on('pointerdown', () => {
            this.scene.start('LevelSelector', { difficulty: this.difficulty, characterName: this.characterName});
        });
        // Boton de volver a main menu
        this.startButton = this.add.image(400, 340, 'button').setInteractive();
        this.startButton.setScale(6, 3.5);
        this.add.text(340, 335, 'Main menu', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
        this.startButton.on('pointerdown', () => {
            this.scene.start('StartScene', { difficulty: this.difficulty});
        });
    }
  }