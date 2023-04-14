import { Scene } from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
/** 
*  @param {Scene} scene - escena en la que aparece
*  @param {number} x - coordenada x de spawn
*  @param {number} y - coordeada y de spawn
*/

constructor(scene,x,y, sprite, playerSpeed, playerHealth){
        super(scene,x,y,sprite);
        this.scene.add.existing(this);
        this.setScale(2);
        this.speed = playerSpeed;
        this.damage = 3
        this.maxHealth = playerHealth;
        this.health = playerHealth;
        this.playerDied = false;
        //Sirve como temporizador para el efecto de la poción
        this.tiempoEfecto = 0;
        this.playerExp = 0;
        this.tiempoDash = 0;
        this. originalSpeed=this.speed
        this.originalDamage=0;
        this.invencible = false;
        this.levelConfig = {
            1:0,
            2:100,
            3:200
        };
        this.playerLevelText = this.scene.add.text(10, 10, 'Nivel 1 - Exp: ' + this.playerExp, { fontSize: '32px', fill: '#FFFFFF' });

        this.scene.anims.create({
            key:'S',
            frames: scene.anims.generateFrameNumbers(sprite,{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'SW',
            frames: scene.anims.generateFrameNumbers(sprite,{start:4,end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'W',
            frames: scene.anims.generateFrameNumbers(sprite,{start:8,end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'NW',
            frames: scene.anims.generateFrameNumbers(sprite,{start:12,end:15}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'N',
            frames: scene.anims.generateFrameNumbers(sprite,{start:16,end:19}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'NE',
            frames: scene.anims.generateFrameNumbers(sprite,{start:20,end:23}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'E',
            frames: scene.anims.generateFrameNumbers(sprite,{start:24,end:27}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'SE',
            frames: scene.anims.generateFrameNumbers(sprite,{start:28,end:31}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleS',
            frames: scene.anims.generateFrameNumbers(sprite,{start:2,end:2}),
            frameRate: 0,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleW',
            frames: scene.anims.generateFrameNumbers(sprite,{start:16,end:16}),
            frameRate: 0,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleA',
            frames: scene.anims.generateFrameNumbers(sprite,{start:8,end:8}),
            frameRate: 0,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleD',
            frames: scene.anims.generateFrameNumbers(sprite,{start:24,end:24}),
            frameRate: 0,
            repeat: -1
        });
        this.play('idleS');

        this.wKey = this.scene.input.keyboard.addKey('W');
        this.aKey = this.scene.input.keyboard.addKey('A');
        this.sKey = this.scene.input.keyboard.addKey('S');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.spaceKey = this.scene.input.keyboard.addKey('SPACE');

        
        scene.physics.add.existing(this);
        // @ts-ignore
        this.body.setCollideWorldBounds();

    }
    /**
     * @param {number} t
     * @param {number} dt
     */
    preUpdate(t,dt){
        super.preUpdate(t,dt);
        if(this.aKey.isDown ){
            if(this.wKey.isDown || this.sKey.isDown || this.dKey.isDown){}
            else if(this.anims.currentAnim.key !== ('W')){
                this.play('W');
            }
            this.body.velocity.x=-this.speed;
        }
        if(this.sKey.isDown ){
            if(this.aKey.isDown || this.dKey.isDown || this.wKey.isDown){}
            else if(this.anims.currentAnim.key !== ('S')){
                this.play('S');
            }
            this.body.velocity.y=this.speed;
        }
        if(this.dKey.isDown){
            if(this.wKey.isDown || this.sKey.isDown || this.aKey.isDown){}
            else if(this.anims.currentAnim.key !== ('E')){
                this.play('E');
            }
            this.body.velocity.x=this.speed;
        }
        if(this.wKey.isDown ){
            if(this.aKey.isDown || this.dKey.isDown || this.sKey.isDown){}
            else if(this.anims.currentAnim.key !== ('N')){
                this.play('N');
            }
            this.body.velocity.y=-this.speed;
        }
        
        if(this.aKey.isDown && this.sKey.isDown){
            if(this.wKey.isDown || this.dKey.isDown){}
            else if(this.anims.currentAnim.key !== 'SW'){
                this.play('SW');
            }
        }
        if(this.sKey.isDown && this.dKey.isDown ){
            if(this.wKey.isDown || this.aKey.isDown){}
            else if(this.anims.currentAnim.key !== 'SE'){
                this.play('SE');
            }
        }
        if(this.wKey.isDown && this.dKey.isDown ){
            if(this.aKey.isDown || this.sKey.isDown){}
            else if(this.anims.currentAnim.key !== 'NE'){
                this.play('NE');
            }
        }
        if(this.wKey.isDown && this.aKey.isDown ){
            if(this.dKey.isDown || this.sKey.isDown){}
            else if(this.anims.currentAnim.key !== 'NW'){
                this.play('NW');
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
        this.tiempoDash=0.1
        this.speed*=4  
        this.invencible=true;    
        }
        if(this.tiempoDash>0){
            this.tiempoDash -= dt/1000;
        
        }
        else{
            this.speed=this.originalSpeed
            this.invencible=false;
        }
        console.log(this.health)
        let aux = new Phaser.Math.Vector2(this.body.velocity.x,this.body.velocity.y); 
        aux.normalize();
        // @ts-ignore
        this.body.setVelocity(this.speed*aux.x,this.speed*aux.y);

        if(Phaser.Input.Keyboard.JustUp(this.aKey)|| (this.aKey.isDown && this.dKey.isDown)){
			if(this.anims.isPlaying) this.play('idleA');
            this.body.velocity.x=0;
		}
        if(Phaser.Input.Keyboard.JustUp(this.dKey) || (this.aKey.isDown && this.dKey.isDown)){
			if(this.anims.isPlaying) this.play('idleD');
            this.body.velocity.x=0;
		}
        if(Phaser.Input.Keyboard.JustUp(this.wKey) || (this.wKey.isDown && this.sKey.isDown)){
			if(this.anims.isPlaying) this.play('idleW');
            this.body.velocity.y=0;
		}
        if(Phaser.Input.Keyboard.JustUp(this.sKey) || (this.wKey.isDown && this.sKey.isDown)){
			if(this.anims.isPlaying) this.play('idleS');
            this.body.velocity.y=0;
		}
        if((this.wKey.isDown && this.aKey.isDown && this.dKey.isDown)||(this.sKey.isDown && this.dKey.isDown && this.aKey.isDown)){
            this.body.velocity.x=0;
            this.body.velocity.y=0;
        }

        if(this.tiempoEfecto > 0){
            this.tiempoEfecto -= dt/1000;
            var minutos = Math.floor(this.tiempoEfecto / 60);
            var segundos = Math.floor(this.tiempoEfecto - (minutos * 60));
            if (this.tiempoEfecto > 0)
                this.tiempoTexto.setText(minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0'));
            else
                this.tiempoTexto.setText('');
            this.tiempoTexto.x = this.x - 30;
            this.tiempoTexto.y = this.y - 30;

            if (this.tiempoEfecto <= 0){
                this.speed=this.originalSpeed;
                if(this.invencible)this.invencible=false;
                if(this.damage!==this.originalDamage)this.damage*=0.5;
            }
        }

        this.updatePlayerLevel();
    }
   
    potion(type){
        console.log("Poción cogida");
        switch(type){
            case 'speed':
                this.speed += 100;
                this.tiempoEfecto = 10;
                //Para mostrar el temporizador en el juego
                this.tiempoTexto = this.scene.add.text(this.x - 30, this.y - 30, '00:10', { font: '10px Arial', fill: '#FFFFFF' });
                break
            case 'life':
                if(this.health<this.maxHealth*0.7)this.health+=this.maxHealth*(0.3);
                else this.health=this.maxHealth
                break;
            case 'damage':
                this.originalDamage=this.damage;
                this.damage*=2
                this.tiempoEfecto=10;//hay que hacer un temporizador para cada efecto
                this.tiempoTexto = this.scene.add.text(this.x - 30, this.y - 30, '00:10', { font: '10px Arial', fill: '#FFFFFF' });
                break;
            case 'invencible':
                this.invencible=true;
                this.tiempoEfecto=10;//hay que hacer un temporizador para cada efecto
                this.tiempoTexto = this.scene.add.text(this.x - 30, this.y - 30, '00:10', { font: '10px Arial', fill: '#FFFFFF' });
            default:
        }
    }

    playerDie() {
        this.playerDied = true;
        this.destroy()
    }

    checkLevelUp() {
        let currentLevel = 1;
        for (let level in this.levelConfig) {
          if (this.playerExp >= this.levelConfig[level]) {
            // @ts-ignore
            currentLevel = level;
          } else {
            break;
          }
        }
        return currentLevel;
    }
    
    updatePlayerLevel() {
        let currentLevel = this.checkLevelUp();
        this.playerLevelText.setText('Nivel: ' + currentLevel + ' - Exp: ' + this.playerExp);
    }

    setLevelTextPosition(posX, posY){
        this.playerLevelText.setPosition(posX, posY);
    }

}
