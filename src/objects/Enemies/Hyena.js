import { Scene } from 'phaser';
import Enemy from './Enemy.js';

const HYENA_DAMAGE = 10;
const HYENA_HEALTH = 5;
const HYENA_SPEED = 80;
const HYENA_ATTACK_COOLDOWN = 2000;
const HYENA_ATTACK_TIME = 3000;
export default class Hyena extends Enemy {

  /**
   * Constructor de Hyena
   * @param {Scene} scene Escena en la que aparece la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
	constructor(scene, x, y, imgKey) {
		super(scene, x, y, imgKey);
        this.health = HYENA_HEALTH;
        this.sprite = imgKey;

        this.createAnimations();
        this.play('hyena');

        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(25, 40);
        this.body.offset.set(20, 23);
        this.cooldown = false;
		this.scene.physics.add.overlap(this.scene.player, this ,this.attack,null,this);
    }

    createAnimations(){
        this.scene.anims.create({
            key:'hyena',
            frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:0,end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'hyena_attack',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_attack',{start:0,end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'hyena_idle',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_idle',{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
    }

    checkAnimation(){
        if(this.scene.player.x > this.x)
            this.flip = true;
        else
            this.flip = false;

        if(this.attackAnim)
            return 'hyena_attack';
        else if(this.body.velocity.x === 0 && this.body.velocity.y === 0)
            return 'hyena_idle';
        return 'hyena';
    }

    move(){
        if(Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 40)
            this.scene.physics.moveToObject(this, this.scene.player, HYENA_SPEED);
        else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    attack(){
        if(this.cooldown)
            return;
        this.scene.player.getHit(HYENA_DAMAGE);
        this.cooldown = true;
        this.attackAnim = true;
        setTimeout(() => {
            this.attackAnim = false;
        }, HYENA_ATTACK_TIME);
        setTimeout(() => {
            this.cooldown = false;
        }, HYENA_ATTACK_COOLDOWN);
    }

    isDead(){
        return this.health < 0;
    }

    enemyUpdate(){
        if (!this.isDead())
            if(this.canMove)
                this.move();
    }
}