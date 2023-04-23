import { Scene } from "phaser";

const LEVELS = [100, 200, 300];
const DASH_TIME = 200;
const DASH_COOLDOWN = 5000;
const DASH_SPEED_FACTOR = 4;

export default class Character extends Phaser.GameObjects.Sprite {
/** 
*  @param {Scene} scene - escena en la que aparece
*  @param {number} x - coordenada x de spawn
*  @param {number} y - coordeada y de spawn
*/
constructor(scene,x,y, name, sprite, health, damage, speed){
    super(scene,x,y,sprite);
    this.scene.add.existing(this);
    this.setScale(2);
    this.sprite = sprite;
    //Parametros básicos
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.speed = speed;
    this.damage = damage;
    this.playerExp = 0;
    this.isDead = false;

    //variables auxiliares
    this.dashTime = DASH_TIME;
    this.dashCooldown = DASH_COOLDOWN;
    this.dashSpeedFactor = DASH_SPEED_FACTOR;
    this.canDash = true;
    this.isInvencible = false;
    this.playerLevel = 1;
    this.playerLevelText = this.scene.add.text(10, 10, 'Nivel 1 - Exp: ' + this.playerExp, { fontSize: '32px', fill: '#FFFFFF' });
    //Se define el movimiento y idles
    this.createAnimations();
    this.play('idleS');
    this.defineControls();

    //Se añade a la escena y se añaden colisiones con el mundo
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();
}
/**
 * @param {number} t
 * @param {number} dt
 */
preUpdate(t,dt){
    super.preUpdate(t,dt);

    if (this.health <= 0){
        this.scene.healthBar.playerDie();
        this.playerDie();
        return;
    }
    this.scene.healthBar.updateHealth();
    this.playerLevelText.setPosition(this.scene.cameras.main.scrollX + 10, this.scene.cameras.main.scrollY + 10);
    this.checkMove();
    this.checkIdle();
    this.checkLevelUp();
}

defineControls(){
    this.wKey = this.scene.input.keyboard.addKey('W');
    this.aKey = this.scene.input.keyboard.addKey('A');
    this.sKey = this.scene.input.keyboard.addKey('S');
    this.dKey = this.scene.input.keyboard.addKey('D');
    this.spaceKey = this.scene.input.keyboard.addKey('SPACE');
}

createAnimations(){
    this.scene.anims.create({
        key:'S',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:0,end:3}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'SW',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:4,end:7}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'W',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:8,end:11}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'NW',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:12,end:15}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'N',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:16,end:19}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'NE',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:20,end:23}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'E',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:24,end:27}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'SE',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:28,end:31}),
        frameRate: 5,
        repeat: -1
    });
    this.scene.anims.create({
        key:'idleS',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:2,end:2}),
        frameRate: 0,
        repeat: -1
    });
    this.scene.anims.create({
        key:'idleW',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:16,end:16}),
        frameRate: 0,
        repeat: -1
    });
    this.scene.anims.create({
        key:'idleA',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:8,end:8}),
        frameRate: 0,
        repeat: -1
    });
    this.scene.anims.create({
        key:'idleD',
        frames: this.scene.anims.generateFrameNumbers(this.sprite,{start:24,end:24}),
        frameRate: 0,
        repeat: -1
    });
}

checkMove(){
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
        if (this.canDash) {
            this.canDash = false;
            this.speed *= this.dashSpeedFactor;
            this.isInvencible = true;
          
            setTimeout(() => {
                this.speed /= this.dashSpeedFactor;
                this.isInvencible = false;
                setTimeout(() => {
                    this.canDash = true;
                }, this.dashCooldown);
            }, this.dashTime);
        }
    }
    let aux = new Phaser.Math.Vector2(this.body.velocity.x,this.body.velocity.y); 
    aux.normalize();
    this.body.setVelocity(this.speed*aux.x,this.speed*aux.y);
}

checkIdle(){
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
}

playerDie() {
    this.isDead = true;
    this.destroy()
}

checkLevelUp() {
    if(this.playerExp >= LEVELS[this.playerLevel]){
        this.playerLevel++;
        this.playerLevelText.setText('Nivel: ' + this.playerLevel + ' - Exp: ' + this.playerExp);
    }
}

getHit(damage){
    if(!this.isInvencible){
        this.health -= damage;
        this.setTint(0xff0000); // Cambiar el color del personaje a rojo
        this.scene.time.addEvent({
            delay: 200, // La duración del efecto en milisegundos
            callback: () => {
                this.clearTint(); // Restablecer el color original del personaje
            },
            callbackScope: this
        });
    }
}

}