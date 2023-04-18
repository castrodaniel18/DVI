import Phaser from "phaser";
import LevelSelector from "./LevelSelector";

export default class CharacterSelection extends Phaser.Scene {
    constructor() {
      super({ key: 'characterSelection' });
    }
  
    preload() {
      this.load.image('fondo','assets/elements/fondo.png');
      this.load.image('personaje1', 'assets/elements/playerSelection1.png');
      this.load.image('personaje2', 'assets/elements/playerSelection2.png');
      this.load.image('personaje3', 'assets/elements/playerSelection3.png');
    }
  
    create() {
      let bg = this.add.image(0,0,'fondo').setOrigin(0,0);

        // crea un grupo de botones para cada personaje disponible
        const characters = ['personaje1', 'personaje2', 'personaje3'];
        const buttonGroup = this.add.group();
        
        characters.forEach((character, index) => {
            const button = this.add.image(0, index * 100, character);
            button.setScale(0.30);
            button.setInteractive();
            button.on('pointerdown', () => {
            // al hacer clic en el botón, guarda el personaje seleccionado y cambia a la escena del juego
            this.scene.start('LevelSelector', { character: character });
            });
            buttonGroup.add(button);
        });

        buttonGroup.getChildren()[0].setPosition(200, 300);
        buttonGroup.getChildren()[1].setPosition(400, 300);
        buttonGroup.getChildren()[2].setPosition(600, 300);

        console.log("Pantalla selección personaje");
    }
  }