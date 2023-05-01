import { Scene } from 'phaser';
import Enemy from './Enemy.js';
import ScorpioProjectileGroup from '../Projectiles/ScorpioProjectileGroup.js';

const SCORPIO_DAMAGE = 10;
const SCORPIO_HEALTH = 5;
const SCORPIO_WEAPON = ScorpioProjectileGroup;
const SCORPIO_PROJECTILES = 1;
const SCORPIO_SPEED = 80;
const SCORPIO_ATTACK_COOLDOWN = 2000;
const SCORPIO_ATTACK_TIME = 3000;
const SCORPIO_CHARGE_COLOR = '0x000000';
export default class Scorpio extends Enemy {

  /**
   * Constructor de Scorpio
   * @param {Scene} scene Escena en la que aparece la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
	constructor(scene, x, y, imgKey) {
		super(scene, x, y, imgKey);
        this.health = SCORPIO_HEALTH;
        this.sprite = imgKey;

        this.createAnimations();
        this.play('scorpio');

        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(25, 40);
        this.body.offset.set(20, 23);
        this.cooldown = false;
        this.addWeapon(scene);
    }

    createAnimations(){
        this.scene.anims.create({
            key:'scorpio',
            frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'scorpio_attack',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_attack',{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'scorpio_idle',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_idle',{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
    }

    checkAnimation(){
        if((!this.attackAnim || this.charging) && this.scene.player.x > this.x)
            this.flip = true;
        else
            this.flip = false;

        if(this.attackAnim && !this.charging)
            return 'scorpio_attack';
        else if(this.body.velocity.x === 0 && this.body.velocity.y === 0)
            return 'scorpio_idle';
        return 'scorpio';
    }

    move(){
        if(Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 140)
            this.scene.physics.moveToObject(this, this.scene.player, SCORPIO_SPEED);
        else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    shoot(){
        this.weapon.shoot(this);
    }

    attack(){
        const scene = this.scene;
        this.attackAnim = true
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.canMove = false;
        this.cooldown = true;
        this.charging = true;
        this.hasHitPlayer = false;
        // Parpadear el personaje
        this.blinking = setInterval(() => {
            if(this.blink)
                this.setTint(SCORPIO_CHARGE_COLOR);
            else
                this.clearTint();
            this.blink = !this.blink;
        }, 100);
        
        // Detener el parpadeo después de 2 segundos
        setTimeout(() => {
            clearInterval(this.blinking);
            this.clearTint();
            this.charging = false;
            this.blink = true;
            this.shoot();
        }, 2000);
        setTimeout(() => {
            this.canMove = true;
            this.attackAnim = false;
            this.setRotation(0);
        }, 4000);
        setTimeout(() => {
            this.cooldown = false;
        }, 6000);
    }

    hitPlayer(){
        if(!this.cooldown && !this.attackAnim)
            this.scene.player.getHit(SCORPIO_DAMAGE);
        else if (this.attackAnim && !this.hasHitPlayer){
            this.scene.player.getHit(SCORPIO_DAMAGE);
            this.hasHitPlayer = true;
        }
    }

    enemyUpdate(){
        if (!this.isDead()){
            const rand = Math.random();

            if (!this.cooldown && Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 160 && rand < 0.03)
                this.attack();
            else if(this.canMove)
                this.move();
            if(this.charging){
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }
    }

    addWeapon(scene){
        this.weapon = new SCORPIO_WEAPON(scene, SCORPIO_PROJECTILES);
    }
    
    isDead(){
        return this.health < 0;
    }
}