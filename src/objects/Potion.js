export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'potion');
      this.setScale(.15);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
  
    }
    preUpdate() {
  
      if (this.scene.physics.overlap(this.scene.player, this)) {
        this.scene.player.potion();
        this.destroy();
      }
    }
  }