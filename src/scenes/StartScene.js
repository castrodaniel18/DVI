import Phaser from "phaser";
import Level1Scene from './Level1Scene'

export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' });
    }
  
    preload() {
      this.load.css('start', 'Web/css/start.css')
    }
  
    create() {
        // Titulo del juego
        const title = document.createElement('h1');
        title.textContent = 'Folklore Hunters';
        title.classList.add('title');
        this.add.dom(400, 100, title);

        // Boton de comenzar juego
        const buttonStart = document.createElement('div');
        buttonStart.textContent = 'Start Game';
        buttonStart.classList.add('button');
        this.add.dom(400, 200, buttonStart);
        buttonStart.addEventListener('click', () => {
            this.scene.start('Level1Scene');
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