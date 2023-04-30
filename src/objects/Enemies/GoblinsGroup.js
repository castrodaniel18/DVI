import EnemyGroup from "./EnemyGroup";
import Goblin from "./Goblin";

const GOBLINS_IMGKEY = 'goblin';

export default class GoblinsGroup extends EnemyGroup {
    constructor(scene, goblins_num){
        super(scene, GOBLINS_IMGKEY, Goblin, goblins_num);
    }
}