export default class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.canMove = true;

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        //Escuchamos el evento en el que el sprite choca con la pared del mundo
        //Si esto sucede hacemos flip
        //Tenemos que guardar el identificador del enemigo en el body
        this.body.key = sprite;
        //nos guardamos a nostroso en self para poder acceder desde el evento
        //que detecta las colisiones con el límite del mundo

        // Crear un objeto texto
        this.texto = this.scene.add.text(this.x - 5, this.y - 40, 'damageRecieved');
        this.texto.setFontSize(16);
        this.texto.setVisible(false);
        this.anim = sprite;
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
            //Ejecutamos la animación solo si no es la que se estaba ejecutando ya
            if(!this.isDead()){
                this.anim = this.checkAnimation();
                if(this.anim !== null)
                    this.play(this.anim, true).flipX = this.flip;
                this.attack();
                this.texto.x = this.x - 5;
                this.texto.y = this.y - 40;
            }
           else{
                this.body.velocity.x=0;
                this.body.velocity.y=0;
           }
    }

    isDead(){
        return this.health < 0;
    }


    addCollisions(){
        this.scene.physics.add.collider(this.scene.player.weapon, this, this.getHit, null, this);
    }
}