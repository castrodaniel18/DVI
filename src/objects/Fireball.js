export default class FireballGroup extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y){
        super(scene, x, y, 'fireball');

        this.scene.add.existing(this);
        this.setScale(0.5);

        //Metemos la animación de la fireball
        this.scene.anims.create({
			key: 'none',
			frames: scene.anims.generateFrameNumbers('fireball', {start:11, end:11}),
			frameRate: 5,
			repeat: -1
		});

		this.scene.anims.create({
            key: 'fire_attack',
			frames: scene.anims.generateFrameNumbers('fireball', {start:0, end:11}),
			frameRate: 10,
			repeat: 0
        });

        this.play("none")
    }

    fire(playerX, playerY, speed, angle){
        //Reseteamos la posición de la bola de fuego para que aparezca desde donde está player
        this.body.reset(playerX + 10, playerY);
        
        //Activamos la bola de fuego
        this.setActive(true);
        this.setVisible(true);

        //Activamos la animación
        this.play('fire_attack');

        //Establecemos la velocidad según los valores que obtuvimos con el listener del ratón
        this.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle));
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta);

        //Cuando la bola de fuego sale del canvas se desactiva para que se puedan lanzar más
        if(this.y <= 0 || this.y >= 600 || this.x <= 0 || this.x >= 800){
            this.setActive(false);
            this.setVisible(false);
        }
    }
}