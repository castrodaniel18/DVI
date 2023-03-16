import Phaser from "phaser";
import Goblin from "../Goblin";
import Player from "../objects/Player";

export default class Level1Scene extends Phaser.Scene{
    constructor() {
		super('level1')
	}
    preload(){
        this.load.spritesheet('player','assets/loose sprites.png',{frameWidth:16, frameHeight:16});
        this.load.image('fondo','assets/fondo.png');
    }
    create(){
        this.add.image(0,0,'fondo').setOrigin(0,0);
        let player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2)
        
        this.cameras.main.startFollow(this.player);
    }

    enemyFollows () {
		this.physics.moveToObject(this.goblin, this.player, 100);
	}

	update(){
		this.enemyFollows();
	}
}