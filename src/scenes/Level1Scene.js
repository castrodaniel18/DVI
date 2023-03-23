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
        this.load.spritesheet('goblin', 'assets/goblin.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('fondo','assets/fondo.png');
    }
    create(){
        let bg = this.add.image(0,0,'fondo').setOrigin(0,0);
        this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2)
        this.fireballGroup = new FireballGroup(this);
        this.goblin = new Goblin(this, 50, 500,'goblin')
        this.physics.world.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);
        this.cameras.main.startFollow(this.player);

        this.addEvents();

        let scene = this;
        
        //Se crea una variable para grupos de elementos que tengan física
        let fireballs = this.add.group();

        //Le añadimos todas las bolas de fireballGroup
        fireballs.addMultiple(this.fireballGroup.getChildren());

        //Añadimos un collider para detectar las colisiones entre las bolas de fuego y el goblin
		this.physics.add.collider(fireballs, this.goblin, this.hitGoblin, null, this);
        this.physics.add.overlap(this.player,this.goblin,this.attack,null,this);
    }

    attack(player,goblin){
        player.vida=player.vida-goblin.damage;
    }
    hitGoblin(fireball, goblin) {
        fireball.destroy();
        goblin.vida = goblin.vida - fireball.damage
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
        if(Phaser.Math.Distance.Between(this.player.body.position.x,this.player.body.position.y,this.goblin.body.position.x,this.goblin.body.position.y)>40){
		    this.physics.moveToObject(this.goblin, this.player, 100);
        }
        else{
            this.goblin.body.velocity.x=0;
            this.goblin.body.velocity.y=0;
        }
	}
    

	update(){
        if(this.goblin.vida > 0)
		    this.enemyFollows();
        else
            this.goblin.destroy()
	}
}