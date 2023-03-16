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
            key:'idle',
            frames: scene.anims.generateFrameNumbers('player',{start:4,end:4}),
            frameRate: 0,
            repeat: -1
        });
        
        this.play('S');

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

        if(Phaser.Input.Keyboard.JustUp(this.aKey)||Phaser.Input.Keyboard.JustUp(this.dKey) || (this.aKey.isDown && this.dKey.isDown)){
			if(this.anims.isPlaying === true){
				//this.play('idle');
			}
            this.body.velocity.x=0;
		}
        if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey) || (this.wKey.isDown && this.sKey.isDown)){
			if(this.anims.isPlaying === true){
				//this.play('idle');
			}
            this.body.velocity.y=0;
		}
        if((this.wKey.isDown && this.aKey.isDown && this.dKey.isDown)||(this.sKey.isDown && this.dKey.isDown && this.aKey.isDown)){
            this.body.velocity.x=0;
            this.body.velocity.y=0;
        }
        console.log(this.body.position.x)
    }

}
