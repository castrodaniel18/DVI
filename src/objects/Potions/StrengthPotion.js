import Potion from "./Potion";

const DAMAGE_INCREASE_FACTOR = 2;
const EFFECT_TIME = 10000;
const STRENGTH_POTION_SPRITE = 'strengthPotion'
export const STRENGTH_POTION_SPAWN_RATE = 0.0002;

export default class StrengthPotion extends Potion {
    constructor(scene){
        super(scene, STRENGTH_POTION_SPRITE);
    }

    apply(){
        this.scene.player.damage *= DAMAGE_INCREASE_FACTOR;
        const scene = this.scene;
        this.scene.player.buffDamageAnim.visible = true;
        this.scene.player.buffDamageAnim.anims.play('damage_buff', true);
        setTimeout(() => {
            scene.player.damage /= DAMAGE_INCREASE_FACTOR;
            scene.player.buffDamageAnim.visible = false;
        }, EFFECT_TIME);
    }
}