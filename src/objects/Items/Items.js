import Fang, {FANG_ITEM_SPAWN_RATE} from "./Fang"
import Cape, {CAPE_ITEM_SPAWN_RATE} from "./Cape"
import Knife, {KNIFE_ITEM_SPAWN_RATE} from "./Knife"
import Stone, {STONE_ITEM_SPAWN_RATE} from "./Stone"


export const ITEMS = [Stone, Cape, Knife, Fang];
const SPAWN_RATES = [FANG_ITEM_SPAWN_RATE,CAPE_ITEM_SPAWN_RATE,KNIFE_ITEM_SPAWN_RATE,STONE_ITEM_SPAWN_RATE];

export default class Items{
    constructor(scene){
        this.scene = scene;
    }

    trySpawn(){
        ITEMS.forEach((item, index) => {
            if(Math.random() < SPAWN_RATES[index])
                this.scene.add.existing(new item(this.scene));
        });
    }
    getItems(){
        return ITEMS;
    }
}