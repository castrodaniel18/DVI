import Item from "./Item";

const DAMAGE_INCREASE_FACTOR = 0.05;//% de incremento de daño
const KNIFE_ITEM_SPRITE = 'knife'
export const KNIFE_ITEM_SPAWN_RATE = 0.0002;

export default class Knife extends Item {
    constructor(scene){
        super(scene, KNIFE_ITEM_SPRITE);
    }

    apply(){
        const scene = this.scene;
        this.scene.player.damageIncrease += DAMAGE_INCREASE_FACTOR;
    }
}