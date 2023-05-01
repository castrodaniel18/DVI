export default class Projectile extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, imgKey){
        super(scene, x, y, imgKey);
        this.scene.add.existing(this);
    }

    preUpdate(time, delta){

        super.preUpdate(time, delta);

        //Cuando el proyectil sale del canvas se desactiva para que se puedan lanzar más
        if(!this.scene.cameras.main.worldView.contains(this.x,this.y)){
            this.setActive(false);
            this.setVisible(false);
        }
    }
    
    shoot(pointerX, pointerY){
        this.damage=this.scene.player.damage*(1+this.scene.player.damageIncrease); 
        this.angle = Phaser.Math.Angle.Between(this.scene.player.x, this.scene.player.y + 20, pointerX, pointerY);
        //Reseteamos la posición de la bola de fuego para que aparezca desde donde está player
        this.body.reset(this.scene.player.x, this.scene.player.y + 20);
        
        //Activamos la bola de fuego
        this.setActive(true);
        this.setVisible(true);

        this.setRotation(this.angle);
        this.play('fire_attack');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(this.speed * Math.cos(this.rotation), this.speed * Math.sin(this.rotation));

        this.body.setSize(20, 20);

    }
}