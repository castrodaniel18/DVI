import { Scene } from 'phaser';
import Enemy from './Enemy.js';

const GOBLIN_DAMAGE = 10;
const GOBLIN_HEALTH = 5;
const GOBLIN_SPEED = 50;
const GOBLIN_ATTACK_COOLDOWN = 2000;

export default class Goblin extends Enemy {

  /**
   * Constructor de Goblin
   * @param {Scene} scene Escena en la que aparece la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
	constructor(scene, x, y, imgKey) {
		super(scene, x, y, imgKey);
		this.setDisplaySize(50,50);
        this.health = GOBLIN_HEALTH;

        this.createAnimations();
        this.play('up_goblin');
        this.cooldown = false;
        
        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(25, 40);
        this.body.offset.set(20, 23);
		this.scene.physics.add.overlap(this.scene.player, this ,this.attack,null,this);
    }

    createAnimations(){
        this.scene.anims.create({
            key:'up_goblin',
            frames: this.scene.anims.generateFrameNumbers('goblin',{start:104,end:112}),
            frameRate: 5,
            repeat: -1
        });
    
        this.scene.anims.create({
            key:'right_goblin',
            frames: this.scene.anims.generateFrameNumbers('goblin',{start:117,end:125}),
            frameRate: 5,
            repeat: -1
        });
    
        this.scene.anims.create({
            key:'down_goblin',
            frames: this.scene.anims.generateFrameNumbers('goblin',{start:130,end:138}),
            frameRate: 5,
            repeat: -1
            });
    
        this.scene.anims.create({
            key:'left_goblin',
            frames: this.scene.anims.generateFrameNumbers('goblin',{start:143,end:151}),
            frameRate: 5,
            repeat: -1
        });
    }

    move(){
        if(Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 40)
            this.scene.physics.moveToObject(this, this.scene.player, GOBLIN_SPEED);
        else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    attack(){
        if(this.cooldown)
            return;
        this.scene.player.getHit(GOBLIN_DAMAGE);
        this.cooldown = true;
        setTimeout(() => {
            this.cooldown = false;
        }, GOBLIN_ATTACK_COOLDOWN);
    }

    enemyUpdate(){
        if (!this.isDead())
            if(this.canMove)
                this.move();
    }
}