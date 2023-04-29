import EnemyGroup from "./EnemyGroup";
import Ventolin from "./Ventolin";

const VENTOLINS_IMGKEY= 'ventolin';

export default class VentolinsGroup extends EnemyGroup {
    constructor(scene, ventolins_num){
        super(scene, VENTOLINS_IMGKEY, Ventolin, ventolins_num);
    }
}