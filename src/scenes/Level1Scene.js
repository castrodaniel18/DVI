import Phaser from "phaser";
import Character1, {CHARACTER_1_SPRITE_NAME, CHARACTER_1_NAME} from "../objects/Characters/Character1";
import Character2, {CHARACTER_2_SPRITE_NAME, CHARACTER_2_NAME} from "../objects/Characters/Character2";
import Character3, {CHARACTER_3_SPRITE_NAME, CHARACTER_3_NAME} from "../objects/Characters/Character3";
import HealthBar from "../objects/Characters/HealthBar";
import Goblin from "../objects/Enemies/Goblin";
import GoblinsGroup from "../objects/Enemies/GoblinsGroup";
import Ventlon from "../objects/Enemies/GoblinsGroup"
import VentolinGroup from "../objects/Enemies/VentolinGroup"
import Potions from "../objects/Potions/Potions";
import ExperiencePointGroup from "../objects/misc/ExperiencePointGroup";
import Piromancer, {PIROMANCER_SPRITE_NAME, PIROMANCER_NAME} from "../objects/Characters/Piromancer";
import Electromancer, {ELECTROMANCER_SPRITE_NAME, ELECTROMANCER_NAME} from "../objects/Characters/Electromancer";
import LuminoMancer, {LUMINOMANCER_SPRITE_NAME, LUMINOMANCER_NAME} from "../objects/Characters/LuminoMancer";

export default class Level1Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level1Scene' });
		this.enemies = [];
	}

	preload() {
		this.load.image('fondo','assets/elements/fondo.png');
		this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('ventolin', 'assets/sprites/ventolin.png', {frameWidth: 64, frameHeight: 64})
		this.load.image('pauseButton', 'assets/elements/pauseButton.png');
		this.load.image('levelPanel', 'assets/elements/levelPanel.png');
	}

	init(data) {
		// guarda el personaje seleccionado en una variable
		this.characterName = data.characterName;
		this.difficulty = data.difficulty;
	}

	create() {
		let bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		this.addCharacter();
		//this.player = new Piromancer(this, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'piromancer', 'character1', 100, 20, 100);
		this.potions = new Potions(this);
		this.enemies = [];
		this.addEnemies();
		this.physics.world.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.startFollow(this.player);

		//Marco para nivel
		this.levelDecoration = this.add.image(140, 30, 'levelPanel');
		this.levelDecoration.setScale(.8, .35);

		//Botón de pausa
		this.pauseButton = this.add.image(750, 25, 'pauseButton').setInteractive();
		this.pauseButton.setScale(2);
		this.pauseButton.on('pointerdown', () => {
            this.scene.pause();
			this.scene.run('PauseScene', { difficulty: this.difficulty});
        });
	}

	addEnemies(){
		this.goblinsGroup = new GoblinsGroup(this);
		this.addEnemyGroup(this.goblinsGroup);
		this.ventolinsGroup = new VentolinGroup(this);
		this.addEnemyGroup(this.ventolinsGroup);
	}

	addEnemyGroup(group){
		this.physics.add.collider(this.enemies, group.enemies);
		this.enemies.push(...group.enemies);
	}


	update(){
		this.player.update();
		this.goblinsGroup.enemyUpdate();
		this.ventolinsGroup.enemyUpdate();
		this.potions.trySpawn();
	}

	addCharacter(){
		if(this.characterName === CHARACTER_1_NAME)
			this.player = new Piromancer(this, PIROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
			//this.player = new Character1(this, CHARACTER_1_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		if(this.characterName === CHARACTER_2_NAME)
			this.player = new Electromancer(this, ELECTROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
			//this.player = new Character2(this, CHARACTER_2_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		if(this.characterName === CHARACTER_3_NAME)
			this.player = new LuminoMancer(this, LUMINOMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
			//this.player = new Character3(this, CHARACTER_3_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
		this.healthBar = new HealthBar(this, this.player.x, this.player.y);
	}
}
