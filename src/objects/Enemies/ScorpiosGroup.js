import EnemyGroup from "./EnemyGroup";
import Scorpio from "./Scorpio";

const SCORPIOS_IMGKEY = 'scorpio';

export default class ScorpiosGroup extends EnemyGroup {
    constructor(scene, scorpios_num){
        super(scene, SCORPIOS_IMGKEY, Scorpio, scorpios_num);
    }
}