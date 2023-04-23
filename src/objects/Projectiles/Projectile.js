export default class Projectile extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y, imgKey){
        super(scene, x, y, imgKey);

        this.scene.add.existing(this);
    }

    shoot(pointerX, pointerY){}

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        //Cuando el proyectil sale del canvas se desactiva para que se puedan lanzar más
        if(this.y <= 0 || this.y >= 960 || this.x <= 0 || this.x >= 960){
            this.setActive(false);
            this.setVisible(false);
        }

    }
}