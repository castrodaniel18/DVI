import Item from "./Item";

const DAMAGE_DECREASE_FACTOR = 0.01;
const STONE_ITEM_SPRITE = 'stone'
export const STONE_ITEM_SPAWN_RATE = 0.0002;

export default class Stone extends Item {
    constructor(scene){
        super(scene, STONE_ITEM_SPRITE);
        this.name = 'Stone';
    }

    apply(){
        const scene = this.scene;
        this.scene.player.dmageReduction += DAMAGE_DECREASE_FACTOR;
    }
}