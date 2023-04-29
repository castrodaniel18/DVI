import GoblinsGroup from "./GoblinsGroup";
import VentolinsGroup from "./VentolinGroup";

export const LEVEL_1 = [{time: 0, groupName: GoblinsGroup, numEnemies: 150}, 
            {time: 10000, groupName: VentolinsGroup, numEnemies: 10}, 
            {time: 15000, groupName: GoblinsGroup, numEnemies: 20},
            {time: 15000, groupName: VentolinsGroup, numEnemies: 5},
            {time: 20000, groupName: GoblinsGroup, numEnemies: 10},
            {time: 20000, groupName: VentolinsGroup, numEnemies: 10},
            {time: 22000, groupName: GoblinsGroup, numEnemies: 20},
            {time: 22000, groupName: VentolinsGroup, numEnemies: 10},
            {time: 23000, groupName: GoblinsGroup, numEnemies: 50}]


export const LEVEL_2 = [{time: 0, groupName: GoblinsGroup, numEnemies: 15}, 
            {time: 10000, groupName: VentolinsGroup, numEnemies: 10}, 
            {time: 15000, groupName: GoblinsGroup, numEnemies: 20},
            {time: 15000, groupName: VentolinsGroup, numEnemies: 5},
            {time: 20000, groupName: GoblinsGroup, numEnemies: 10},
            {time: 20000, groupName: VentolinsGroup, numEnemies: 10},
            {time: 22000, groupName: GoblinsGroup, numEnemies: 20},
            {time: 22000, groupName: VentolinsGroup, numEnemies: 10},
            {time: 23000, groupName: GoblinsGroup, numEnemies: 50}]

export default class WaveController{
    constructor(scene, level){
        this.scene = scene;
        this.level = level;
        this.enemies = [];
        this.groups = [];
        this.initialTime = Date.now();

        this.currentWave = 0;
    }

    update(){
        if(this.currentWave < this.level.length && this.level[this.currentWave].time <= (Date.now() - this.initialTime)){
            const group = new this.level[this.currentWave].groupName(this.scene, this.level[this.currentWave].numEnemies);
            this.addEnemiesGroup(group);
            this.currentWave++;
        }

        if(this.groups.length != 0){
            this.groups.forEach(currentGroup => {
                currentGroup.enemyUpdate();
            });
        }
    }

	addEnemiesGroup(group){
		this.scene.physics.add.collider(this.enemies, group.enemies);
        this.groups.push(group);
		this.enemies.push(...group.enemies);
	}

}