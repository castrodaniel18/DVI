import Projectile from "./Projectile";

export const ENEMY_PROJECTILE_IMGKEY_NAME = 'fireball';
const ENEMY_PROJECTILE_SPEED = 100;
export const ENEMY_PROJECTILE_DAMAGE_FACTOR = 1;

export default class EnemyProjectile extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, ENEMY_PROJECTILE_IMGKEY_NAME);
        this.scene = scene;
        this.damage = ENEMY_PROJECTILE_DAMAGE_FACTOR;
        this.speed = ENEMY_PROJECTILE_SPEED;
        this.createAnimations();
        this.play("none");
    }

    createAnimations(){
        //Metemos la animación
        this.scene.anims.create({
            key: 'none',
            frames: this.scene.anims.generateFrameNumbers(ENEMY_PROJECTILE_IMGKEY_NAME, {start:18, end:18}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fire_attack',
            frames: this.scene.anims.generateFrameNumbers(ENEMY_PROJECTILE_IMGKEY_NAME, {start:0, end:19}),
            frameRate: 15,
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
        this.play('fire_attack');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(this.speed * Math.cos(this.rotation), this.speed * Math.sin(this.rotation));
    }
}