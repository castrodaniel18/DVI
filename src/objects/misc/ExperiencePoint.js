export default class ExperiencePoint extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.setScale(0.01);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    preUpdate() {
        if (this.scene.physics.overlap(this.scene.player, this)) {
            this.apply();
            this.destroy();
        }
    }

    apply(){
        this.scene.player.playerExp += 25;
    }
}