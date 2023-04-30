import Phaser from "phaser";
<<<<<<< HEAD
import Level1Scene from './Level1Scene';
=======
>>>>>>> 32e93ae849cb83adf1c52a3381aaf8456016497e

export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
      this.musicEnabled = false;
    }
  
    preload() {
      this.load.css('start', 'web/css/start.css');
      /*Créditos de la canción para meter al gdd
      Obra: Corazón de Guerrero
      Música de https://www.fiftysounds.com/es/
      */
      this.load.audio('music', '../../../public/assets/sounds/music.mp3');
      this.load.image('background', '../../../public/assets/elements/menuBackground.png');
      this.load.image('cartel', '../../../public/assets/elements/settingsPanel.png');
      this.load.image('button', 'assets/elements/button.png');
    }

    init(data) {
      // guarda la dificultad seleccionada en una variable
      if (data.difficulty != "easy" && data.difficulty != "normal" && data.difficulty != "hard")
        this.difficulty = "normal";
      else
        this.difficulty = data.difficulty;

      if (!data.music){
        this.musicEnabled = false;
      }
      else{
        this.musicEnabled = true;
      }

    }

    init(data) {
      // guarda la dificultad seleccionada en una variable
      if (data.difficulty != "easy" && data.difficulty != "normal" && data.difficulty != "hard")
        this.difficulty = "normal";
      else
        this.difficulty = data.difficulty;

    }
  
    create() {
      //Fondo
      this.background = this.add.image(0, 0, 'background');
      this.background.setScale(800 / this.background.width, 600 / this.background.height);
      this.background.setOrigin(0, 0);

      //Cartel
      var background = this.add.image(0, 0, 'cartel');
      background.setScale(800 / background.width, 600 / background.height);
      background.setOrigin(0, 0);

<<<<<<< HEAD
        // Boton de opciones
        const buttonSettings = document.createElement('div');
        buttonSettings.textContent = 'Settings';
        buttonSettings.classList.add('button');
        this.add.dom(400, 250, buttonSettings);
        buttonSettings.addEventListener('click', () => {
            this.scene.start('Settings', { difficulty: this.difficulty });
        });
=======
      //Canción de fondo
      this.music = this.sound.add('music');
      if (!this.musicEnabled){
        this.music.play();
      }
>>>>>>> 32e93ae849cb83adf1c52a3381aaf8456016497e

      // Titulo del juego
      this.add.text(245, 75, 'Folkore ', { fontFamily: 'myFont', fontSize: '38px', color: '#0E9AF1' });
      this.add.text(415, 75, 'Hunters', { fontFamily: 'myFont', fontSize: '38px', color: '#ffffff' });

      // Boton de comenzar juego
      this.startButton = this.add.image(400, 200, 'button').setInteractive();
      this.startButton.setScale(6, 3.5);
      this.add.text(330, 193, 'Start Game', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
      this.startButton.on('pointerdown', () => {
        this.scene.start('characterSelection', { difficulty: this.difficulty});
      });

      // Boton de opciones
      this.settingsButton = this.add.image(400, 300, 'button').setInteractive();
      this.settingsButton.setScale(6, 3.5);
      this.add.text(350, 293, 'Settings', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
      this.settingsButton.on('pointerdown', () => {
        this.scene.start('Settings', { difficulty: this.difficulty });
      });

      // Boton de ayuda
      this.helpButton = this.add.image(400, 400, 'button').setInteractive();
      this.helpButton.setScale(6, 3.5);
      this.add.text(370, 393, 'Help', { fontFamily: 'myFont', fontSize: '26px', color: '#ffffff' });
      this.helpButton.on('pointerdown', () => {
        //Por hacer
      });

    }
  }