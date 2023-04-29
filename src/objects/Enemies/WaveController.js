import GoblinsGroup from "./GoblinsGroup";
import VentolinsGroup from "./VentolinGroup";

const LEVEL_1 = [{time: 0, groupName: GoblinsGroup, numEnemies: 15}, 
            {time: 10000, groupName: VentolinsGroup, numEnemies: 10}, 
            {time: 15000, groupName: GoblinsGroup, numEnemies: 20},
            {time: 15000, groupName: VentolinsGroup, numEnemies: 5},
            {time: 20000, groupName: GoblinsGroup, numEnemies: 10},
            {time: 20000, groupName: VentolinsGroup, numEnemies: 10},
            {time: 22000, groupName: GoblinsGroup, numEnemies: 20},
            {time: 22000, groupName: VentolinsGroup, numEnemies: 10},
            {time: 23000, groupName: GoblinsGroup, numEnemies: 50}]


const LEVEL_2 = [[0, GoblinsGroup, 15], 
            [10000, VentolinsGroup, 10], 
            [15000, GoblinsGroup, 20],
            [15000, VentolinsGroup, 5],
            [20000, GoblinsGroup, 10],
            [20000, VentolinsGroup, 10],
            [22000, GoblinsGroup, 20],
            [22000, VentolinsGroup, 10],
            [23000, GoblinsGroup, 50]]

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
        console.log(this.currentWave);
        console.log(LEVEL_1.length);
        if(this.currentWave < LEVEL_1.length && LEVEL_1.at(this.currentWave).time <= (Date.now() - this.initialTime)){
            const group = new LEVEL_1[this.currentWave].groupName(this.scene);
            this.addEnemiesGroup(group);
            this.currentWave++;
        }

        if(this.groups.length != 0){
            this.groups.forEach(currentGroup => {
                console.log(currentGroup);
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