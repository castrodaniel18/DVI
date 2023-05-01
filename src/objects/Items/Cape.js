import Item from "./Item";

const SPEED_INCREASE_FACTOR = 0.01;//% de velocidad incrementada
const CAPE_ITEM_SPRITE = 'cape'
export const CAPE_ITEM_SPAWN_RATE = 0.25;

export default class Cape extends Item {
    constructor(scene){
        super(scene, CAPE_ITEM_SPRITE);
        this.name = 'Cape';
    }

    apply(){
        const scene = this.scene;
        this.scene.player.speed += this.scene.player.startingSpeed*SPEED_INCREASE_FACTOR;
    }
}