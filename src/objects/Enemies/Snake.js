import Enemy from "./Enemy";

const SNAKE_HEALTH = 40;
const SNAKE_CHARGE_COLOR = '0x000000';
const SNAKE_SPEED = 70;
const CHARGE_SPEED = 300;
const SNAKE_DAMAGE = 20;

export default class Snake extends Enemy{
    constructor(scene, x, y, sprite){
        super(scene, x,  y, sprite);
		//this.setDisplaySize(50,50);
        this.health = SNAKE_HEALTH * this.scene.rateDifficulty;
        this.sprite = sprite;
        this.speed = SNAKE_SPEED;
        this.createAnimations();
        this.play('snake');
        this.cooldown = true;
        this.initialCooldown = Math.random();
        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(48, 20);
        this.body.offset.set(0, 32);
        setTimeout(() => {
            this.cooldown = false;
        }, this.initialCooldown * 1000);
        this.scene.physics.add.overlap(this.scene.player, this ,this.hitPlayer, null, this);
    }

    createAnimations(){
        this.scene.anims.create({
            key:'snake',
            frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'snake_idle',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_idle',{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'snake_attack',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_attack',{start:3,end:5}),
            frameRate: 5,
            repeat: 0
        });
    }

    
    checkAnimation(){
        if((!this.attackAnim || this.charging) && this.scene.player.x > this.x)
            this.flip = true;
        else
            this.flip = false;

        if(this.attackAnim && !this.charging)
            return 'snake_attack';
        else if((this.body.velocity.x === 0 && this.body.velocity.y === 0) || this.charging)
            return 'snake_idle';
        return 'snake';
    }

    move(){
        if(Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 90)
            this.scene.physics.moveToObject(this, this.scene.player, SNAKE_SPEED);
        else{
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    attack(){
        const scene = this.scene;
        this.attackAnim = true
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.canMove = false;
        this.cooldown = true;
        this.charging = true;
        this.hasHitPlayer = false;
        // Parpadear el personaje
        this.blinking = setInterval(() => {
            if(this.blink)
                this.setTint(SNAKE_CHARGE_COLOR);
            else
                this.clearTint();
            this.blink = !this.blink;
        }, 100);
        
        // Detener el parpadeo después de 2 segundos
        setTimeout(() => {
            clearInterval(this.blinking);
            this.clearTint();
            this.charging = false;
            this.blink = true;
        }, 2000);
        this.angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
            this.degrees = this.angle * (180 / Math.PI)
            if( this.degrees >= 0){
                if(this.degrees < 90)
                    this.flipY = true;
                this.setAngle(this.degrees - 180);

            }
            else {
                if(this.degrees > -90)
                    this.flipY = true;
                this.setAngle(this.degrees + 180);
            }
            
            this.scene.physics.moveToObject(this, scene.player, CHARGE_SPEED);
        setTimeout(() => {
            this.canMove = true;
            this.attackAnim = false;
            this.flipY = false;
            this.setRotation(0);
        }, 4000);
        setTimeout(() => {
            this.cooldown = false;
        }, 6000);
    }

    hitPlayer(){
        if(!this.cooldown && !this.attackAnim)
            this.scene.player.getHit(SNAKE_DAMAGE * this.scene.rateDifficulty);
        else if (this.attackAnim && !this.hasHitPlayer){
            this.scene.player.getHit(SNAKE_DAMAGE * this.scene.rateDifficulty);
            this.hasHitPlayer = true;
        }
    }

    enemyUpdate(){
        if (!this.isDead()){
            const rand = Math.random();
            if (!this.cooldown && Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 100 && rand < 0.03)
                this.attack();
            else if(this.canMove)
                this.move();
            if(this.charging){
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }
    }
    
    isDead(){
        return this.health < 0;
    }

}