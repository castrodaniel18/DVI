import ProjectileGroup from "./ProjectileGroup";
import Electroball, {ELECTROBALL_IMGKEY_NAME} from "./Electroball";

export default class ElectroballGroup extends ProjectileGroup{

    constructor(scene, num_electroball){
        super(scene, ELECTROBALL_IMGKEY_NAME, Electroball, num_electroball);
    }
    
}