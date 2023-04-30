import ExperiencePointGroup from "../misc/ExperiencePointGroup";

const DAMAGE_COLOR = '0xFF0000';
const CRIT_DAMAGE_COLOR = '0xFFFF00';

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

        //Escuchamos el evento en el que el sprite choca con la pared del mundo
        //Si esto sucede hacemos flip
        //Tenemos que guardar el identificador del enemigo en el body
        this.body.key = imgKey;
        //nos guardamos a nostroso en self para poder acceder desde el evento
        //que detecta las colisiones con el límite del mundo

        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(25, 40);
        this.body.offset.set(20, 23);
        // Crear un objeto texto
        this.texto = this.scene.add.text(this.x - 5, this.y - 40, 'damageRecieved');
        this.texto.setFontSize(16);
        this.texto.setVisible(false);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
            //Ejecutamos la animación solo si no es la que se estaba ejecutando ya
            if(!this.isDead()){
                this.play(this.checkAnimation(), true);
                this.texto.x = this.x - 5;
                this.texto.y = this.y - 40;
            }
            else
                this.destroy();
    }

    getHit(enemy, projectile){
        this.crit = 1;
        if(Math.random() < this.scene.player.critProb){
            this.crit = 1.5;
            this.damageColor = CRIT_DAMAGE_COLOR;
            console.log("CRIT")
        }
        else 
            this.damageColor = DAMAGE_COLOR;

        this.texto.text = projectile.damage * this.crit;
        this.texto.setStyle({color:  this.damageColor});

        this.health -= Math.round(projectile.damage * this.crit);
        let stolenLife=Math.ceil(this.scene.player.lifesteal*projectile.damage * this.crit);//cantidad de vida robada redondeada
        if(this.scene.player.health+stolenLife<this.scene.player.maxHealth){//comprueba la vida para no hacer overflow con el lifesteal
        this.scene.player.health+=stolenLife;
        }
        else{
            this.scene.player.health=this.scene.player.maxHealth;
        }

        this.velocidad = -100;
        this.angulo = Phaser.Math.Angle.BetweenPoints(this, projectile);
        this.body.setVelocity(Math.cos(this.angulo) * this.velocidad, Math.sin(this.angulo) * this.velocidad);
        projectile.destroy();
        this.canMove = false;
        this.texto.setVisible(true);
        this.setTint(this.damageColor); // Cambiar el color del personaje a rojo
        this.scene.time.addEvent({
            delay: 200, // La duración del efecto en milisegundos
            callback: () => {
                this.clearTint(); // Restablecer el color original del personaje
                this.canMove = true;
                this.texto.setVisible(false);
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