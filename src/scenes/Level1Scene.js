import Phaser from "phaser";
import Character1, {CHARACTER_1_SPRITE_NAME, CHARACTER_1_NAME} from "../objects/Characters/Character1";
import Character2, {CHARACTER_2_SPRITE_NAME, CHARACTER_2_NAME} from "../objects/Characters/Character2";
import Character3, {CHARACTER_3_SPRITE_NAME, CHARACTER_3_NAME} from "../objects/Characters/Character3";
import HealthBar from "../objects/Characters/healthBar";
import Goblin from "../objects/Enemies/Goblin";
import GoblinsGroup from "../objects/Enemies/GoblinsGroup";
import Potions from "../objects/Potions/Potions";
import ExperiencePointGroup from "../objects/misc/ExperiencePointGroup";

export default class Level1Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level1Scene' });
		this.enemies = [];
	}

	preload() {
		this.load.image('fondo','assets/elements/fondo.png');
		this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('fireball', 'assets/elements/fireball.png', {frameWidth: 25.6, frameHeight: 25.5});
	}

	init(data) {
		// guarda el personaje seleccionado en una variable
		this.characterName = data.characterName;
	}

	create() {
		let bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		this.addCharacter();
		//this.goblin = new Goblin(this, 50, 50, 'goblin');
		this.potions = new Potions(this);
		this.goblinsGroup = new GoblinsGroup(this);
		this.physics.world.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.startFollow(this.player);
		
	}

	update(){
		this.player.update();
		this.goblinsGroup.enemyUpdate();
		this.potions.trySpawn();
	}

	addCharacter(){
		if(this.characterName === CHARACTER_1_NAME)
			this.player = new Character1(this, CHARACTER_1_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		if(this.characterName === CHARACTER_2_NAME)
			this.player = new Character2(this, CHARACTER_2_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		if(this.characterName === CHARACTER_3_NAME)
			this.player = new Character3(this, CHARACTER_3_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		this.healthBar = new HealthBar(this, this.player.x, this.player.y);
	}
}
