import ExperiencePointGroup from "../misc/ExperiencePointGroup";

export default class Enemy extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Enemy
     * @param {Scene} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, imgKey) {
        super(scene, x, y, imgKey);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.canMove = true;

        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        //this.body.setVelocity(speed, 0);

        //Escuchamos el evento en el que el sprite choca con la pared del mundo
        //Si esto sucede hacemos flip
        //Tenemos que guardar el identificador del enemigo en el body
        this.body.key = imgKey;
        //nos guardamos a nostroso en self para poder acceder desde el evento
        //que detecta las colisiones con el límite del mundo

        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(25, 40);
        this.body.offset.set(20, 23);
    }

    getHit(enemy, projectile){
        this.health -= Math.round(projectile.damage);
        console.log(projectile.damage)
        let stolenLife=Math.ceil(this.scene.player.lifesteal*projectile.damage);//cantidad de vida robada redondeada
        if(this.scene.player.health+stolenLife<this.scene.player.maxHealth){//comprueba la vida para no hacer overflow con el lifesteal
        this.scene.player.health+=stolenLife;
        }
        else{
            this.scene.player.health=this.scene.player.maxHealth;
        }
        var velocidad = -100;
        var angulo = Phaser.Math.Angle.BetweenPoints(this, projectile);
        this.body.setVelocity(Math.cos(angulo) * velocidad, Math.sin(angulo) * velocidad);
        projectile.destroy();
        this.canMove = false;
        this.setTint(0xff0000); // Cambiar el color del personaje a rojo
        this.scene.time.addEvent({
            delay: 200, // La duración del efecto en milisegundos
            callback: () => {
                this.clearTint(); // Restablecer el color original del personaje
                this.canMove = true;
            },
            callbackScope: this
        });
        
        if (this.isDead()){
            this.expDrop = new ExperiencePointGroup(this.scene, this.x, this.y);
            this.destroy();
        }
    }

    addCollisions(){
        this.scene.physics.add.collider(this.scene.player.weapon, this, this.getHit, null, this);
    }
}