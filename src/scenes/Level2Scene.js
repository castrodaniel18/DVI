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
		this.load.image('fondo','assets/elements/fondo.png');
		this.load.spritesheet('spawn_enemy_effect', 'assets/elements/spawnEnemyAnimation.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('destroy_enemy_effect', 'assets/elements/Dark_VFX_2.png', {frameWidth: 48, frameHeight: 64});
		// this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
		// this.load.spritesheet('ventolin', 'assets/sprites/ventolin.png', {frameWidth: 64, frameHeight: 64});
		// this.load.spritesheet('centipede', 'assets/sprites/Centipede/Centipede_walk.png', {frameWidth: 72, frameHeight: 38});
		// this.load.spritesheet('centipede_attack_1', 'assets/sprites/Centipede/Centipede_attack2.png', {frameWidth: 72, frameHeight: 40});
		// this.load.spritesheet('centipede_attack_2', 'assets/sprites/Centipede/Centipede_attack3.png', {frameWidth: 72, frameHeight: 38});
		// this.load.spritesheet('centipede_attack_3', 'assets/sprites/Centipede/Centipede_attack4.png', {frameWidth: 72, frameHeight: 26});
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
		//this.load.image('tileset3', 'assets/elements/tileset3.png');
		//this.load.image('tileset4', 'assets/elements/tileset4.png');
		//this.load.image('tileset5', 'assets/elements/tileset5.png');
        this.load.tilemapTiledJSON('tilemap','assets/elements/tilemapLevel2.json');
		this.load.image('pauseButton', 'assets/elements/pauseButton.png');
		this.load.image('levelPanel', 'assets/elements/levelPanel.png');
		this.load.image('item','assets/elements/marco_objeto.png' );
	}

	init(data) {
		// guarda el personaje seleccionado en una variable
		this.characterName = data.characterName;
		this.difficulty = data.difficulty;
		if(this.difficulty == 'easy') this.rateDifficulty = 0.8;
		if(this.difficulty == 'hard') this.rateDifficulty = 1.2;
	}

	create() {
		//let bg = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		// Tilemap
		const map = this.make.tilemap ({ key: "tilemap", tileWidth: 32, tileHeight: 32})
        const tileset2 = map.addTilesetImage('tileset2','tileset2')
        const layer = map.createLayer('fondo', tileset2, 0, 0)
		const layer2 = map.createLayer('agua', tileset2, 0, 0)
		
		// Agrega el personaje a la escena y establece su posición en el centro de la cámara principal
		this.addCharacter();
		this.potions = new Potions(this);
		this.physics.world.setBounds(0, 0, layer.width, layer.height);
        this.cameras.main.setBounds(0, 0, layer.width, layer.height);
        this.cameras.main.startFollow(this.player);
		this.waveController = new WaveController(this, LEVEL_2);
		//Marco para nivel
		this.levelDecoration = this.add.image(140, 30, 'levelPanel');
		this.levelDecoration.setScale(.8, .35);
		//Objetos del jugador
		this.playerItemsBorder[0] = this.add.image(50, 100,'item');
		this.playerItemsBorder[1] = this.add.image(100, 100,'item');

		this.numEnemies = LEVEL_2.reduce((acc, curr) => acc + curr.numEnemies, 0)

		//Botón de pausa
		this.pauseButton = this.add.image(750, 25, 'pauseButton').setInteractive();
		this.pauseButton.setScale(2);
		this.pauseButton.on('pointerdown', () => {
            this.scene.pause();
			this.scene.run('PauseScene', { difficulty: this.difficulty, actualScene: 'Level2Scene'});
        });
		this.events=new Phaser.Events.EventEmitter();
		this.scene.launch('healthBar',{
			x:this.player.x - 35,
			y:this.player.y - 15,
			health:this.player.maxHealth,
			levelName:'Level2Scene'});
		
	}


	update(){
		this.player.update();
		this.waveController.update();
		this.potions.trySpawn();
		let playerData = { health: this.player.health, x: this.player.x - 35, y: this.player.y - 15}; // Create object containing player data
    	this.events.emit('updatePlayerData', playerData);
		if (this.player.isDead) {
			this.scene.pause()
			this.scene.start('GameOver', {difficulty: this.difficulty, characterName: this.characterName, level: 'Level2Scene'})
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
		//this.healthBar = new HealthBar(this, this.player.x, this.player.y);
	}
}
