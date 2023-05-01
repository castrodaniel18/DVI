import Item from "./Item";

const LIFESTEAL_INCREASE_FACTOR = 0.05;//% de incremento de robo de vida
const FANG_ITEM_SPRITE = 'knife'
export const FANG_ITEM_SPAWN_RATE = 0.0002;

export default class Fang extends Item {
    constructor(scene){
        super(scene, FANG_ITEM_SPRITE);
        this.name = 'Fang';
    }

    apply(){
        const scene = this.scene;
        this.scene.player.lifesteal += LIFESTEAL_INCREASE_FACTOR;
    }
}