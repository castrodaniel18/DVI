import Centipede from "./Centipede";
import BossGroup from "./BossGroup";

const CENTIPEDE_IMGKEY = 'centipede';

export default class CentipedeGroup extends BossGroup {
    constructor(scene, centipede_num){
        super(scene, CENTIPEDE_IMGKEY, Centipede, centipede_num);
    
    }
}