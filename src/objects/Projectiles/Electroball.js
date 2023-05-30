import Projectile from "./Projectile";

export const ELECTROBALL_IMGKEY_NAME = 'electroball_image';
export const ELECTROBALL_IMGKEY_NONE_NAME = 'none';
const ELECTROBALL_SPEED = 120;
export const ELECTROBALL_DAMAGE_FACTOR = 2;

export default class Electroball extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, ELECTROBALL_IMGKEY_NAME,'electroball_attack');
        this.scene = scene;
        this.damage *= ELECTROBALL_DAMAGE_FACTOR;
        this.speed = ELECTROBALL_SPEED;
        this.createAnimations();
        this.play("electroball_none");
    }

    createAnimations(){
        //Metemos la animación de la fireball
        this.scene.anims.create({
            key: 'electroball_none',
            //frames: this.scene.anims.generateFrameNumbers(ELECTROBALL_IMGKEY_NAME, {start:2, end:2}),
            frames: [ 
                { key: ELECTROBALL_IMGKEY_NONE_NAME, frame: 0}
            ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'electroball_attack',
            //frames: this.scene.anims.generateFrameNumbers(ELECTROBALL_IMGKEY_NAME, {start:0, end:3}),
            frames: [ 
                { key: ELECTROBALL_IMGKEY_NAME, frame: 0}
            ],
            frameRate: 15,
            repeat: 0
        });
    }
}