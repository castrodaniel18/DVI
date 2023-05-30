import Boss from "./Boss";
import ExperiencePointGroup from "../misc/ExperiencePointGroup";

const CENTIPEDE_SPRITE = 'centipede';
const CENTIPEDE_HEALTH = 700;
const CENTIPEDE_SPEED = 80;

const SPAWN_ENEMY_EFFECT = 'spawn_enemy_effect';
const DESTROY_ENEMY_EFFECT = 'destroy_enemy_effect';
const SPAWN_ENEMY_TIME = 1300;
const DESTROY_ENEMY_TIME = 1000;

const DAMAGE_COLOR = '0xFF0000';
const DAMAGE_TEXT_COLOR = '#FF0000';
const CRIT_DAMAGE_TEXT_COLOR = '#FFFF00';

const ATTACKS_COOLDOWN = [5000, 2000, 14000]

const ATTACKS_TIME = [1000, 4000, 2000]

const ATTACKS_SPEED = [200, 100, 500]

const ATTACKS_DAMAGE = [30, 20, 40]


export default class Centipede extends Boss {
    constructor(scene, x, y) {
        super(scene, x, y, CENTIPEDE_SPRITE);
        this.health = CENTIPEDE_HEALTH;
        this.canMove = false;
        this.unstoppable = false;
        this.createAnimations();
        this.body.onWorldBounds = 1;
        this.play('centipede_walk');
        this.setScale(3);
        this.scene.physics.add.overlap(this.scene.player, this, this.hitPlayer, null, this);
        this.body.world.on('worldbounds', this.onWorldBoundsFunction, this);
        this.addCollisions();
        this.attackCooldown = true;
        setTimeout(() => {
            this.attackCooldown = false;
        }, 4000);

        this.createSpawnAnimation();
        this.spawnEnemyAnim = this.scene.add.sprite(this.x, this.y + 10, 'spawn_enemy_effect');
        this.spawnEnemyAnim.visible = true;
        this.spawnEnemyAnim.play('spawn_enemy_effect');
        setTimeout(() => {
            this.spawnEnemyAnim.visible = false;
            this.canMove = true;
        }, SPAWN_ENEMY_TIME);

        this.createDestroyAnimation();
        this.destroyEnemyAnim = this.scene.add.sprite(this.x, this.y + 10, 'destroy_enemy_effect');
        this.destroyEnemyAnim.visible = false;
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'centipede_walk',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE, { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'centipede_attack_1',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_attack_1', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'centipede_attack_2',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_attack_2', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'centipede_attack_3',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_attack_3', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'centipede_death',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_death', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });
    }


    checkAnimation() {
        if (this.scene.player.x >this.x){
            this.flipX = true;
        }
        else
            this.flipX = false;
        if (!this.attackCooldown) {
            this.playerDistance = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
            if (this.playerDistance < 500) {
                // Generar un número aleatorio entre 0 y 1
                const rand = Math.random();
                // Reproducir la animación en función de la probabilidad
                if (rand < 0.3 && this.playerDistance > 40) {
                    this.body.setSize(70, 40);
                    if (!this.flipX)
                        this.body.offset.set(5, 0);
                    else
                        this.body.offset.set(-2, 0);
                    this.attackSelected = 0;
                    return 'centipede_attack_1';
                } else if (rand < 0.6 && this.playerDistance > 50) {
                    this.body.setSize(75, 40);
                    if (!this.flipX)
                        this.body.offset.set(0, 0);
                    else
                        this.body.offset.set(-2, 0);
                    this.attackSelected = 1;
                    return 'centipede_attack_2';
                } else if (this.playerDistance > 80) {
                    this.body.setSize(64, 28);
                    if (!this.flipX)
                        this.body.offset.set(8, 0);
                    else
                        this.body.offset.set(0, 0);
                    this.attackSelected = 2;
                    this.unstoppable = true;
                    return 'centipede_attack_3';
                }
            }
        }
        else if (!this.isAttacking) {
            this.unstoppable = false;
            if (!this.colliderSet) this.addCollisions();
            this.body.setSize(52, 40);
            if (!this.flipX)
                this.body.offset.set(0, 0);
            else
                this.body.offset.set(20, 0);
            return 'centipede_walk';
        }
        else return null;
    }

    attack() {
        if (!this.attackCooldown) {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.hasHitPlayer = false;
            switch (this.attackSelected) {
                case 0:
                    this.attack1();
                    break;
                case 1:
                    this.attack2();
                    break;
                case 2:
                    this.attack3();
                    break;
            }
            this.attackCooldown = true;
            setTimeout(() => {
                this.attackCooldown = false;
            }, ATTACKS_COOLDOWN[this.attackSelected]);
            this.isAttacking = true;
            this.canMove = false;
            setTimeout(() => {
                this.canMove = true;
                this.isAttacking = false;
                this.setRotation(0);
                this.flipY = false;
            }, ATTACKS_TIME[this.attackSelected]);
        }
        else if (this.canMove) {
            if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 80)
                this.scene.physics.moveToObject(this, this.scene.player, CENTIPEDE_SPEED);
        }
    }

    attack1() {
        this.damage = ATTACKS_DAMAGE[this.attackSelected];
        this.speed = ATTACKS_SPEED[this.attackSelected];
    }


    attack2() {
        this.damage = ATTACKS_DAMAGE[this.attackSelected];
        this.speed = ATTACKS_SPEED[this.attackSelected];
    }

    attack3() {
        this.damage = ATTACKS_DAMAGE[this.attackSelected];
        this.speed = ATTACKS_SPEED[this.attackSelected];
        this.angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        this.degrees = this.angle * (180 / Math.PI)
        if (this.degrees > 90) {
            this.setAngle(this.degrees - 180);
        }
        else if (this.degrees < -90) {
            this.setAngle(this.degrees + 180);
        }
        else
            this.setRotation(this.angle);

        this.scene.physics.moveToObject(this, this.scene.player, this.speed);
    }

    onWorldBoundsFunction(body) {
        if (this.angle < 0)
            this.setAngle(-180 - this.angle);
        else
            this.setAngle(180 - this.angle);
        this.flipY = !this.flipY;

    }

    getHit(enemy, projectile) {
        if (this.colliderSet) {
            this.crit = 1;
            if (Math.random() < this.scene.player.critProb) {
                this.crit = 1.5;
                this.damageColor = CRIT_DAMAGE_TEXT_COLOR;
            }
            else
                this.damageColor = DAMAGE_TEXT_COLOR;

            this.texto.text = projectile.damage * this.crit;
            this.texto.setColor(this.damageColor);

            this.health -= Math.round(projectile.damage * this.crit);
            let stolenLife = Math.ceil(this.scene.player.lifesteal * projectile.damage * this.crit);//cantidad de vida robada redondeada
            if (this.scene.player.health + stolenLife < this.scene.player.maxHealth) {//comprueba la vida para no hacer overflow con el lifesteal
                this.scene.player.health += stolenLife;
            }
            else {
                this.scene.player.health = this.scene.player.maxHealth;
            }


            if (!this.unstoppable) {
                this.velocidad = -5;
                this.angulo = Phaser.Math.Angle.BetweenPoints(this, projectile);
                this.body.setVelocity(Math.cos(this.angulo) * this.velocidad, Math.sin(this.angulo) * this.velocidad);
                this.canMove = false;
            }
            projectile.destroy();
            this.texto.setVisible(true);
            this.setTint(DAMAGE_COLOR); // Cambiar el color del personaje a rojo
            this.scene.time.addEvent({
                delay: 200, // La duración del efecto en milisegundos
                callback: () => {
                    this.clearTint(); // Restablecer el color original del personaje
                    this.canMove = true;
                    this.texto.setVisible(false);
                },
                callbackScope: this
            });
            console.log(this.health)
            if (this.isDead()) {
                this.body.setSize(64,40);
                this.play('centipede_death');
                this.scene.time.delayedCall(DESTROY_ENEMY_TIME * 1.5, () => {
                    this.destroyEnemyAnim.visible = true;
                    this.destroyEnemyAnim.x = this.body.center.x;
                    this.destroyEnemyAnim.y = this.body.center.y;
                    this.destroyEnemyAnim.play('destroy_enemy_effect');
                    this.setVisible(false);
                });
                this.colliderSet = false;
                this.scene.physics.world.removeCollider(this.collider);
                let auxScene = this.scene;
                this.scene.time.delayedCall(DESTROY_ENEMY_TIME * 2.5, () => {
                    this.destroyEnemyAnim.visible = false;
                    this.expDrop = new ExperiencePointGroup(auxScene, this.x, this.y);
                    this.scene.count++;
                    this.destroy();
                });
            }
        }
    }

    hitPlayer() {
        if (!this.hasHitPlayer) {
            this.scene.player.getHit(this.damage);
            this.hasHitPlayer = true;
        }
    }

    addCollisions() {
        this.collider = this.scene.physics.add.overlap(this.scene.player.weapon, this, this.getHit, null, this);
        this.colliderSet = true;
    }
    createDestroyAnimation() {
        this.scene.anims.create({
            key: 'destroy_enemy_effect',
            frames: this.scene.anims.generateFrameNumbers(DESTROY_ENEMY_EFFECT, { start: 0, end: 14 }),
            frameRate: 15,
            repeat: 0,
        });
    }
    createSpawnAnimation() {
        this.scene.anims.create({
            key: 'spawn_enemy_effect',
            frames: this.scene.anims.generateFrameNumbers(SPAWN_ENEMY_EFFECT, { start: 0, end: 12 }),
            frameRate: 10,
            repeat: 0
        });
    }
    enemyUpdate() {
        if (!this.isDead())
            this.attack();

    }
}