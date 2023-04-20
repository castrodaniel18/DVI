import Phaser from "phaser";
import StartScene from './StartScene';

export default class Settings extends Phaser.Scene {
    constructor() {
      super({ key: 'Settings' });
    }
  
    preload() {
        this.load.image('soundButton','assets/elements/sound.png');
        this.load.image('fullscreenButton','assets/elements/fullscreen.png');
        this.load.image('title','assets/elements/title.png');
        this.load.image('arrow', 'assets/elements/leftArrow.png');
        this.load.image('difficultyButton', 'assets/elements/difficultyButton.png');
    }

    init() {
        this.sound.volume = 0.5; // Establece el volumen inicial del sonido al 50%
    }
  
    create() {
        //Fondo gris
        const bg = this.add.graphics();
        bg.fillStyle(0x9B9B9B, 0.5);
        bg.fillRect(0, 0, 800, 600);

        //Título Settings
        let title = this.add.image(250,50,'title').setOrigin(0,0);
        title.setScale(0.8);

        //Botón para volver al menú principal
        this.arrow = this.add.image(120, 85, 'arrow').setInteractive().setFlip(true, false);
        this.arrow.setScale(0.65);
        this.arrow.on('pointerdown', () => {
            this.scene.start('StartScene');
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

        //Botón de dificultad
        this.difficultyButton = this.add.image(375, 330, 'difficultyButton').setInteractive();
        this.difficultyButton.setScale(1.2);
        this.difficultyButton.on('pointerdown', () => {
            
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