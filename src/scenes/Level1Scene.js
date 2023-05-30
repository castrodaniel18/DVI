import Phaser from "phaser";
import Potions from "../objects/Potions/Potions";
import Piromancer, {PIROMANCER_SPRITE_NAME, PIROMANCER_NAME} from "../objects/Characters/Piromancer";
import Electromancer, {ELECTROMANCER_SPRITE_NAME, ELECTROMANCER_NAME} from "../objects/Characters/Electromancer";
import LuminoMancer, {LUMINOMANCER_SPRITE_NAME, LUMINOMANCER_NAME} from "../objects/Characters/LuminoMancer";
import WaveController, {LEVEL_1} from "../objects/Enemies/WaveController";
export default class Level1Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level1Scene'});
		this.enemies = [];
		this.gameOver = false;
		this.count = 0;
		this.rateDifficulty = 1;
	}

	preload() {
		this.load.spritesheet('spawn_enemy_effect', 'assets/elements/spawnEnemyAnimation.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('destroy_enemy_effect', 'assets/elements/Dark_VFX_2.png', {frameWidth: 48, frameHeight: 64});
		this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('ventolin', 'assets/sprites/ventolin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('centipede', 'assets/sprites/Centipede/Centipede_walk.png', {frameWidth: 72, frameHeight: 38});
		this.load.spritesheet('centipede_attack_1', 'assets/sprites/Centipede/Centipede_attack2.png', {frameWidth: 72, frameHeight: 40});
		this.load.spritesheet('centipede_attack_2', 'assets/sprites/Centipede/Centipede_attack3.png', {frameWidth: 72, frameHeight: 38});
		this.load.spritesheet('centipede_attack_3', 'assets/sprites/Centipede/Centipede_attack4.png', {frameWidth: 72, frameHeight: 26});
		this.load.spritesheet('centipede_death', 'assets/sprites/Centipede/Centipede_death.png', {frameWidth: 72, frameHeight: 72});

		this.load.image('tileset2', 'assets/elements/tileset2.png')
		this.load.image('tileset5', 'assets/elements/tileset5.png')
        this.load.tilemapTiledJSON('tilemap','assets/elements/tilemap.json')
	
	}

	init(data) {
		// guarda el personaje seleccionado en una variable
		this.characterName = data.characterName;
		this.difficulty = data.difficulty;
		if(this.difficulty == 'easy') this.rateDifficulty = 0.8;
		if(this.difficulty == 'hard') this.rateDifficulty = 1.2;
	}

	create() {
				// Tilemap
		let map = this.make.tilemap ({ key: "tilemap", tileWidth: 32, tileHeight: 32})
        let tileset2 = map.addTilesetImage('tileset2','tileset2')
		let tileset5 = map.addTilesetImage('tileset5','tileset5')
        let bg = map.createLayer('fondo', tileset2, 0, 0)
		this.collisionLayer = map.createLayer('colisiones', tileset2, 0, 0)
	
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		this.addCharacter();
		this.potions = new Potions(this);
		this.physics.world.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.startFollow(this.player);
		this.waveController = new WaveController(this, LEVEL_1);
		

		this.numEnemies = LEVEL_1.reduce((acc, curr) => acc + curr.numEnemies, 0)
		
		this.physics.add.collider(this.player,this.collisionLayer);
		this.collisionLayer.setCollision([238,239,251,252,254,255])

		this.events=new Phaser.Events.EventEmitter();
		this.scene.launch('UIScene',{
			x:this.player.x-35,
			y:this.player.y-15,
			health:this.player.maxHealth,
			levelName:'Level1Scene',
			playerLevel:this.player.playerLevel,
			playerExp:this.player.playerExp,
			inventorySize:this.player.inventorySize
		});
	}


	update(){
		this.player.update();
		this.waveController.update();
		this.potions.trySpawn();
		let playerData = { health: this.player.health, x: this.player.x-35, y: this.player.y-15, canDash:this.player.canDash, playerLevel:this.player.playerLevel, playerExp:this.player.playerExp };
    	this.events.emit('updatePlayerData', playerData);
		if (this.player.isDead) {
			this.scene.pause();
			this.scene.run('GameOver', {difficulty: this.difficulty, characterName: this.characterName, level: 'Level1Scene'})
		}
		if(this.count == this.numEnemies) {
			this.count = 0
			this.scene.pause()
			this.scene.run('LevelCompleted', {difficulty: this.difficulty, characterName: this.characterName,level: 'Level1Scene'})
		}
	}

	addCharacter(){
		if(this.characterName === PIROMANCER_NAME)
			this.player = new Piromancer(this, PIROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2,2);
		if(this.characterName === ELECTROMANCER_NAME)
			this.player = new Electromancer(this, ELECTROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
		if(this.characterName === LUMINOMANCER_NAME)
			this.player = new LuminoMancer(this, LUMINOMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
	}
}
