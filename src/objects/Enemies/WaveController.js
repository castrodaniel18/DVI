import GoblinsGroup from "./GoblinsGroup";
import VentolinsGroup from "./VentolinGroup";
import SnakeGroup from "./SnakeGroup";
import HyenasGroup from "./HyenaGroup";
import ScorpiosGroup from "./ScorpiosGroup";
import CentipedeGroup from "./CentipedeGroup";

export const LEVEL_1 = [{time: 0, boss: false, groupName: GoblinsGroup, numEnemies: 5}, 
                        {time: 15000, boss: false, groupName: VentolinsGroup, numEnemies: 3},
                        {time: 30000, boss: false, groupName: GoblinsGroup, numEnemies: 3},
                        {time: 45000, boss: false, groupName: GoblinsGroup, numEnemies: 5}, 
                        {time: 45000, boss: false, groupName: VentolinsGroup, numEnemies: 5},
                        {time: 80000, boss: false, groupName: GoblinsGroup, numEnemies: 10}, 
                        {time: 80000, boss: false, groupName: VentolinsGroup, numEnemies: 7},
                        {time: 140000, boss: true, groupName: CentipedeGroup, numEnemies: 1}]

export const LEVEL_2 = [{time: 0, boss: false, groupName: SnakeGroup, numEnemies: 5}, 
                        {time: 15000, boss: false, groupName: ScorpiosGroup, numEnemies: 3},
                        {time: 30000, boss: false, groupName: HyenasGroup, numEnemies: 5},
                        {time: 30000, boss: false, groupName: ScorpiosGroup, numEnemies: 3}, 
                        {time: 45000, boss: false, groupName: ScorpiosGroup, numEnemies: 5},
                        {time: 45000, boss: false, groupName: SnakeGroup, numEnemies: 4}, 
                        {time: 80000, boss: false, groupName: ScorpiosGroup, numEnemies: 3},
                        {time: 80000, boss: false, groupName: SnakeGroup, numEnemies: 4},
                        {time: 80000, boss: false, groupName: HyenasGroup, numEnemies: 3}]

export const LEVEL_DEMO_BOSS = [{time: 0, boss: true, bossName: Centipede, numEnemies: 1}]


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
                        const group = new this.level[this.currentWave].groupName(this.scene, this.level[this.currentWave].numEnemies);
                        this.addEnemiesGroup(group);
                    }
                    else {
                        const boss = new this.level[this.currentWave].groupName(this.scene,this.level[this.currentWave].numEnemies);
                        console.log("boss")
                        this.addEnemiesGroup(boss);
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
		//this.scene.physics.add.collider(this.enemies, group.enemies);
        this.groups.push(group);
		this.enemies.push(...group.enemies);
	}

    addBoss(boss){
		//this.scene.physics.add.collider(this.enemies, boss);
		//this.enemies.push(boss);
	}

}