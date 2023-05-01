import EnemyGroup from "./EnemyGroup";
import Hyena from "./Hyena";

const HYENAS_IMGKEY = 'hyena';

export default class HyenasGroup extends EnemyGroup {
    constructor(scene, hyenas_num){
        super(scene, HYENAS_IMGKEY, Hyena, hyenas_num);
    }
}