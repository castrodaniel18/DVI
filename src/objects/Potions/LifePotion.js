import Potion from "./Potion";

const LIFE_HEALED = 40;
const LIFE_POTION_SPRITE = 'lifePotion'

export default class LifePotion extends Potion {
    constructor(scene){
        super(scene, LIFE_POTION_SPRITE);
        this.scene = scene;
    }

    apply(){
        this.scene.player.health += LIFE_HEALED;
    }
}