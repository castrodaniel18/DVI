import Projectile from "./Projectile";

export const FIREBALL_IMGKEY_NAME = 'fireball_image';
export const FIREBALL_IMGKEY_NONE_NAME = 'none';
const FIREBALL_SPEED = 150;
export const FIREBALL_DAMAGE_FACTOR = 1;

export default class Fireball extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, FIREBALL_IMGKEY_NAME,'fireball_attack');
        this.scene = scene;
        this.damage = FIREBALL_DAMAGE_FACTOR;
        this.speed = FIREBALL_SPEED;
        this.createAnimations();
        this.play("fireball_none");
    }

    createAnimations(){
        //Metemos la animación de la fireball
        this.scene.anims.create({
            key: 'fireball_none',
            //frames: this.scene.anims.generateFrameNumbers(FIREBALL_IMGKEY_NAME, {start:11, end:11}),
            frames: [ 
                { key: FIREBALL_IMGKEY_NONE_NAME, frame: 0}
            ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fireball_attack',
            //frames: this.scene.anims.generateFrameNumbers(FIREBALL_IMGKEY_NAME, {start:0, end:1}),
            frames: [ 
                { key: FIREBALL_IMGKEY_NAME, frame: 0}
            ],
            frameRate: 15,
            repeat: 0
        });
    }
}