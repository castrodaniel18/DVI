import Phaser from "phaser";
import HealthBar from "../objects/Characters/HealthBar";
import Potions from "../objects/Potions/Potions";
import Piromancer, {PIROMANCER_SPRITE_NAME, PIROMANCER_NAME} from "../objects/Characters/Piromancer";
import Electromancer, {ELECTROMANCER_SPRITE_NAME, ELECTROMANCER_NAME} from "../objects/Characters/Electromancer";
import LuminoMancer, {LUMINOMANCER_SPRITE_NAME, LUMINOMANCER_NAME} from "../objects/Characters/LuminoMancer";
import WaveController, {LEVEL_1} from "../objects/Enemies/WaveController";

export default class Level1Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level1Scene' });
		this.enemies = [];
		this.playerItems=[];
		this.playerItemsBorder = [];
		this.itemsOnBag = [];
		this.itemImages = [];
		this.itemLevels = [];
	}

	preload() {
		this.load.image('fondo','assets/elements/fondo.png');
		this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('ventolin', 'assets/sprites/ventolin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('centipede', 'assets/sprites/Centipede/Centipede_walk.png', {frameWidth: 72, frameHeight: 72})
		this.load.image('pauseButton', 'assets/elements/pauseButton.png');
		this.load.image('levelPanel', 'assets/elements/levelPanel.png');
		this.load.image('item','assets/elements/marco_objeto.png' );
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
		this.potions = new Potions(this);
		this.physics.world.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.startFollow(this.player);
		this.waveController = new WaveController(this, LEVEL_1);
		//Marco para nivel
		this.levelDecoration = this.add.image(140, 30, 'levelPanel');
		this.levelDecoration.setScale(.8, .35);
		//Objetos del jugador
		this.playerItemsBorder[0] = this.add.image(50, 100,'item');
		this.playerItemsBorder[1] = this.add.image(100, 100,'item');
		this.playerItemsBorder[0].setScale(.8, .35);
		this.playerItemsBorder[1].setScale(.8, .35);

		

		//Botón de pausa
		this.pauseButton = this.add.image(750, 25, 'pauseButton').setInteractive();
		this.pauseButton.setScale(2);
		this.pauseButton.on('pointerdown', () => {
            this.scene.pause();
			this.scene.run('PauseScene', { difficulty: this.difficulty});
        });

		//Botón para probar escena subida de nivel
		this.prueba = this.add.image(400, 300, 'pauseButton').setInteractive();
		this.prueba.setScale(2);
		this.prueba.on('pointerdown', () => {
            this.scene.pause();
			this.scene.run('ItemSelectScene', { mainScene: this});
        });
	}


	update(){
		this.player.update();
		this.waveController.update();
		this.potions.trySpawn();
	}

	addCharacter(){
		if(this.characterName === PIROMANCER_NAME)
			this.player = new Piromancer(this, PIROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
		if(this.characterName === ELECTROMANCER_NAME)
			this.player = new Electromancer(this, ELECTROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
		if(this.characterName === LUMINOMANCER_NAME)
			this.player = new LuminoMancer(this, LUMINOMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
		this.healthBar = new HealthBar(this, this.player.x, this.player.y);
	}
}
