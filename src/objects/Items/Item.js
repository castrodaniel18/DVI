export default class Item extends Phaser.GameObjects.Sprite{
    constructor(scene, spriteKey){
        super(scene,-500,-500,spriteKey);
        this.scene.add.existing(this);
        this.itemLevel=0;
    }

    apply(){

    }

    spawn(prob){
    Math.random()<prob?true:false;
    }

    increaseLevel(){
        if(this.itemLevel<5){
            this.itemLevel++;
        }
    }
}