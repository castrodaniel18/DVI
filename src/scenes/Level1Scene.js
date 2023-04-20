import Phaser from "phaser";
import Character1, {CHARACTER_1_SPRITE_NAME, CHARACTER_1_SPRITE, CHARACTER_1_NAME} from "../objects/Characters/Character1";
import Character2, {CHARACTER_2_SPRITE_NAME, CHARACTER_2_SPRITE, CHARACTER_2_NAME} from "../objects/Characters/Character2";
import Character3, {CHARACTER_3_SPRITE_NAME, CHARACTER_3_SPRITE, CHARACTER_3_NAME} from "../objects/Characters/Character3";

export default class Level1Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level1Scene' });
	}

	preload() {
		this.load.image('fondo','assets/elements/fondo.png');
	}

	init(data) {
		// guarda el personaje seleccionado en una variable
		this.characterName = data.characterName;
		this.characterSprite = data.characterSprite;
		console.log(this.characterName);
		console.log(this.characterSprite);
	}

	create() {
		let bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		this.addCharacter();
	}

	addCharacter(){
		if(this.characterName === CHARACTER_1_NAME)
			this.miCharacter = new Character1(this, CHARACTER_1_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		if(this.characterName === CHARACTER_2_NAME)
			this.miCharacter = new Character2(this, CHARACTER_2_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		if(this.characterName === CHARACTER_3_NAME)
			this.miCharacter = new Character3(this, CHARACTER_3_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
	}
}
