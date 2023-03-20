import { Scene } from "phaser";

export default class Fireball extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Box, nuestras cajas destructibles
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, colliderGroup) {
		super(scene, x, y, 'fireball');
        this.scene.add.existing(this);

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

		// Si la animación de ataque se completa pasamos a ejecutar la animación 'idle'
		this.on('animationcomplete', end => {
			if (this.anims.currentAnim.key === 'fire_attack'){
				//this.setActive(false).setVisible(false);
				this.toDestroy = true;
			}
		})

        this.play("none")

		// Agregamos la caja a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);

		// Decimos que la caja colisiona con los límites del mundo
		// @ts-ignore
		this.body.setCollideWorldBounds();

		//colliderGroup.add(this);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

	}

	/**
	 * Cambiamos la propiedad jumpDisabled a true para indicar que el personaje no puede saltar
	 */
	destroyMe(){
		this.stop();

	}

    attack(speed, angle){

        // Calcular la dirección del ataque en función del ángulo de rotación
		//let direccionX = Math.cos(rotation);
		//let direccionY = Math.sin(rotation);
        
		// Posicionar el nuevo sprite relativo al sprite actual
		//this.x = x;
		//this.y = y;

		// @ts-ignore
		this.body.setVelocity(speed * Math.cos(angle), speed * Math.sin(angle));

        this.play("fire_attack");
    }
}