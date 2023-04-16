import Potion from "./Potion";

const SPEED_INCREASE_FACTOR = 2;
const EFFECT_TIME = 10000;
const SPEED_POTION_SPRITE = 'strengthPotion'

export default class LifePotion extends Potion {
    constructor(scene){
        super(scene, SPEED_POTION_SPRITE);
        this.scene = scene;
    }

    apply(){
        this.scene.player.speed *= SPEED_INCREASE_FACTOR;
        setTimeout(() => {
            this.scene.player.speed /= SPEED_INCREASE_FACTOR;
        }, EFFECT_TIME);
    }
}