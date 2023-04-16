import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
    }
  
    preload() {
      this.load.css('start', 'web/css/start.css')
    }
  
    create() {
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
            // To Do
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