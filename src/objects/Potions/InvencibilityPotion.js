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
        setTimeout(() => {
            scene.player.isInvencible = false;
        }, EFFECT_TIME);
    }
}