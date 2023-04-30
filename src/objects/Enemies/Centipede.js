import Boss from "./Boss";

const CENTIPEDE_SPRITE = 'centipede';
const CENTIPEDE_HEALTH = 1000;

export default class Centipede extends Boss{
    constructor(scene, x, y){
        super(scene, 200, 200, CENTIPEDE_SPRITE);

        this.health = CENTIPEDE_HEALTH;
        this.createAnimations();
        this.play('centipede');
        this.setScale(3);
        //Controlamos el tamaño de la hitbox inicial
        this.body.setSize(52, 40);
        this.body.offset.set(21, 33);
		this.scene.physics.add.overlap(this.scene.player, this ,this.attack,null,this);
    }

    createAnimations(){
        this.scene.anims.create({
            key:'centipede',
            frames: this.scene.anims.generateFrameNumbers(CENTIPEDE_SPRITE,{start:0,end:3}),
            frameRate: 5,
            repeat: -1
        });
    }

    
    checkAnimation(){
        // if(this.body.velocity.x >= 0 && this.body.velocity.y >= 0)
        //     return 'left_goblin';
        // else if(this.body.velocity.x >= 0 && this.body.velocity.y < 0)
        //     return 'up_goblin';
        // else if (this.body.velocity.x < 0 && this.body.velocity.y < 0)
        //     return'right_goblin';
        // else
            return 'centipede';
    }

    attack(){

    }
}