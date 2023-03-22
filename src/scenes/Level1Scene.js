import Phaser from "phaser";
import Goblin from "../objects/Goblin";
import Player from "../objects/Player";
import FireballGroup from "../objects/FireballGroup";

export default class Level1Scene extends Phaser.Scene{
    constructor() {
		super({ key: 'Level1Scene' });

	}
    preload(){
        this.load.spritesheet('player','assets/loose sprites.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('fireball', 'assets/Charge.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('goblin','assets/snoopy.png')
        this.load.image('fondo','assets/fondo.png');
    }
    create(){
        let bg = this.add.image(0,0,'fondo').setOrigin(0,0);
        this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2)
        this.fireballGroup = new FireballGroup(this);
        this.goblin = new Goblin(this, 50, 500)
        this.physics.world.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.startFollow(this.player);

        this.addEvents();

        let scene = this;
        
        //Se crea una variable para grupos de elementos que tengan física
        let fireballs = this.physics.add.group();

        //Le añadimos todas las bolas de fireballGroup
        fireballs.addMultiple(this.fireballGroup.getChildren());

        //Añadimos un collider para detectar las colisiones entre las bolas de fuego y el goblin
		this.physics.add.collider(fireballs, this.goblin);

        scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
			if( fireballs.contains(gameObject1) && gameObject2 === this.goblin){
                gameObject2.destroy();
			}
		});
        	
    }

    addEvents(){
        //Para guardar las coordenadas del ratón y saber hacia donde disparar las bolas de fuego
        this.input.on('pointermove', pointer => {
            this.fireballGroupX = pointer.worldX;
            this.fireballGroupY = pointer.worldY;
        })

        //Para detectar los clicks del ratón para disparar
        this.input.on('pointerdown', pointer =>{
            this.fire();
        })
    }

    fire(){
        //Calculamos el ángulo en el que va a haber que disparar
        const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.fireballGroupX, this.fireballGroupY);

        //Disparamos enviando la posición dedse la que se va a crear la bola de fuego y la velocidad y ángulo del disparo
        this.fireballGroup.fire(this.player.x, this.player.y, this.player.speed, angle);
    }

    enemyFollows () {
		this.physics.moveToObject(this.goblin, this.player, 100);
	}

	update(){
		this.enemyFollows();
	}
}