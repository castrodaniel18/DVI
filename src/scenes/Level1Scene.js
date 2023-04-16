import Phaser from "phaser";
import Character from "../objects/Characters/Character"
import Character1, {CHARACTER_1_NAME, CHARACTER_1_SELECTION, CHARACTER_1_SPRITE_NAME, CHARACTER_1_SPRITE} from "../objects/Characters/Character1";
import Character2 from "../objects/Characters/Character2"
import Character3 from "../objects/Characters/Character3"

export default class Level1Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level1Scene' });
	}

	preload() {
		this.load.image('fondo','assets/elements/fondo.png');
		this.load.spritesheet(CHARACTER_1_SPRITE_NAME, CHARACTER_1_SPRITE,{frameWidth:16, frameHeight:16});
	}

	init(data) {
		// guarda el personaje seleccionado en una variable
		this.character = data.character;
		console.log(this.character);
	}

	create() {
		let bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		console.log("CREATE"+ this.character);
		this.add.existing(this.character);
	}
}
