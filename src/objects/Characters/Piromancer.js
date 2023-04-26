import { Scene } from "phaser";

const LEVELS = [100, 200, 300];
const DASH_TIME = 200;
const DASH_COOLDOWN = 5000;
const DASH_SPEED_FACTOR = 4;

export default class Piromancer extends Phaser.GameObjects.Sprite {
/** 
*  @param {Scene} scene - escena en la que aparece
*  @param {number} x - coordenada x de spawn
*  @param {number} y - coordeada y de spawn
*/
constructor(scene,x,y, name, sprite, health, damage, speed){
    super(scene,x,y,sprite);
    this.scene.add.existing(this);
    this.setScale(1);
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
    this.play('idleA');
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
    //this.scene.healthBar.updateHealth();
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
        key:'D',
        frames: this.scene.anims.generateFrameNumbers('piromancer_move',{start:0,end:5}),
        frameRate: 10,
        repeat: -1
    });
    this.scene.anims.create({
        key:'A',
        frames: this.scene.anims.generateFrameNumbers('piromancer_move',{start:0,end:5}),
        frameRate: 10,
        repeat: -1
    });
    this.scene.anims.create({
        key:'idleA',
        frames: this.scene.anims.generateFrameNumbers('piromancer_idle',{start:0,end:6}),
        frameRate: 10,
        repeat: -1
    });
    this.scene.anims.create({
        key:'idleD',
        frames: this.scene.anims.generateFrameNumbers('piromancer_idle',{start:0,end:6}),
        frameRate: 10,
        repeat: -1
    });

    this.scene.anims.create({
        key:'dead',
        frames: this.scene.anims.generateFrameNumbers('piromancer_dead',{start:0,end:4}),
        frameRate: 5,
        repeat: -1
    });
}

checkMove(){
    if(this.aKey.isDown ){
        if(this.wKey.isDown || this.sKey.isDown || this.dKey.isDown){}
        else if(this.anims.currentAnim.key !== ('A') && this.anims.currentAnim.key !== ('dash')){
            this.play('A');
        }
        this.body.velocity.x=-this.speed;
    }
    if(this.sKey.isDown ){
        this.body.velocity.y=this.speed;
    }
    if(this.dKey.isDown){
        if(this.wKey.isDown || this.sKey.isDown || this.aKey.isDown){}
        else if(this.anims.currentAnim.key !== ('D') && this.anims.currentAnim.key !== ('dash')){
            this.play('D');
        }
        this.body.velocity.x=this.speed;
    }
    if(this.wKey.isDown ){
        this.body.velocity.y=-this.speed;
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
    if(this.wKey.isDown || this.aKey.isDown || this.sKey.isDown || this.dKey.isDown || this.spaceKey.isDown){}
    else if(this.anims.currentAnim.key === ('A') && this.anims.currentAnim.key !== ('dash')){
        this.sprite.flipX = true;
        this.play('idleA');
        this.body.velocity.x=0;
        this.body.velocity.y=0;
    }
    else if (this.anims.currentAnim.key === ('D') && this.anims.currentAnim.key !== ('dash')){
        this.play('idleD');
        this.body.velocity.x=0;
        this.body.velocity.y=0;
    }
}

playerDie() {
    this.isDead = true;
    this.play('dead');
    //this.destroy()
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