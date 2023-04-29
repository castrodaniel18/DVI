import Potion from "./Potion";

const LIFE_HEALED = 40;
const LIFE_POTION_SPRITE = 'lifePotion'
export const LIFE_POTION_SPAWN_RATE = 0.0002;

export default class LifePotion extends Potion {
    constructor(scene){
        super(scene, LIFE_POTION_SPRITE);
    }

    apply(){
        if(this.scene.player.health + LIFE_HEALED < this.scene.player.maxHealth)
            this.scene.player.health += LIFE_HEALED;
        else this.scene.player.health = this.scene.player.maxHealth;
    }
}