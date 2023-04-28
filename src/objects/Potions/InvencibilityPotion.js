import Potion from "./Potion";

const EFFECT_TIME = 10000;
const INVENCIBILITY_POTION_SPRITE = 'invencibilityPotion'
export const INVENCIBILITY_POTION_SPAWN_RATE = 0.002;

export default class InvencibilityPotion extends Potion {
    constructor(scene){
        super(scene, INVENCIBILITY_POTION_SPRITE);
    }

    apply(){
        this.scene.player.isInvencible = true;
        const scene = this.scene;
        this.scene.player.invencibilityShieldAnim.visible = true;
        this.scene.player.invencibilityShieldAnim.anims.play('invencibility_shield', true);
        setTimeout(() => {
            scene.player.isInvencible = false;
            scene.player.invencibilityShieldAnim.visible = false;
        }, EFFECT_TIME);
        this.update();
    }
}