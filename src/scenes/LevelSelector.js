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
      this.load.image('buttonGalicia', 'assets/elements/Galicia.png');
      this.load.image('buttonAsturias', 'assets/elements/Asturias.png');
    }

    init(data) {
        // guarda el personaje seleccionado en una variable
        this.characterName = data.characterName;
        this.difficulty = data.difficulty;
    }
  
    create() {
        var background = this.add.image(0, 0, 'map');
        background.setScale(800 / background.width, 600 / background.height);
        background.setOrigin(0, 0);

        var buttonGalicia = this.add.image(200, 200, 'buttonGalicia');
        buttonGalicia.setScale(0.27);
        buttonGalicia.setPosition(232, 76);
        buttonGalicia.setInteractive();
        buttonGalicia.setAlpha(0.5);
        buttonGalicia.on('pointerdown', function() {
          this.scene.start('Level2Scene', { characterName: this.characterName, difficulty: this.difficulty });
        }, this);

        buttonGalicia.on('pointerover', function () {
          // Crea la animación tween
          this.tweens.add({
            targets: buttonGalicia,
            scaleX: 0.28, // Escala horizontal del botón
            scaleY: 0.28, // Escala vertical del botón
            alpha: 0.7, // Cambia la opacidad del botón a 0.7
            duration: 200, // Duración de la animación en milisegundos
            ease: 'Linear' // Tipo de interpolación de la animación
          });

        }, this);

        // Agrega un evento de puntero fuera del botón
        buttonGalicia.on('pointerout', function () {

          // Crea la animación tween inversa
          this.tweens.add({
            targets: buttonGalicia,
            scaleX: 0.27, // Escala horizontal del botón de regreso al valor original
            scaleY: 0.27, // Escala vertical del botón de regreso al valor original
            alpha: 0.5, // Cambia la opacidad del botón a 0.7
            duration: 200, // Duración de la animación en milisegundos
            ease: 'Linear' // Tipo de interpolación de la animación
          });

        }, this);

        var buttonAsturias = this.add.image(200, 200, 'buttonAsturias');
        buttonAsturias.setScale(0.15);
        buttonAsturias.setPosition(326, 38);
        buttonAsturias.setInteractive();
        buttonAsturias.setAlpha(0.5);
        buttonAsturias.on('pointerdown', function() {
            this.scene.start('Level1Scene', { characterName: this.characterName, difficulty: this.difficulty });
        }, this);

        buttonAsturias.on('pointerover', function () {
          // Crea la animación tween
          this.tweens.add({
            targets: buttonAsturias,
            scaleX: 0.16, // Escala horizontal del botón
            scaleY: 0.16, // Escala vertical del botón
            alpha: 0.7, // Cambia la opacidad del botón a 0.7
            duration: 200, // Duración de la animación en milisegundos
            ease: 'Linear' // Tipo de interpolación de la animación
          });

        }, this);

        // Agrega un evento de puntero fuera del botón
        buttonAsturias.on('pointerout', function () {

          // Crea la animación tween inversa
          this.tweens.add({
            targets: buttonAsturias,
            scaleX: 0.15, // Escala horizontal del botón de regreso al valor original
            scaleY: 0.15, // Escala vertical del botón de regreso al valor original
            alpha: 0.5, // Cambia la opacidad del botón a 0.7
            duration: 200, // Duración de la animación en milisegundos
            ease: 'Linear' // Tipo de interpolación de la animación
          });

        }, this);
    }
  }