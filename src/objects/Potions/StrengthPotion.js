import Potion from "./Potion";

const DAMAGE_INCREASE_FACTOR = 2;
const EFFECT_TIME = 10000;
const STRENGTH_POTION_SPRITE = 'strengthPotion'

export default class LifePotion extends Potion {
    constructor(scene){
        super(scene, STRENGTH_POTION_SPRITE);
        this.scene = scene;
    }

    apply(){
        this.scene.player.damage *= DAMAGE_INCREASE_FACTOR;
        setTimeout(() => {
            this.scene.player.damage /= DAMAGE_INCREASE_FACTOR;
        }, EFFECT_TIME);
    }
}