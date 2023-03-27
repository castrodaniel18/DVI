import { Scene } from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
/** 
*  @param {Scene} scene - escena en la que aparece
*  @param {number} x - coordenada x de spawn
*  @param {number} y - coordeada y de spawn
*/

constructor(scene,x,y){
        super(scene,x,y,'player');
        this.scene.add.existing(this);
        this.setScale(2);
        this.speed=100;
        this.vida = 100;
        this.playerDied = false;
        //Sirve como temporizador para el efecto de la poción
        this.tiempoEfecto = 0;
        this.playerExp = 0;
        this.levelConfig = {
            1:0,
            2:100,
            3:200
        };
        this.playerLevelText = this.scene.add.text(10, 10, 'Nivel 1 - Exp: ' + this.playerExp, { fontSize: '32px', fill: '#FFF' });

        this.scene.anims.create({
            key:'S',
            frames: scene.anims.generateFrameNumbers('player',{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'SW',
            frames: scene.anims.generateFrameNumbers('player',{start:4,end:7}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'W',
            frames: scene.anims.generateFrameNumbers('player',{start:8,end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'NW',
            frames: scene.anims.generateFrameNumbers('player',{start:12,end:15}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'N',
            frames: scene.anims.generateFrameNumbers('player',{start:16,end:19}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'NE',
            frames: scene.anims.generateFrameNumbers('player',{start:20,end:23}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'E',
            frames: scene.anims.generateFrameNumbers('player',{start:24,end:27}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'SE',
            frames: scene.anims.generateFrameNumbers('player',{start:28,end:31}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleS',
            frames: scene.anims.generateFrameNumbers('player',{start:2,end:2}),
            frameRate: 0,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleW',
            frames: scene.anims.generateFrameNumbers('player',{start:16,end:16}),
            frameRate: 0,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleA',
            frames: scene.anims.generateFrameNumbers('player',{start:8,end:8}),
            frameRate: 0,
            repeat: -1
        });
        this.scene.anims.create({
            key:'idleD',
            frames: scene.anims.generateFrameNumbers('player',{start:24,end:24}),
            frameRate: 0,
            repeat: -1
        });
        this.play('idleS');

        this.wKey = this.scene.input.keyboard.addKey('W');
        this.aKey = this.scene.input.keyboard.addKey('A');
        this.sKey = this.scene.input.keyboard.addKey('S');
        this.dKey = this.scene.input.keyboard.addKey('D');

        
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
                this.speed -= 100;
            }
        }

        this.updatePlayerLevel();
    }

    potion(){
        console.log("Poción cogida");
        this.speed += 100;
        this.tiempoEfecto = 10;
        //Para mostrar el temporizador en el juego
        this.tiempoTexto = this.scene.add.text(this.x - 30, this.y - 30, '00:10', { font: '10px Arial', fill: '#FFFFFF' });
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
