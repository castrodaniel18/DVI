import Potion from "./Potion";

const EFFECT_TIME = 10000;
const INVENCIBILITY_POTION_SPRITE = 'invencibilityPotion'

export default class LifePotion extends Potion {
    constructor(scene){
        super(scene, INVENCIBILITY_POTION_SPRITE);
        this.scene = scene;
    }

    apply(){
        this.scene.player.isInvincible = true;
        setTimeout(() => {
            this.scene.player.isInvincible = false;
        }, EFFECT_TIME);
    }
}