import Phaser from "phaser";
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
        let bg = this.add.image(0,0,'fondo').setOrigin(0,0);
        //align.scaleToGameW(bg, 2);
        let player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2);
        this.physics.world.setBounds(0,0,bg.width,bg.height);
        this.cameras.main.setBounds(0, 0, bg.width+500, bg.height);
        console.log(bg.width)
        this.cameras.main.startFollow(player);
        
    }
}