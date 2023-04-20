import Phaser from "phaser";
import Character1, {CHARACTER_1_NAME, CHARACTER_1_SELECTION, CHARACTER_1_SPRITE_NAME, CHARACTER_1_SPRITE} from "../objects/Characters/Character1";
import Character2, {CHARACTER_2_NAME, CHARACTER_2_SELECTION, CHARACTER_2_SPRITE_NAME, CHARACTER_2_SPRITE} from "../objects/Characters/Character2";
import Character3, {CHARACTER_3_NAME, CHARACTER_3_SELECTION, CHARACTER_3_SPRITE_NAME, CHARACTER_3_SPRITE} from "../objects/Characters/Character3";

const CHARACTER_NAMES = [CHARACTER_1_NAME, CHARACTER_2_NAME, CHARACTER_3_NAME];
const CHARACTERS = [Character1, Character2, Character3];
const CHARACTER_SPRITES = [CHARACTER_1_SPRITE_NAME, CHARACTER_2_SPRITE_NAME, CHARACTER_3_SPRITE_NAME]

export default class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'characterSelection' });
    }
  
    preload() {
      this.load.image('fondo','assets/elements/fondo.png');
      this.load.image(CHARACTER_1_NAME, CHARACTER_1_SELECTION);
      this.load.spritesheet(CHARACTER_1_SPRITE_NAME, CHARACTER_1_SPRITE,{frameWidth:16, frameHeight:16});
      this.load.image(CHARACTER_2_NAME, CHARACTER_2_SELECTION);
      this.load.spritesheet(CHARACTER_2_SPRITE_NAME, CHARACTER_2_SPRITE,{frameWidth:16, frameHeight:16});
      this.load.image(CHARACTER_3_NAME, CHARACTER_3_SELECTION);
      this.load.spritesheet(CHARACTER_3_SPRITE_NAME, CHARACTER_3_SPRITE,{frameWidth:16, frameHeight:16});
    }
  
    create() {
      let bg = this.add.image(0,0,'fondo').setOrigin(0,0);
        // crea un grupo de botones para cada personaje disponible
        const buttonGroup = this.add.group();
        CHARACTER_NAMES.forEach((character, index) => {
            const button = this.add.image(0, index * 100, character);
            button.setScale(0.30);
            button.setInteractive();
            button.on('pointerdown', () => {
            // al hacer clic en el botón, guarda el personaje seleccionado y cambia a la escena del juego
            //this.character = new CHARACTERS[index](this, CHARACTER_SPRITES[index], this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
            this.scene.start('Level1Scene', {characterName: CHARACTER_NAMES[index]});
          });
            buttonGroup.add(button);
        });

        buttonGroup.getChildren()[0].setPosition(200, 300);
        buttonGroup.getChildren()[1].setPosition(400, 300);
        buttonGroup.getChildren()[2].setPosition(600, 300);

        console.log("Pantalla selección personaje");
    }
  }