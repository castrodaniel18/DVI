import Boss from "./Boss";

const CENTIPEDE_SPRITE = 'centipede';
const CENTIPEDE_HEALTH = 1000;
const CENTIPEDE_SPEED = 150;

const ATTACKS_COOLDOWN = [5000, 2000, 7000]

const ATTACKS_TIME = [1000, 4000, 5000]

const ATTACKS_SPEED = [200, 100, 300]

const ATTACKS_DAMAGE = [30, 20, 40]


export default class Centipede extends Boss{
    constructor(scene, x, y){
        super(scene, 200, 200, CENTIPEDE_SPRITE);

        this.health = CENTIPEDE_HEALTH;
        this.createAnimations();
        this.play('centipede');
        this.setScale(3);
        //Controlamos el tamaño de la hitbox inicial
        //CAMINA IZQUIERDA
        // this.body.setSize(52, 40);
        // this.body.offset.set(0, 0);
        //ATAQUE 1 IZQUIERDA
        // this.body.setSize(70, 40);
        // this.body.offset.set(5, 0);
        //ATAQUE 2 IZQUIERDA
        // this.body.setSize(75, 40);
        // this.body.offset.set(0, 0);
        //ATAQUE 3 IZQUIERDA
        // this.body.setSize(64, 28);
        // this.body.offset.set(8, 0);
		this.scene.physics.add.overlap(this.scene.player, this ,this.attack,null,this);
        this.body.onWorldBounds=true;
        this.body.world.on('worldbounds', this.onWorldBoundsFunction, this);
        this.addCollisions();
        this.attackCooldown = false;
    }

    createAnimations(){
        this.scene.anims.create({
            key:'centipede',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE,{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'centipede_attack_1',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_attack_1',{start:0,end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'centipede_attack_2',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_attack_2',{start:0,end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key:'centipede_attack_3',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE + '_attack_3',{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
    }

    
    checkAnimation(){
        if(this.scene.player.x > this.x)
            this.flip = true;
        else
            this.flip = false;
        if(!this.attackCooldown){
            // Generar un número aleatorio entre 0 y 1
            const rand = Math.random();
            // Reproducir la animación en función de la probabilidad
            if (rand < 0.3) {
                this.body.setSize(70, 40);
                if(!this.flip)
                    this.body.offset.set(5, 0);
                else
                    this.body.offset.set(-2, 0);
                this.attackSelected = 0;
                return 'centipede_attack_1';
            } else if (rand < 0.6) {
                this.body.setSize(75, 40);
                if(!this.flip)
                        this.body.offset.set(0, 0);
                    else
                        this.body.offset.set(-2, 0);
                this.attackSelected = 1;
                return 'centipede_attack_2';
            } else {
                this.body.setSize(64, 28);
                if(!this.flip)
                    this.body.offset.set(8, 0);
                else
                    this.body.offset.set(0, 0);
                this.attackSelected = 2;
                return 'centipede_attack_3';
            }
        }
        else if (this.canMove){
            this.body.setSize(52, 40);
            if(!this.flip)
                this.body.offset.set(0, 0);
            else
                this.body.offset.set(20, 0);
            return 'centipede';
        }
        else return null;
    }

    attack(){
        if(!this.attackCooldown){
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.body.bounce.set(0);
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
            this.canMove = false;
            setTimeout(() => {
                this.canMove = true;
                this.setRotation(0);
                this.flipY = false;
            }, ATTACKS_TIME[this.attackSelected]);
        }
        else if(this.canMove){
            if(Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) > 80)
            this.scene.physics.moveToObject(this, this.scene.player, CENTIPEDE_SPEED);
        }
    }

    attack1(){
        this.damage = ATTACKS_DAMAGE[this.attackSelected];
        this.speed = ATTACKS_SPEED[this.attackSelected];
    }

    
    attack2(){
        this.damage = ATTACKS_DAMAGE[this.attackSelected];
        this.speed = ATTACKS_SPEED[this.attackSelected];
    }
    
    attack3(){
        this.damage = ATTACKS_DAMAGE[this.attackSelected];
        this.speed = ATTACKS_SPEED[this.attackSelected];
        this.angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        this.setRotation(this.angle);
        this.scene.physics.moveToObject(this, this.scene.player, this.speed);
        this.body.bounce.set(1);
    }

    onWorldBoundsFunction(body){
        if(this.angle < 0)
            this.setAngle(-180 - this.angle);
        else
            this.setAngle(180 - this.angle);
        this.flipY = !this.flipY;

      }

}