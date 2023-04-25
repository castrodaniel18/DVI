import Phaser from "phaser";

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
  
    create() {
        this.music = this.sound.add('music');
        if (!this.musicEnabled){
          this.music.play();
        }

        // Titulo del juego
        const title = document.createElement('h1');
        title.textContent = 'Main Menu';
        title.classList.add('title');
        this.add.dom(400, 100, title);

        // Boton de comenzar juego
        const buttonStart = document.createElement('div');
        buttonStart.textContent = 'Start Game';
        buttonStart.classList.add('button');
        this.add.dom(400, 200, buttonStart);
        buttonStart.addEventListener('click', () => {
            this.scene.start('characterSelection');
        });

        // Boton de opciones
        const buttonSettings = document.createElement('div');
        buttonSettings.textContent = 'Settings';
        buttonSettings.classList.add('button');
        this.add.dom(400, 250, buttonSettings);
        buttonSettings.addEventListener('click', () => {
          this.scene.start('Settings', { difficulty: this.difficulty });
        });

        // Boton de ayuda
        const buttonHelp = document.createElement('div');
        buttonHelp.textContent = 'Help';
        buttonHelp.classList.add('button');
        this.add.dom(400, 300, buttonHelp);
        buttonHelp.addEventListener('click', () => {
            // To Do
        });

    }
  }