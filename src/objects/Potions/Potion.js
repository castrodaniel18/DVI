const SPAWN_POTION_EFFECT = 'spawn_potion_effect';
const SPAWN_POTION_TIME = 1300;

export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, spriteKey) {
        super(scene, Phaser.Math.Between(0, scene.game.config.width), Phaser.Math.Between(0, scene.game.config.height), spriteKey);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.createSpawnAnimation();
        this.spawnPotionAnim = this.scene.add.sprite(this.x, this.y, 'spawn_potion_effect');
        this.spawnPotionAnim.visible = true;
        this.spawnPotionAnim.play('spawn_potion_effect');
        setTimeout(() => {
            this.spawnPotionAnim.visible = false;
        }, SPAWN_POTION_TIME);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.scene.physics.overlap(this.scene.player, this)) {
            this.apply();
            this.destroy();
        }
    }

    createSpawnAnimation(){
        this.scene.anims.create({
            key:'spawn_potion_effect',
            frames: this.scene.anims.generateFrameNumbers(SPAWN_POTION_EFFECT,{start:0,end:12}),
            frameRate: 10,
            repeat: 0
        });
    }

    spawn(prob){
        if (Math.random() < prob)
            return true;
        return false;
    }
}