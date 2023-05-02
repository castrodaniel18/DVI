export default class EnemyGroup extends Phaser.Physics.Arcade.Group{

    constructor(scene, imgKey, enemyType, num_enemies) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.imgKey = imgKey;
        this.num_enemies = num_enemies;
        this.enemyType = enemyType;
        this.enemies = []
        this.createEnemies();
        this.addCollisions();
    }

    createEnemies() {
        for(let i=0; i<this.num_enemies; i++) {
            const randomBorder = Math.floor(Math.random() * 4);
            let x, y;
            let rectHeight=this.scene.cameras.main.worldView.height;
            let rectWidth=this.scene.cameras.main.worldView.width;
            if (randomBorder === 0) { // Izquierda
                x = this.scene.cameras.main.worldView.left;
                y = Math.random() * rectHeight;
              } else if (randomBorder === 1) { // Derecha
                x = this.scene.cameras.main.worldView.right;
                y = Math.random() * rectHeight;
              } else if (randomBorder === 2) { // Arriba
                x = Math.random() * rectWidth;
                y = this.scene.cameras.main.worldView.top;
              } else { // Abajo
                x = Math.random() * rectWidth;
                y = this.scene.cameras.main.worldView.bottom;
              }
            const enemy = new this.enemyType(this.scene, x, y, this.imgKey);
            this.enemies.push(enemy);
            
            this.scene.physics.add.collider(this.enemies, enemy);
        }
    }

    enemyUpdate(){
        this.enemies.forEach(enemy => {
            enemy.enemyUpdate();
        });
    }

    addCollisions(){
        this.enemies.forEach(enemy => {
            enemy.addCollisions();
        });
    }
}