import Projectile from "./Projectile";

export const SCORPIO_PROJECTILE_IMGKEY_NAME = 'scorpio_projectile';
const SCORPIO_PROJECTILE_SPEED = 150;
export const SCORPIO_PROJECTILE_DAMAGE_FACTOR = 1;
export default class ScorpioProjectile extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, SCORPIO_PROJECTILE_IMGKEY_NAME);
        this.setScale(0.01);
        this.scene = scene;
        this.damage = SCORPIO_PROJECTILE_DAMAGE_FACTOR;
        this.speed = SCORPIO_PROJECTILE_SPEED;
        this.createAnimations();
        this.play("none_scorpio");
        this.scene.physics.add.collider(this.scene.player, this, this.hitPlayer, null, this);
    }

    hitPlayer(){
        this.scene.player.getHit(SCORPIO_PROJECTILE_DAMAGE_FACTOR);
        this.destroy();
    }

    createAnimations(){
        //Metemos la animación
        this.scene.anims.create({
            key: 'none_scorpio',
            frames: this.scene.anims.generateFrameNumbers(SCORPIO_PROJECTILE_IMGKEY_NAME,{start:15,end:15}),
            frameRate: 5,
            repeat: -1
            });

        this.scene.anims.create({
            key: 'fire_attack_scorpio',
            frames: this.scene.anims.generateFrameNumbers(SCORPIO_PROJECTILE_IMGKEY_NAME,{start:0,end:9}),
            frameRate: 5,
            repeat: 0
            });
    }

    shoot(enemy){
        this.angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.scene.player.x, this.scene.player.y);
        //Reseteamos la posición de la bola de fuego para que aparezca desde donde está player
        this.body.reset(enemy.x, enemy.y);

        //Activamos la bola de fuego
        this.setActive(true);
        this.setVisible(true);

        //Activamos la animación
        this.setRotation(this.angle);
        this.play('fire_attack_scorpio');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(this.speed * Math.cos(this.rotation), this.speed * Math.sin(this.rotation));
    }
}