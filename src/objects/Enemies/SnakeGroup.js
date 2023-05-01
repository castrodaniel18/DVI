import EnemyGroup from "./EnemyGroup";
import Snake from "./Snake";

const SNAKE_IMGKEY = 'snake';

export default class SnakesGroup extends EnemyGroup {
    constructor(scene, snakes_num){
        super(scene, SNAKE_IMGKEY, Snake, snakes_num);
    }
}