//Licencia para gdd: https://craftpix.net/file-licenses/

import { Scene } from "phaser";

const LEVELS = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
const DASH_TIME = 300;
const DASH_COOLDOWN = 5000;
const DASH_SPEED_FACTOR = 4;
const INVENCIBILITY_SHIELD_SPRITE = 'invencibility_shield';
const DAMAGE_BUFF_SPRITE = 'damage_buff';
const SPEED_BUFF_SPRITE = 'speed_buff';
const HEALING_SPRITE = 'healing';

export default class Mage extends Phaser.GameObjects.Sprite {
    /** 
    *  @param {Scene} scene - escena en la que aparece
    *  @param {number} x - coordenada x de spawn
    *  @param {number} y - coordeada y de spawn
    */
    constructor(scene, x, y, name, sprite, health, damage, speed, critProb, inventorySize) {
        super(scene, x, y, sprite);
        this.scene.add.existing(this);
        this.setScale(1);
        this.sprite = sprite;
        //Parametros básicos
        this.name = name;
        this.maxHealth = health;
        this.health = health;
        this.speed = speed;
        this.baseSpeed = speed;
        this.damage = damage;
        this.critProb = critProb;
        this.damageIncrease = 0;
        this.damageReduction = 0;
        this.lifesteal = 0;
        this.playerExp = 0;
        this.isDead = false;

        //variables auxiliares
        this.dashTime = DASH_TIME;
        this.dashCooldown = DASH_COOLDOWN;
        this.dashSpeedFactor = DASH_SPEED_FACTOR;
        this.canMove = true;
        this.canDash = true;
        this.isInvencible = false;
        this.playerLevel = 1;
        this.godModeOn = false;

        this.inventorySize = inventorySize;
        //Se define el movimiento y idles
        this.createAnimations();
        this.play(this.name+'idleA');
        this.defineControls();

        //Se añade a la escena y se añaden colisiones con el mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        //Se ajusta la hitbox del personaje
        this.body.setSize(35, 70);
        this.body.offset.set(55, 60);

        this.invencibilityShieldAnim = this.scene.add.sprite(this.x, this.y + 30, 'invencibility_shield');
        this.invencibilityShieldAnim.visible = false;

        this.buffDamageAnim = this.scene.add.sprite(this.x + 50, this.y - 17, 'damage_buff');
        this.buffDamageAnim.visible = false;

        this.buffSpeedAnim = this.scene.add.sprite(this.x + 50, this.y - 17, 'damage_buff');
        this.buffSpeedAnim.visible = false;

        this.healingAnim = this.scene.add.sprite(this.x - 10, this.y + 40, 'healing');
        this.healingAnim.visible = false;
    }

