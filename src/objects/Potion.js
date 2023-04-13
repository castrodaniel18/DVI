export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
      super(scene, x, y, 'potion');
      this.setScale(.15);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.type=type
  
    }
    preUpdate() {
  
      if (this.scene.physics.overlap(this.scene.player, this)) {
        this.scene.player.potion(this.type);
        this.destroy();
      }
    }
  }