import Projectile from "./Projectile";

export const FIREBALL_IMGKEY_NAME = 'fireball';
const FIREBALL_SPEED = 100;
export const FIREBALL_DAMAGE_FACTOR = 1;

export default class Fireball extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, FIREBALL_IMGKEY_NAME);
        this.scene = scene;
        this.damage = FIREBALL_DAMAGE_FACTOR;
        this.speed = FIREBALL_SPEED;
        this.createAnimations();
        this.play("none");
    }

    createAnimations(){
        //Metemos la animación de la fireball
        this.scene.anims.create({
            key: 'none',
            frames: this.scene.anims.generateFrameNumbers(FIREBALL_IMGKEY_NAME, {start:11, end:11}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fire_attack',
            frames: this.scene.anims.generateFrameNumbers(FIREBALL_IMGKEY_NAME, {start:0, end:1}),
            frameRate: 15,
            repeat: 0
        });
    }
}