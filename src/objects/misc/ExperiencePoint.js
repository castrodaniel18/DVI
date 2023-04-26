export default class ExperiencePoint extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        this.setScale(0.01);
        this.scene.add.existing(this);
        //addCollisions
    }
}