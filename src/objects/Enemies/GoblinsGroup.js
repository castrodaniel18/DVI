import EnemyGroup from "./EnemyGroup";
import Goblin from "./Goblin";

const GOBLINS_NUM = 20;
const GOBLINS_IMGKEY = 'goblin';

export default class GoblinsGroup extends EnemyGroup {
    constructor(scene){
        super(scene, GOBLINS_IMGKEY, Goblin, GOBLINS_NUM);
    }
}