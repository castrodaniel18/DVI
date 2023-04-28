import Projectile from "./Projectile";

export const ELECTROBALL_IMGKEY_NAME = 'electroball';
const ELECTROBALL_SPEED = 120;
export const ELECTROBALL_DAMAGE_FACTOR = 2;

export default class Electroball extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, ELECTROBALL_IMGKEY_NAME);
        this.scene = scene;
        this.damage = ELECTROBALL_DAMAGE_FACTOR;
        this.speed = ELECTROBALL_SPEED;
        this.createAnimations();
        this.play("none");
    }

    createAnimations(){
        //Metemos la animación de la fireball
        this.scene.anims.create({
            key: 'none',
            frames: this.scene.anims.generateFrameNumbers(ELECTROBALL_IMGKEY_NAME, {start:2, end:2}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fire_attack',
            frames: this.scene.anims.generateFrameNumbers(ELECTROBALL_IMGKEY_NAME, {start:0, end:3}),
            frameRate: 15,
            repeat: 0
        });
    }
}