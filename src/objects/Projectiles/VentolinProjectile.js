import Projectile from "./Projectile";

export const VENTOLIN_PROJECTILE_IMGKEY_NAME = 'ventolin_projectile_';
const VENTOLIN_PROJECTILE_SPEED = 150;
export const VENTOLIN_PROJECTILE_DAMAGE_FACTOR = 1;
export default class VentolinProjectile extends Projectile{
    
    constructor(scene, x, y){
        super(scene, x, y, VENTOLIN_PROJECTILE_IMGKEY_NAME);
        this.setScale(0.01);
        this.scene = scene;
        this.damage = VENTOLIN_PROJECTILE_DAMAGE_FACTOR;
        this.speed = VENTOLIN_PROJECTILE_SPEED;
        this.createAnimations();
        this.play("none_ventolin");
        this.scene.physics.add.collider(this.scene.player, this, this.hitPlayer, null, this);
        this.specialProb = Math.random();
        this.setVisible(true);
        if (this.specialProb < 0.5){
            this.special = true;
            this.setTint(0xff0000)
        }
        else
            this.special = false;
    }

    hitPlayer(){
        if(this.visible){
            if(this.special && this.scene.player.dashing)
            this.scene.player.dashParry();
        else
            this.scene.player.getHit(VENTOLIN_PROJECTILE_DAMAGE_FACTOR);
            this.setVisible(false);
            this.setActive(false);
        }
    }

    createAnimations(){
        //Metemos la animación
        this.scene.anims.create({
            key: 'none_ventolin',
            frames: [ 
                { key: VENTOLIN_PROJECTILE_IMGKEY_NAME+ '2', frame: VENTOLIN_PROJECTILE_IMGKEY_NAME + '2'}
              ],
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fire_attack_ventolin',
            frames: [ 
                { key: VENTOLIN_PROJECTILE_IMGKEY_NAME + '1', frame: VENTOLIN_PROJECTILE_IMGKEY_NAME + '1'},
                { key: VENTOLIN_PROJECTILE_IMGKEY_NAME + '2', frame: VENTOLIN_PROJECTILE_IMGKEY_NAME + '2'},
              ],
            frameRate: 2,
            repeat: 0,
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
        this.play('fire_attack_ventolin');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(this.speed * Math.cos(this.rotation), this.speed * Math.sin(this.rotation));

        this.body.setSize(20, 20);
    }
}