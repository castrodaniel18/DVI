export default class Enemy extends Phaser.GameObjects.Sprite {
  /**
   * Constructor de Enemy
   * @param {Scene} scene Escena en la que aparece la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
	constructor(scene, x, y, speed, imgKey) {
		super(scene, x, y, imgKey);
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
	
		
		// Queremos que el jugador no se salga de los límites del mundo
		this.body.setCollideWorldBounds();
		//this.body.setVelocity(speed, 0);
		
		//Escuchamos el evento en el que el sprite choca con la pared del mundo
		//Si esto sucede hacemos flip
		//Tenemos que guardar el identificador del enemigo en el body
		this.body.key = imgKey;
		//nos guardamos a nostroso en self para poder acceder desde el evento
		//que detecta las colisiones con el límite del mundo

	}
	
}