    /**
     * @param {number} t
     * @param {number} dt
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.health <= 0) {
            this.playerDie();
            return;
        }

        if (this.canMove) {
            this.checkMove();
            this.checkIdle();
            this.checkLevelUp();
            this.checkHitBox();
        }
        this.invencibilityShieldAnim.x = this.x;
        this.invencibilityShieldAnim.y = this.y + 30;
        this.buffDamageAnim.x = this.x + 50;
        this.buffDamageAnim.y = this.y - 17;
        if (!this.buffDamageAnim.visible) {
            this.buffSpeedAnim.x = this.x + 50;
            this.buffSpeedAnim.y = this.y - 17;
        }
        else {
            this.buffSpeedAnim.x = this.x + 70;
            this.buffSpeedAnim.y = this.y - 17;
        }
        this.healingAnim.x = this.x - 10;
        this.healingAnim.y = this.y + 40;

        if (Phaser.Input.Keyboard.JustDown(this.gKey)) { this.godMode(); }
    }

    defineControls() {
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.aKey = this.scene.input.keyboard.addKey('A');
        this.sKey = this.scene.input.keyboard.addKey('S');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.gKey = this.scene.input.keyboard.addKey('G');
        this.spaceKey = this.scene.input.keyboard.addKey('SPACE');
    }

    createAnimations() {
        this.scene.anims.create({
            key: this.name + 'D',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_move', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + 'A',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_move', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + 'idleA',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_idle', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: this.name + 'idleD',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_idle', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.name+'dead',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_dead', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'invencibility_shield',
            frames: [
                { key: INVENCIBILITY_SHIELD_SPRITE, frame: 0 },
            ],
            frameRate: 5,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'damage_buff',
            frames: [
                { key: DAMAGE_BUFF_SPRITE, frame: 0 },
            ],
            frameRate: 5,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'speed_buff',
            frames: [
                { key: SPEED_BUFF_SPRITE, frame: 0 },
            ],
            frameRate: 10,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'healing',
            frames: this.scene.anims.generateFrameNumbers(HEALING_SPRITE, { start: 0, end: 15 }),
            frameRate: 10,
            repeat: 0
        });
    }

    checkMove() {
        if (this.aKey.isDown) {
            if (this.wKey.isDown || this.sKey.isDown || this.dKey.isDown) { }
            else if (this.anims.currentAnim.key !== (this.name + 'A')) {
                this.play(this.name + 'A').flipX = true;
            }
            this.body.velocity.x = -this.speed;
        }
        if (this.sKey.isDown) {
            if (this.aKey.isDown || this.dKey.isDown || this.wKey.isDown) { }
            else if (this.anims.currentAnim.key == (this.name + 'idleA')) {
                this.play(this.name + 'A').flipX = true;
            }
            else if (this.anims.currentAnim.key == (this.name + 'idleD')) {
                this.play(this.name + 'D').flipX = false;
            }
            this.body.velocity.y = this.speed;
        }
        if (this.dKey.isDown) {
            if (this.wKey.isDown || this.sKey.isDown || this.aKey.isDown) { }
            else if (this.anims.currentAnim.key !== (this.name + 'D')) {
                this.play(this.name + 'D').flipX = false;
            }
            this.body.velocity.x = this.speed;
        }
        if (this.wKey.isDown) {
            if (this.aKey.isDown || this.dKey.isDown || this.sKey.isDown) { }
            else if (this.anims.currentAnim.key == (this.name + 'idleA')) {
                this.play(this.name + 'A').flipX = true;
            }
            else if (this.anims.currentAnim.key == (this.name + 'idleD')) {
                this.play(this.name + 'D').flipX = false;
            }
            this.body.velocity.y = -this.speed;
        }

        if (this.aKey.isDown && this.sKey.isDown) {
            if (this.wKey.isDown || this.dKey.isDown) { }
            else if (this.anims.currentAnim.key !== this.name + 'A') {
                this.play(this.name + 'A').flipX = true;
            }
        }
        if (this.sKey.isDown && this.dKey.isDown) {
            if (this.wKey.isDown || this.aKey.isDown) { }
            else if (this.anims.currentAnim.key !== this.name + 'D') {
                this.play(this.name + 'D').flipX = false;
            }
        }
        if (this.wKey.isDown && this.dKey.isDown) {
            if (this.aKey.isDown || this.sKey.isDown) { }
            else if (this.anims.currentAnim.key !== this.name + 'D') {
                this.play(this.name + 'D').flipX = false;
            }
        }
        if (this.wKey.isDown && this.aKey.isDown) {
            if (this.dKey.isDown || this.sKey.isDown) { }
            else if (this.anims.currentAnim.key !== this.name + 'A') {
                this.play(this.name + 'A').flipX = true;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            if (this.canDash) {
                this.dash();
            }
        }
        let aux = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);
        aux.normalize();
        this.body.setVelocity(this.speed * aux.x, this.speed * aux.y);
    }

    dash() {
        this.canDash = false;
        this.canMove = false;
        this.speed *= this.dashSpeedFactor;
        this.isInvencible = true;
        this.setTint(0x38FCFF); // Cambiar el color del personaje a azul
        this.alpha = 0.5;
        this.dashing = true;
        setTimeout(() => {
            this.speed /= this.dashSpeedFactor;
            this.isInvencible = false;
            this.canMove = true;
            this.dashing = false;
            setTimeout(() => {
                this.canDash = true;
            }, this.dashCooldown);
            this.clearTint(); // Restablecer el color original del personaje
            this.alpha = 1;
        }, this.dashTime);
    }

    checkIdle() {
        if (this.wKey.isDown || this.aKey.isDown || this.sKey.isDown || this.dKey.isDown || this.spaceKey.isDown) { }
        else if (this.anims.currentAnim.key === (this.name+'A') && this.anims.currentAnim.key !== ('dash')) {
            this.play(this.name+'idleA').flipX = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        else if (this.anims.currentAnim.key === (this.name+'D') && this.anims.currentAnim.key !== ('dash')) {
            this.play(this.name+'idleD').flipX = false;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    playerDie() {
        this.isDead = true;
        this.play(this.name+'dead');
        //this.destroy()
    }

    checkLevelUp() {
        if (this.playerExp >= LEVELS[this.playerLevel - 1]) {
            this.playerLevel++;
            this.scene.waveController.initialPauseTime = new Date();
            this.scene.waveController.pause = true;
            this.scene.waveController.leveling = true;
            this.scene.scene.pause();
            this.scene.scene.pause('UIScene');
            this.scene.scene.run('ItemSelectScene', { mainScene: 'UIScene' });
        }
    }

    getHit(damage) {
        if (!this.isInvencible && !this.godModeOn) {
            this.health -= (damage * (1 - this.damageReduction));
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

    shoot(pointerX, pointerY, castTime) {
        if (this.canMove) {
            this.canMove = false;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.lookingLeft = false;
            if (this.x > pointerX) {
                this.play(this.name+'shoot').flipX = true;
                this.lookingLeft = true;

                //Ajustamos la hitbox para la animación de disparo
                this.body.setSize(35, 70);
                this.body.offset.set(57, 60);
            }
            else {
                this.play(this.name+'shoot').flipX = false;

                //Ajustamos la hitbox para la animación de disparo
                this.body.setSize(35, 70);
                this.body.offset.set(37, 60);
            }

            this.scene.time.delayedCall(castTime, () => {
                this.canMove = true;
                if (this.lookingLeft === true)
                    this.play(this.name+'idleA');
                else
                    this.play(this.name+'idleD');
                this.weapon.shoot(pointerX, pointerY);
            });
        }
    }
    godMode() {
        this.godModeOn = !this.godModeOn;
        if (this.godModeOn) {
            this.damage += 1000;
            console.log("God mode activated");
        }
        else {
            this.damage -= 1000;
            console.log("God mode deactivated")
        }

    }
}