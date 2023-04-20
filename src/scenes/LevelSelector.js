import Phaser from "phaser";
import Level1Scene from './Level1Scene'

export default class LevelSelector extends Phaser.Scene {
    constructor() {
      super({ key: 'LevelSelector' });
    }
  
    preload() {
      this.load.image('map','assets/elements/spainMap.png');
      this.load.image('button1', 'assets/elements/greenButton.png');
      this.load.image('button2', 'assets/elements/greenButton.png');
    }

    init(data) {
        // guarda el personaje seleccionado en una variable
        this.selectedCharacter = data.character;
    }
  
    create() {
        var background = this.add.image(0, 0, 'map');
        background.setScale(800 / background.width, 600 / background.height);
        background.setOrigin(0, 0);

        var button1 = this.add.image(200, 200, 'button1');
        button1.setScale(0.05);
        button1.setPosition(100, 75);
        button1.setInteractive();
        button1.on('pointerdown', function() {
            this.scene.start('Level1Scene', { character: this.selectedCharacter });
        }, this);

        var text1 = this.add.text(button1.x, button1.y + 10, 'Nivel 1:\nAsturias', { font: '16px Arial', fill: '#0A0A0A' });
        text1.setOrigin(0.5, 0);

        var button2 = this.add.image(600, 200, 'button2');
        button2.setScale(0.05);
        button2.setInteractive();
        button2.on('pointerdown', function() {
            //this.scene.start('Scene2');
            console.log("Se entra a nivel 2");
        }, this);

        var text2 = this.add.text(button2.x, button2.y + 10, 'Nivel 2:\nGalicia', { font: '16px Arial', fill: '#0A0A0A' });
        text2.setOrigin(0.5, 0);

        console.log("Pantalla selección nivel");
    }
  }