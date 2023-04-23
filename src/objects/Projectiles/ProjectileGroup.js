export default class ProjectileGroup extends Phaser.Physics.Arcade.Group{

    constructor(scene, imgKey, projectileType, numProjectiles, projectileDamage){
        super(scene.physics.world, scene);
        this.numProjectiles=numProjectiles;
        this.damage = projectileDamage;
        this.createMultiple({
            classType: projectileType,
            frameQuantity: numProjectiles,
            active: false,
            visible: false,
            key: imgKey,
        })
    }

   shoot(pointerX, pointerY){
        let projectile;
        this.getLength()===this.numProjectiles? projectile = this.getFirstDead(false) : projectile = this.getFirstDead(true)
        if (projectile){
            projectile.shoot(pointerX, pointerY);
        }
    }
}