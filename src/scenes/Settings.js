import Phaser from "phaser";
import StartScene from './StartScene';

export default class Settings extends Phaser.Scene {
    constructor(difficulty) {
      super({ key: 'Settings' });
    }
  
    preload() {
        this.load.image('bg','assets/elements/settingsMenu.png');
        this.load.image('soundButton','assets/elements/sound.png');
        this.load.image('fullscreenButton','assets/elements/fullscreen.png');
        this.load.image('title','assets/elements/title.png');
        this.load.image('arrow', 'assets/elements/leftArrow.png');
        this.load.image('difficultyButton', 'assets/elements/difficultyButton.png');
        this.load.image('easyButton', 'assets/elements/easyButton.png');
        this.load.image('easyButtonSelected', 'assets/elements/easyButtonSelected.png');
        this.load.image('normalButton', 'assets/elements/normalButton.png');
        this.load.image('normalButtonSelected', 'assets/elements/normalButtonSelected.png');
        this.load.image('hardButton', 'assets/elements/hardButton.png');
        this.load.image('hardButtonSelected', 'assets/elements/hardButtonSelected.png');
    }

    init(data) {
        this.sound.volume = 0.5; // Establece el volumen inicial del sonido al 50%
        this.difficulty = data.difficulty;

        console.log("difficulty: " + this.difficulty);
    }
  
    create() {
        
        //Fondo
        var background = this.add.image(0, 0, 'bg');
        background.setScale(800 / background.width, 600 / background.height);
        background.setOrigin(0, 0);

        //Título Settings
        let title = this.add.image(280,65,'title').setOrigin(0,0);
        title.setScale(0.6);

        //Botón para volver al menú principal
        this.arrow = this.add.image(100, 50, 'arrow').setInteractive().setFlip(true, false);
        this.arrow.setScale(0.5);
        this.arrow.on('pointerdown', () => {
            this.scene.start('StartScene', { difficulty: this.difficulty });
        });

        //Icono sonido
        this.soundButton = this.add.image(200, 220, 'soundButton').setInteractive();
        this.soundButton.setScale(0.2);

        //Barra de sonido
        this.soundBar = this.add.dom(300, 220).createFromHTML(`<input type="range" min="0" max="100" value="${this.sound.volume * 100}" class="slider" id="soundBar">`);
        // Cuando el valor de la barra cambie, actualiza el volumen del sonido
        this.soundBar.addListener('change');
        this.soundBar.on('change', () => {
            this.sound.volume = this.soundBar.node.value / 100;
        });
        //Se meten estilos a la barra de sonido
        this.createStyle();

        //Botón de pantalla completa
        this.fullscreenButton = this.add.image(500, 220, 'fullscreenButton').setInteractive();
        this.fullscreenButton.setScale(0.05);
        this.fullscreenButton.on('pointerdown', this.toggleFullscreen, this);

        //Botones de dificultad
        //Easy
        if (this.difficulty == "easy"){
            this.easyButton = this.add.image(200, 403, 'easyButtonSelected').setInteractive();
        }
        else{
            this.easyButton = this.add.image(200, 403, 'easyButton').setInteractive();
        }
        this.easyButton.setScale(0.5);
        this.easyButton.setVisible(false);
        this.easyButton.on('pointerdown', () => {
            this.scene.start('StartScene', { difficulty: "easy" });
        });
        
        //Normal
        if (this.difficulty == "normal"){
            this.normalButton = this.add.image(375, 400, 'normalButtonSelected').setInteractive();
        }
        else{
            this.normalButton = this.add.image(375, 400, 'normalButton').setInteractive();
        }
        this.normalButton.setScale(0.5);
        this.normalButton.setVisible(false);
        this.normalButton.on('pointerdown', () => {
            this.scene.start('StartScene', { difficulty: "normal" });
        });

        //Hard
        if (this.difficulty == "hard"){
            this.hardButton = this.add.image(557, 404, 'hardButtonSelected').setInteractive();
        }
        else{
            this.hardButton = this.add.image(557, 404, 'hardButton').setInteractive();
        }
        this.hardButton.setScale(0.5);
        this.hardButton.setVisible(false);
        this.hardButton.on('pointerdown', () => {
            this.scene.start('StartScene', { difficulty: "hard" });
        });

        //Despliegue botones dificultad
        this.difficultyButton = this.add.image(375, 330, 'difficultyButton').setInteractive();
        this.difficultyButton.setScale(1.2);
        this.difficultyButton.on('pointerdown', () => {
            if (this.easyButton.visible){
                this.easyButton.setVisible(false);
                this.normalButton.setVisible(false);
                this.hardButton.setVisible(false);    
            }
            else{
                this.easyButton.setVisible(true);
                this.normalButton.setVisible(true);
                this.hardButton.setVisible(true);
            }
        });

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