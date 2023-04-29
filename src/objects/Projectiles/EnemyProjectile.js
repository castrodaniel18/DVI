import Projectile from "./Projectile";

export const ENEMY_PROJECTILE_IMGKEY_NAME = 'enemy_projectile_';
const ENEMY_PROJECTILE_SPEED = 150;
export const ENEMY_PROJECTILE_DAMAGE_FACTOR = 1;
export default class EnemyProjectile extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, ENEMY_PROJECTILE_IMGKEY_NAME);
        this.setScale(0.01);
        this.scene = scene;
        this.damage = ENEMY_PROJECTILE_DAMAGE_FACTOR;
        this.speed = ENEMY_PROJECTILE_SPEED;
        this.createAnimations();
        this.play("none_enemy");
        this.scene.physics.add.collider(this.scene.player, this, this.hitPlayer, null, this);
    }

    hitPlayer(){
        this.scene.player.getHit(ENEMY_PROJECTILE_DAMAGE_FACTOR);
    }

    createAnimations(){
        //Metemos la animación
        this.scene.anims.create({
            key: 'none_enemy',
            frames: [ 
                { key: ENEMY_PROJECTILE_IMGKEY_NAME+ '2', frame: ENEMY_PROJECTILE_IMGKEY_NAME + '2'}
              ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fire_attack_enemy',
            frames: [ 
                { key: ENEMY_PROJECTILE_IMGKEY_NAME + '1', frame: ENEMY_PROJECTILE_IMGKEY_NAME + '1'},
                { key: ENEMY_PROJECTILE_IMGKEY_NAME + '2', frame: ENEMY_PROJECTILE_IMGKEY_NAME + '2'},
              ],
            frameRate: 2,
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
        this.play('fire_attack_enemy');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(this.speed * Math.cos(this.rotation), this.speed * Math.sin(this.rotation));
    }
}