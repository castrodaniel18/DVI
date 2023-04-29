import { Scene } from "phaser";

const SCALE = 0.12;
const KEY_STEPS = 10;
const KEYS = 10;

export default class HealthBar extends Phaser.GameObjects.Sprite{
/** 
*  @param {Scene} scene - escena en la que aparece
*  @param {number} x - coordenada x de spawn
*  @param {number} y - coordeada y de spawn
*/
    constructor(scene,x,y){
        super(scene,x,y,"healthbar");
        this.scene.add.existing(this);   
        this.setScale(SCALE)
        this.scene.anims.create({
            key:'100',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:0,end:0}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'90',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:1,end:1}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'80',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:2,end:2}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'70',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:3,end:3}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'60',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:4,end:4}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'50',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:5,end:5}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'40',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:6,end:6}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'30',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:7,end:7}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'20',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:8,end:8}),
            repeat: -1
        });
        this.scene.anims.create({
            key:'10',
            frames: scene.anims.generateFrameNumbers('healthBar',{start:9,end:9}),
            repeat: -1
        });    
        this.play('100');
    }
    updateHealth() {
        this.x = this.scene.player.x;
        this.y = this.scene.player.y - 35;
        this.play(String(this.scene.player.health));
    }

    playerDie() {
        this.destroy()
    }
}