export default class EnemyGroup extends Phaser.Physics.Arcade.Group{

    constructor(scene, imgKey, enemyType, num_enemies) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.imgKey = imgKey;
        this.num_enemies = num_enemies;
        this.enemyType = enemyType;
        this.enemies = []
        this.createEnemies();
    }

    createEnemies() {
        for(let i=0; i<this.num_enemies; i++) {
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
            const enemy = new this.enemyType(this.scene, x, y, this.imgKey);
            this.enemies.push(enemy);
        }
    }

    enemyUpdate(){
        this.enemies.forEach(enemy => {
            enemy.enemyUpdate();
        });
    }
}