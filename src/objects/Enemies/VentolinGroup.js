import EnemyGroup from "./EnemyGroup";
import Ventolin from "./Ventolin";

const VENTOLINS_NUM = 5;
const VENTOLINS_IMGKEY= 'ventolin';

export default class VentolinsGroup extends EnemyGroup {
    constructor(scene){
        super(scene, VENTOLINS_IMGKEY, Ventolin, VENTOLINS_NUM);
    }
}