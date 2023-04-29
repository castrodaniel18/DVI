import Potion from "./Potion";

const SPEED_INCREASE_FACTOR = 1.5;
const EFFECT_TIME = 10000;
const SPEED_POTION_SPRITE = 'speedPotion'
export const SPEED_POTION_SPAWN_RATE = 0.0002;

export default class SpeedPotion extends Potion {
    constructor(scene){
        super(scene, SPEED_POTION_SPRITE);
    }

    apply(){
        const scene = this.scene;
        this.scene.player.speed *= SPEED_INCREASE_FACTOR;
        this.scene.player.buffSpeedAnim.visible = true;
        this.scene.player.buffSpeedAnim.anims.play('speed_buff', true);
        setTimeout(() => {
            scene.player.speed /= SPEED_INCREASE_FACTOR;
            scene.player.buffSpeedAnim.visible = false;
        }, EFFECT_TIME);
    }
}