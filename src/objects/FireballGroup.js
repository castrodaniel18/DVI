import Fireball from "./Fireball"

export default class FireballGroup extends Phaser.Physics.Arcade.Group{

    constructor(scene, numFireballs){
        super(scene.physics.world, scene);

        //Se crean 10 bolas de fuego que están desactivadas para que cada vez que se pulse el ratón se active una de ellas
        this.createMultiple({
            classType: Fireball,
            frameQuantity: numFireballs,
            active: false,
            visible: false,
            key: 'Fireball'
        })
    }

    fire(playerX, playerY, speed, angle){
        const ball = this.getFirstDead(false);
        if (ball){
             ball.fire(playerX, playerY, speed, angle);
        }
    }
}