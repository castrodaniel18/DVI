export default class BossGroup extends Phaser.Physics.Arcade.Group{

    constructor(scene, imgKey, bossType, num_bosses) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.imgKey = imgKey;
        this.num_bosses = num_bosses;
        this.bossType = bossType;
        this.enemies = []
        this.createBosses();
        this.addCollisions();
    }

    createBosses() {
        for(let i=0; i<this.num_bosses; i++) {
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
            const boss = new this.bossType(this.scene, x, y, this.imgKey);
            this.enemies.push(boss);
            
            this.scene.physics.add.collider(this.enemies, boss);
        }
    }

    enemyUpdate(){
        this.enemies.forEach(boss => {
            boss.enemyUpdate();
        });
    }

    addCollisions(){
        this.enemies.forEach(boss => {
            boss.addCollisions();
        });
    }
}