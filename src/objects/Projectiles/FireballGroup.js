import ProjectileGroup from "./ProjectileGroup";
import Fireball, {FIREBALL_IMGKEY_NAME} from "./Fireball";

export default class FireballGroup extends ProjectileGroup{

    constructor(scene, num_fireballs,fireballDamage){
        super(scene, FIREBALL_IMGKEY_NAME, Fireball, num_fireballs, fireballDamage);
    }
    
}