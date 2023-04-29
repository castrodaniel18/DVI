export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, spriteKey) {
        super(scene, Phaser.Math.Between(0, scene.game.config.width), Phaser.Math.Between(0, scene.game.config.height), spriteKey);
        this.setScale(.15);
       
        this.scene.physics.add.existing(this, true);
    
    }

    preUpdate() {
        if (this.scene.physics.overlap(this.scene.player, this)) {
            this.apply();
            this.destroy();
        }
    }

    apply(){

    }

    spawn(prob){
        if (Math.random() < prob)
            return true;
        return false;
    }
}