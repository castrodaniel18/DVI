import ProjectileGroup from "./ProjectileGroup";
import Fireball, {FIREBALL_IMGKEY_NAME} from "./Fireball";

const NUM_FIREBALLS = 10;

export default class FireballGroup extends ProjectileGroup{

    constructor(scene){
        super(scene, FIREBALL_IMGKEY_NAME, Fireball, NUM_FIREBALLS);
    }
    
}