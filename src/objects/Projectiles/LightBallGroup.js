import ProjectileGroup from "./ProjectileGroup";
import Lightball, {LIGHTBALL_IMGKEY_NAME} from "./Lightball";

export default class lightballGroup extends ProjectileGroup{

    constructor(scene, num_lightballs){
        super(scene, LIGHTBALL_IMGKEY_NAME, Lightball, num_lightballs);
    }
    
}