import Goblin from "./Goblin";
import Ventolin from "./Ventolin";
import Snake from "./Snake";
import Hyena from "./Hyena";
import Scorpio from "./Scorpio";
import Centipede from "./Centipede";
import EnemyGroup from "./EnemyGroup";

export const LEVEL_1 = [{time: 0, enemyType: Goblin, imgKey:'goblin',numEnemies: 5}, 
                         {time: 15000, enemyType: Ventolin, imgKey:'ventolin',numEnemies: 3},
                         {time: 30000, enemyType: Goblin, imgKey:'goblin',numEnemies: 3},
                         {time: 45000, enemyType: Goblin, imgKey:'goblin',numEnemies: 5}, 
                         {time: 45000, enemyType: Ventolin,imgKey:'ventolin',numEnemies: 5},
                         {time: 80000, enemyType: Goblin, imgKey:'goblin',numEnemies: 10}, 
                         {time: 80000, enemyType: Ventolin, imgKey:'ventolin',numEnemies: 7},
                         {time: 140000, enemyType: Centipede,imgKey:'centipede', numEnemies: 1}]

export const LEVEL_2 = [{time: 0, enemyType: Snake,imgKey:'snake', numEnemies: 5}, 
                        {time: 15000, enemyType: Scorpio, imgKey:'scorpio',numEnemies: 3},
                        {time: 30000, enemyType: Hyena, imgKey:'hyena',numEnemies: 5},
                        {time: 30000, enemyType: Scorpio, imgKey:'scorpio',numEnemies: 3}, 
                        {time: 45000, enemyType: Scorpio, imgKey:'scorpio',numEnemies: 5},
                        {time: 45000, enemyType: Snake,imgKey:'snake', numEnemies: 4}, 
                        {time: 80000, enemyType: Scorpio,imgKey:'scorpio', numEnemies: 3},
                        {time: 80000, enemyType: Snake, imgKey:'snake',numEnemies: 4},
                        {time: 80000, enemyType: Hyena, imgKey:'hyena',numEnemies: 3}]


export default class WaveController{
    constructor(scene, level){
        this.scene = scene;
        this.level = level;
        this.enemies = [];
        this.groups = [];
        this.initialTime = Date.now();
        this.initialPauseTime = 0;
        this.pause = false;
        this.leveling = false;
        this.currentWave = 0;
    }

    update(){
        if(!this.leveling){
            if (!this.pause){
                if(this.currentWave < this.level.length && this.level[this.currentWave].time <= (Date.now() - this.initialTime)){
                    if(!this.level[this.currentWave].boss){
                        const group = new EnemyGroup(this.scene,this.level[this.currentWave].imgKey,this.level[this.currentWave
                        ].enemyType, this.level[this.currentWave].numEnemies);
                        this.addEnemiesGroup(group);
                    }
                    this.currentWave++;
                }
        
                if(this.groups.length != 0){
                    this.groups.forEach(currentGroup => {
                        currentGroup.enemyUpdate();
                    });
                }
            }
            else if (this.pause){
                this.initialTime += (new Date().getTime() - this.initialPauseTime);
                this.pause = false;
            }
        }
    }

	addEnemiesGroup(group){
        this.groups.push(group);
		this.enemies.push(...group.enemies);
	}
}