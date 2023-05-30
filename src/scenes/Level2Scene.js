import Phaser from "phaser";
import Potions from "../objects/Potions/Potions";
import Piromancer, {PIROMANCER_SPRITE_NAME, PIROMANCER_NAME} from "../objects/Characters/Piromancer";
import Electromancer, {ELECTROMANCER_SPRITE_NAME, ELECTROMANCER_NAME} from "../objects/Characters/Electromancer";
import LuminoMancer, {LUMINOMANCER_SPRITE_NAME, LUMINOMANCER_NAME} from "../objects/Characters/LuminoMancer";
import WaveController, {LEVEL_2} from "../objects/Enemies/WaveController";

export default class Level2Scene extends Phaser.Scene {
	constructor() {
		super({ key: 'Level2Scene' });
		this.enemies = [];
		this.playerItems=[];
		this.playerItemsBorder = [];
		this.itemsOnBag = [];
		this.itemImages = [];
		this.itemLevels = [];
		this.count = 0;
		this.rateDifficulty = 1;
	}

	preload() {
		this.load.spritesheet('spawn_enemy_effect', 'assets/elements/spawnEnemyAnimation.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('destroy_enemy_effect', 'assets/elements/Dark_VFX_2.png', {frameWidth: 48, frameHeight: 64});
		this.load.spritesheet('snake', 'assets/sprites/Snake/Snake_walk.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('snake_attack', 'assets/sprites/Snake/Snake_attack.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('snake_idle', 'assets/sprites/Snake/Snake_idle.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('hyena', 'assets/sprites/Hyena/Hyena_walk.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('hyena_attack', 'assets/sprites/Hyena/Hyena_attack.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('hyena_idle', 'assets/sprites/Hyena/Hyena_idle.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('scorpio', 'assets/sprites/Scorpio/Scorpio_walk.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('scorpio_attack', 'assets/sprites/Scorpio/Scorpio_attack.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('scorpio_idle', 'assets/sprites/Scorpio/Scorpio_idle.png', {frameWidth: 48, frameHeight: 48});
		this.load.spritesheet('scorpio_projectile', 'assets/elements/Scorpio_Projectile.png', {frameWidth: 32, frameHeight: 32});

		this.load.image('tileset2', 'assets/elements/tileset2.png');
        this.load.tilemapTiledJSON('tilemap2','assets/elements/tilemapLevel2.json');
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
		const map = this.make.tilemap ({ key: "tilemap2", tileWidth: 32, tileHeight: 32})
        const tileset2 = map.addTilesetImage('tileset2','tileset2')
        this.bg = map.createLayer('fondo', tileset2, 0, 0)
		this.collisionLayer = map.createLayer('colisiones', tileset2, 0, 0)
		
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		this.addCharacter();
		this.potions = new Potions(this);
		this.physics.world.setBounds(0, 0, this.bg.width, this.bg.height);
        this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height);
        this.cameras.main.startFollow(this.player);
		this.waveController = new WaveController(this, LEVEL_2);

		this.numEnemies = LEVEL_2.reduce((acc, curr) => acc + curr.numEnemies, 0)

		this.physics.add.collider(this.player,this.collisionLayer);
		this.collisionLayer.setCollision([52,53,54,68,70,84,85,86]);

		this.events=new Phaser.Events.EventEmitter();
		this.scene.launch('UIScene',{
			x:this.player.x-35,
			y:this.player.y-15,
			health:this.player.maxHealth,
			levelName:'Level2Scene',
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
			this.scene.pause()
			this.scene.run('GameOver', {difficulty: this.difficulty, characterName: this.characterName, level: 'Level2Scene'})
		}
		if(this.count == this.numEnemies) {
			this.count = 0
			this.scene.pause()
			this.scene.run('LevelCompleted', {difficulty: this.difficulty, characterName: this.characterName})
		}
	}

	addCharacter(){
		if(this.characterName === PIROMANCER_NAME)
			this.player = new Piromancer(this, PIROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
		if(this.characterName === ELECTROMANCER_NAME)
			this.player = new Electromancer(this, ELECTROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
		if(this.characterName === LUMINOMANCER_NAME)
			this.player = new LuminoMancer(this, LUMINOMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 2);
	}
}
