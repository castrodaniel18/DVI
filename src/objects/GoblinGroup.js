import Goblin from "./Goblin";


export default class GoblinGroup extends Phaser.Physics.Arcade.Group{

    constructor(scene){
        super(scene.physics.world, scene);
        this.numGoblins = 3;
        this.goblins = []
        this.createGoblins();
    }
    createGoblins() {
        for(let i=0; i<this.numGoblins; i++) {
            const randomBorder = Math.floor(Math.random() * 4);
            let x, y;
            if (randomBorder === 0) { // Izquierda
                x = 0;
                y = Math.random() * 600;
              } else if (randomBorder === 1) { // Derecha
                x = 800;
                y = Math.random() * 600;
              } else if (randomBorder === 2) { // Arriba
                x = Math.random() * 800;
                y = 0;
              } else { // Abajo
                x = Math.random() * 800;
                y = 600;
              }
            const goblin = new Goblin(this.scene, x, y, 'goblin')
            this.goblins.push(goblin)
        }
    }
}