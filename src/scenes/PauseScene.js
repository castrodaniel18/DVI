import Phaser from "phaser";

export default class PauseScene extends Phaser.Scene {
    constructor(difficulty) {
      super({ key: 'PauseScene' });
    }
  
    preload() {
        this.load.image('settingsPanel','assets/elements/settingsPanel.png');
        this.load.image('soundButton','assets/elements/sound.png');
        this.load.image('fullscreenButton','assets/elements/fullscreen.png');
        this.load.image('button', 'assets/elements/button.png');
        this.load.image('houseButton', 'assets/elements/houseButton.png');
        this.load.image('pauseButtonInMenu', 'assets/elements/pauseButton.png');
    }

    init(data) {
        this.difficulty = data.difficulty;
        this.lastScene = data.actualScene;
    }
  
    create() {
        this.scene.bringToTop();
        /*links assets
        https://mounirtohami.itch.io/pixel-art-gui-elements
        https://mounirtohami.itch.io/minimalpixel-font
        */

        //Fondo
        var background = this.add.image(0, 0, 'settingsPanel');
        background.setScale(800 / background.width, 600 / background.height);
        background.setOrigin(0, 0);

        //Título Settings
        this.add.text(290, 65, 'Settings', { fontFamily: 'myFont', fontSize: '54px', color: '#ffffff' }); 

        //Botón para volver al menú principal
        this.houseButton = this.add.image(650, 170, 'houseButton').setInteractive();
        this.houseButton.setScale(3);
        this.houseButton.on('pointerdown', () => {
            this.scene.stop(this.lastScene);
            this.scene.start('StartScene', { difficulty: this.difficulty });
            this.scene.setVisible(false,'HealthBar');
            this.scene.stop('PauseScene');
        })

        //Botón para quitar la pausa
        this.pauseButton = this.add.image(750, 25, 'pauseButton').setInteractive();
		this.pauseButton.setScale(2);
        this.pauseButton.on('pointerdown', () => {
            this.scene.resume(this.lastScene, { difficulty: this.difficulty });
            this.scene.stop('PauseScene', { difficulty: this.difficulty });
        });

        //Icono sonido
        this.soundRectangle = this.add.image(315, 220, 'button');
        this.soundRectangle.setScale(5.2, 2.5);
        this.add.text(165, 215, 'Music:', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' });
        this.soundButton = this.add.image(260, 225, 'soundButton').setInteractive();
        this.soundButton.setScale(0.12);

        //Barra de sonido
        let bar = `<input type="range" min="0" max="100" value="${this.sound.volume * 100}" class="slider" id="soundBar">`;
        this.soundBar = this.add.dom(330, 225).createFromHTML(bar);
        this.soundBar.setScale(0.8);
        // Cuando el valor de la barra cambie, actualiza el volumen del sonido
        this.soundBar.addListener('change');
        this.soundBar.on('change', () => {
            this.sound.volume = this.soundBar.node.firstChild.value / 100;
        });
        //Se meten estilos a la barra de sonido
        this.createStyle();

        //Botón de pantalla completa
        this.fullScreenRectangle = this.add.image(320, 305, 'button');
        this.fullScreenRectangle.setScale(1.5, 2.5);
        this.add.text(165, 300, 'FullScreen:', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' });
        this.fullscreenButton = this.add.image(320, 310, 'fullscreenButton').setInteractive();
        this.fullscreenButton.setScale(0.02);
        this.fullscreenButton.on('pointerdown', this.toggleFullscreen, this);

        //Botones de dificultad
        this.add.text(165, 380, 'Difficulty:', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' });

        //Easy
        this.easyButton = this.add.image(320, 385, 'button').setInteractive();
        this.easyButton.setScale(2.5);
        if (this.difficulty == "easy"){
            this.add.text(298, 380, 'Easy', { fontFamily: 'myFont', fontSize: '20px', color: '#ff4000' });
        }else{
            this.add.text(298, 380, 'Easy', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' });

            this.easyButton.on('pointerdown', () => {
                //Al cambiar la dificultad a mitad de partida no es capaz de cambiarla
                this.scene.resume('Level1Scene', { difficulty: 'easy' });
                this.scene.stop('PauseScene', { difficulty: this.difficulty });
            });
        }
        
        //Normal
        this.normalButton = this.add.image(430, 385, 'button').setInteractive();
        this.normalButton.setScale(3.3, 2.5);
        if (this.difficulty == "normal"){
            this.add.text(395, 380, 'Normal', { fontFamily: 'myFont', fontSize: '20px', color: '#ff4000' });
        }else{
            this.add.text(395, 380, 'Normal', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' });

            this.normalButton.on('pointerdown', () => {
                this.scene.resume('Level1Scene', { difficulty: 'normal' });
                this.scene.stop('PauseScene', { difficulty: this.difficulty });
            });
        }

        //Hard
        this.hardButton = this.add.image(540, 385, 'button').setInteractive();
        this.hardButton.setScale(2.5);
        if (this.difficulty == "hard"){
            this.add.text(517, 380, 'Hard', { fontFamily: 'myFont', fontSize: '20px', color: '#ff4000' });
        }else{
            this.add.text(517, 380, 'Hard', { fontFamily: 'myFont', fontSize: '20px', color: '#ffffff' });

            this.hardButton.on('pointerdown', () => {
                this.scene.resume('Level1Scene', { difficulty: 'hard' });
                this.scene.stop('PauseScene', { difficulty: this.difficulty });
            });
        }

    }
      
    toggleFullscreen() {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        } else {
            this.scale.startFullscreen();
        }
    }
    
    createStyle() {
        // Crea los estilos CSS necesarios para los elementos
        const style = document.createElement('style');
        style.innerHTML = `
          .slider {
            width: 80%;
            margin: 10px auto;
            -webkit-appearance: none;
            background-color: #ddd;
            border-radius: 20px;
            height: 10px;
          }
      
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #4CAF50;
            cursor: pointer;
          }
        `;
    }   
  }