import Phaser from "phaser";
import Level1Scene from './Level1Scene'

export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'characterSelection' });
    }
  
    preload() {

    }
  
    create() {
        // crea un grupo de botones para cada personaje disponible
        const characters = ['personaje1', 'personaje2', 'personaje3'];
        const buttonGroup = this.add.group();
        
        characters.forEach((character, index) => {
            const button = this.add.image(0, index * 100, character);
            button.setInteractive();
            button.on('pointerdown', () => {
            // al hacer clic en el botón, guarda el personaje seleccionado y cambia a la escena del juego
            this.scene.start('Level1Scene', { character: character });
            });
            buttonGroup.add(button);
        });
        
        // centra los botones en la pantalla
        // @ts-ignore
        Phaser.Actions.Center(buttonGroup.getChildren(), this.add.zone(400, 300, 800, 600));
    }
  }