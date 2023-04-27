import { Scene } from 'phaser';
import Enemy from './Enemy.js';
import FireballGroup from "../Projectiles/EnemyProjectile.js";


const VENTOLIN_DAMAGE = 5;
const VENTOLIN_HEALTH = 5;
const VENTOLIN_SPEED = 10;
const VENTOLIN_ATTACK_COOLDOWN = 4000;
const VENTOLIN_WEAPON = FireballGroup;
const VENTOLIN_FIREBALLS=1;

export default class Ventolin extends Enemy {

    /**
     * Constructor de Ventolin
     * @param {Scene} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, imgKey) {
        super(scene, x, y, imgKey);
        this.setDisplaySize(50, 50);
        this.health = VENTOLIN_HEALTH;
        this.addWeapon(scene,VENTOLIN_WEAPON);

        this.createAnimations();
        this.play('up');
        this.cooldown = false;
        this.scene.physics.add.overlap(this.scene.player, this, this.attack, null, this);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //Ejecutamos la animación solo si no es la que se estaba ejecutando ya
        //!this.isDead() ? this.play(this.checkAnimation(), true) : this.destroy();
    }
    createAnimations(){
        this.scene.anims.create({
            key:'up',
            frames: this.scene.anims.generateFrameNumbers('ventolin',{start:104,end:112}),
            frameRate: 5,
            repeat: -1
        });
    
        this.scene.anims.create({
            key:'right',
            frames: this.scene.anims.generateFrameNumbers('ventolin',{start:117,end:125}),
            frameRate: 5,
            repeat: -1
        });
    
        this.scene.anims.create({
            key:'down',
            frames: this.scene.anims.generateFrameNumbers('ventolin',{start:130,end:138}),
            frameRate: 5,
            repeat: -1
            });
    
        this.scene.anims.create({
            key:'left',
            frames: this.scene.anims.generateFrameNumbers('ventolin',{start:143,end:151}),
            frameRate: 5,
            repeat: -1
        });
    }
    checkAnimation(){
        if(this.body.velocity.x >= 0 && this.body.velocity.y >= 0)
            return 'left';
        else if(this.body.velocity.x >= 0 && this.body.velocity.y < 0)
            return 'up';
        else if (this.body.velocity.x < 0 && this.body.velocity.y < 0)
            return'right';
        else
            return 'down';
    }
    move(){
        if(Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 40)
            this.scene.physics.moveToObject(this, this.scene.player, VENTOLIN_SPEED);
        else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    attack(){
        if(this.cooldown)
            return;
        this.getHit(playe)
        this.shoot(this.scene.player.x,this.scene.player.y);
        this.cooldown = true;
        setTimeout(() => {
            this.cooldown = false;
        }, VENTOLIN_ATTACK_COOLDOWN);
    }
    isDead(){
        return this.health < 0;
    }

    enemyUpdate(){
        if (!this.isDead())
            this.move();
    }
    addWeapon(scene){
        this.weapon = new VENTOLIN_WEAPON(scene, VENTOLIN_FIREBALLS);
    }
    shoot(pointerX, pointerY){
        this.weapon.shoot(this,pointerX, pointerY);
    }
}