import Projectile from "./Projectile";

export const FIREBALL_IMGKEY_NAME = 'fireball';
const FIREBALL_SPEED = 100;
export const FIREBALL_DAMAGE_FACTOR = 1;

export default class Fireball extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, FIREBALL_IMGKEY_NAME);
        this.scene = scene;
        this.damage = /*this.scene.player.damage * */FIREBALL_DAMAGE_FACTOR;
        this.speed = FIREBALL_SPEED;
        this.createAnimations();
        this.play("none");
    }

    createAnimations(){
        //Metemos la animación de la fireball
        this.scene.anims.create({
            key: 'none',
            frames: this.scene.anims.generateFrameNumbers(FIREBALL_IMGKEY_NAME, {start:18, end:18}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fire_attack',
            frames: this.scene.anims.generateFrameNumbers(FIREBALL_IMGKEY_NAME, {start:0, end:19}),
            frameRate: 15,
            repeat: 0
        });
    }

    shoot(pointerX, pointerY){
        this.angle = Phaser.Math.Angle.Between(this.scene.player.x, this.scene.player.y, pointerX, pointerY);
        //Reseteamos la posición de la bola de fuego para que aparezca desde donde está player
        this.body.reset(this.scene.player.x, this.scene.player.y);
        
        //Activamos la bola de fuego
        this.setActive(true);
        this.setVisible(true);

        //Activamos la animación
        this.play('fire_attack');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(this.speed * Math.cos(this.angle), this.speed * Math.sin(this.angle));
    }
}