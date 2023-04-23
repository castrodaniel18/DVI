import LifePotion, {LIFE_POTION_SPAWN_RATE} from "./LifePotion";
import SpeedPotion, {SPEED_POTION_SPAWN_RATE} from "./SpeedPotion";
import StrengthPotion, {STRENGTH_POTION_SPAWN_RATE} from "./StrengthPotion";
import InvencibilityPotion, {INVENCIBILITY_POTION_SPAWN_RATE} from "./InvencibilityPotion";

const POTIONS = [LifePotion, SpeedPotion, StrengthPotion, InvencibilityPotion];
const SPAWN_RATES = [LIFE_POTION_SPAWN_RATE, SPEED_POTION_SPAWN_RATE, STRENGTH_POTION_SPAWN_RATE, INVENCIBILITY_POTION_SPAWN_RATE];

export default class Potions{
    constructor(scene){
        this.scene = scene;
    }

    trySpawn(){
        POTIONS.forEach((potion, index) => {
            if(Math.random() < SPAWN_RATES[index])
                this.scene.add.existing(new potion(this.scene));
        });
    }
}