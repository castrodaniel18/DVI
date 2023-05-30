import Projectile from "./Projectile";

export const LIGHTBALL_IMGKEY_NAME = 'lightball';
const LIGHTBALL_SPEED = 100;
export const LIGHTBALL_DAMAGE_FACTOR = 2;

export default class Lightball extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, LIGHTBALL_IMGKEY_NAME,'lightball_attack');
        this.scene = scene;
        this.damage *= LIGHTBALL_DAMAGE_FACTOR;
        this.speed = LIGHTBALL_SPEED;
        this.createAnimations();
        this.play("lightball_none");
    }

    createAnimations(){
        //Metemos la animación de la fireball
        this.scene.anims.create({
            key: 'lightball_none',
            frames: this.scene.anims.generateFrameNumbers(LIGHTBALL_IMGKEY_NAME, {start:8, end:8}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'lightball_attack',
            frames: this.scene.anims.generateFrameNumbers(LIGHTBALL_IMGKEY_NAME, {start:0, end:2}),
            frameRate: 15,
            repeat: 0
        });
    }
}