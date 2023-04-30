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
		this.playerItemsImages = [];
		this.itemsOnBag = Array[2];
	}
<<<<<<< HEAD
    preload(){
        this.load.spritesheet('healthBar', 'assets/elements/health.png',{frameWidth:640, frameHeight:128})
        this.load.spritesheet('player1','assets/sprites/player1.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('player2','assets/sprites/player2.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('player3','assets/sprites/player3.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('fireball', 'assets/elements/fireball.png', {frameWidth: 25.6, frameHeight: 25.5});
        this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('potion', 'assets/elements/potion.png', {frameWidth: 128, frameHeight: 128});
        this.load.image('fondo','assets/elements/fondo.png');
        this.load.image('tileset', 'assets/elements/TileSet2.png')
        this.load.tilemapTiledJSON('tilemap','assets/elements/TileMap.json')
    }
=======
>>>>>>> 32e93ae849cb83adf1c52a3381aaf8456016497e

	preload() {
		this.load.image('fondo','assets/elements/fondo.png');
		this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('ventolin', 'assets/sprites/ventolin.png', {frameWidth: 64, frameHeight: 64});
		this.load.image('pauseButton', 'assets/elements/pauseButton.png');
		this.load.image('levelPanel', 'assets/elements/levelPanel.png');
		this.load.image('item','assets/elements/marco_objeto.png' );
	}

<<<<<<< HEAD
    create(){
        const map = this.make.tilemap ({ key: "tilemap", tileWidth: 32, tileHeight: 32})
        const tileset = map.addTilesetImage('tileset','tileset')
        const layer = map.createLayer('Fondo', tileset, 0, 0)
        
        //Creamos al personaje pasándole sus estadísticas según personaje que eligiéramos en la pantalla de selección
        if (this.selectedCharacter == 'personaje1'){
            this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'player1', 150, 100)
            this.fireballGroup = new FireballGroup(this, 15);
        }
        else if (this.selectedCharacter == 'personaje2'){
            this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'player2', 100, 150)
            this.fireballGroup = new FireballGroup(this, 15);
        }
        else if (this.selectedCharacter == 'personaje3'){
            this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'player3', 100, 100)
            this.fireballGroup = new FireballGroup(this, 20);
        }
        console.log('speed = ' + this.player.speed);
        console.log('health = ' + this.player.health);
        console.log('fireballs = ' + this.fireballGroup.getLength());

        this.healthBar = new HealthBar(this,this.player.x,this.player.y -35) 
        this.goblinGroup = new GoblinGroup(this)
        this.potion = new Potion(this, 800, 600,'damage');
        this.physics.world.setBounds(0, 0, 1280, 1280);
        this.cameras.main.setBounds(0, 0, 1280, 1280);
=======
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
>>>>>>> 32e93ae849cb83adf1c52a3381aaf8456016497e
        this.cameras.main.startFollow(this.player);
		this.waveController = new WaveController(this, LEVEL_1);
		//Marco para nivel
		this.levelDecoration = this.add.image(140, 30, 'levelPanel');
		this.levelDecoration.setScale(.8, .35);
		//Objetos del jugador
		this.playerItems[0] = this.add.image(50, 100,'item');
		this.playerItems[1] = this.add.image(100, 100,'item');
		this.playerItems[0].setScale(.8, .35);
		this.playerItems[1].setScale(.8, .35);
		//Botón de pausa
		this.pauseButton = this.add.image(750, 25, 'pauseButton').setInteractive();
		this.pauseButton.setScale(2);
		this.pauseButton.on('pointerdown', () => {
            this.scene.pause();
			this.scene.run('PauseScene', { difficulty: this.difficulty});
        });
	}


	update(){
		this.player.update();
		this.waveController.update();
		this.potions.trySpawn();
	}

	addCharacter(){
		if(this.characterName === PIROMANCER_NAME)
			this.player = new Piromancer(this, PIROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2,this.playerItems.length);
		if(this.characterName === ELECTROMANCER_NAME)
			this.player = new Electromancer(this, ELECTROMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2,this.playerItems.length);
		if(this.characterName === LUMINOMANCER_NAME)
			this.player = new LuminoMancer(this, LUMINOMANCER_SPRITE_NAME, this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2,this.playerItems.length);
		this.healthBar = new HealthBar(this, this.player.x, this.player.y);
	}
}
