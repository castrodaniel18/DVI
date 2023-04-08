import Phaser from "phaser";
import Goblin from "../objects/Goblin";
import Player from "../objects/Player";
import HealthBar from "../objects/HealthBar";
import FireballGroup from "../objects/FireballGroup";
import Potion from "../objects/Potion";
import GoblinGroup from "../objects/GoblinGroup";

export default class Level1Scene extends Phaser.Scene{
    constructor() {
		super({ key: 'Level1Scene' });

	}
    preload(){
        this.load.spritesheet('healthBar', 'assets/elements/health.png',{frameWidth:640, frameHeight:128})
        this.load.spritesheet('player1','assets/sprites/player1.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('player2','assets/sprites/player2.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('player3','assets/sprites/player3.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('fireball', 'assets/elements/fireball.png', {frameWidth: 25.6, frameHeight: 25.5});
        this.load.spritesheet('goblin', 'assets/sprites/goblin.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('potion', 'assets/elements/potion.png', {frameWidth: 128, frameHeight: 128});
        this.load.image('fondo','assets/elements/fondo.png');
    }

    init(data) {
        // guarda el personaje seleccionado en una variable
        this.selectedCharacter = data.character;
    }

    create(){
        let bg = this.add.image(0,0,'fondo').setOrigin(0,0);
        
        //Creamos al personaje pasándole sus estadísticas según personaje que eligiéramos en la pantalla de selección
        if (this.selectedCharacter == 'personaje1'){
            this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'player1', 150, 100)
            this.fireballGroup = new FireballGroup(this, 15);
        }
        else if (this.selectedCharacter == 'personaje2'){
            this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'player2', 100, 150)
            this.fireballGroup = new FireballGroup(this, 15);
        }
        else if (this.selectedCharacter == 'personaje3'){
            this.player = new Player(this,this.scene.systems.game.scale.gameSize.width/2,this.scene.systems.game.scale.gameSize.height/2, 'player3', 100, 100)
            this.fireballGroup = new FireballGroup(this, 20);
        }
        console.log('speed = ' + this.player.speed);
        console.log('health = ' + this.player.vida);
        console.log('fireballs = ' + this.fireballGroup.getLength());

        this.healthBar = new HealthBar(this,this.player.x,this.player.y -35) 
        this.goblinGroup = new GoblinGroup(this)
        this.potion = new Potion(this, 800, 600);
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
        this.goblinGroup.goblins.forEach(goblin =>{
            this.physics.add.collider(fireballs, goblin, this.hitGoblin, null, this);
            this.physics.add.overlap(this.player, goblin ,this.attack,null,this);
        });
    }

    attack(player,goblin){
        if(Date.now() - goblin.lastAttackTime > goblin.attackCooldown){
            player.vida-=goblin.damage;
            goblin.lastAttackTime = Date.now();
        }
    }
    hitGoblin(fireball, goblin) {
        fireball.destroy();
        goblin.vida -= fireball.damage
        if (goblin.vida <= 0){
            this.player.playerExp += 50;
        }
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

    enemyFollows (goblin) {
        if(Phaser.Math.Distance.Between(this.player.body.position.x,this.player.body.position.y,goblin.body.position.x,goblin.body.position.y)>40){
		    this.physics.moveToObject(goblin, this.player, 100);
        }
        else{
            goblin.body.velocity.x=0;
            goblin.body.velocity.y=0;
        }
	}
	update(){
        this.goblinGroup.goblins.forEach(goblin => {
            goblin.vida ? this.enemyFollows(goblin) : goblin.destroy();
        })
        this.healthBar.updateHealth() 
        if(this.player.vida <= 0){
            this.player.playerDie()
            this.healthBar.playerDie()
        }

        this.player.setLevelTextPosition(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 10);
	}
    
}