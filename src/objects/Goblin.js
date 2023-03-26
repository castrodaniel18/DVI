import { Scene } from 'phaser';
import Enemy from './Enemy.js';

export default class Goblin extends Enemy {
  /**
   * Constructor de Goblin
   * @param {Scene} scene Escena en la que aparece la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
	constructor(scene, x, y, imgKey) {
		super(scene, x, y, 200, 'goblin');
		this.setDisplaySize(50,50);
    this.damage=10;
    this.vida = 5;
    this.scene.anims.create({
      key:'up',
      frames: scene.anims.generateFrameNumbers('goblin',{start:104,end:112}),
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key:'right',
      frames: scene.anims.generateFrameNumbers('goblin',{start:117,end:125}),
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key:'down',
      frames: scene.anims.generateFrameNumbers('goblin',{start:130,end:138}),
      frameRate: 5,
      repeat: -1
    });

    this.scene.anims.create({
      key:'left',
      frames: scene.anims.generateFrameNumbers('goblin',{start:143,end:151}),
      frameRate: 5,
      repeat: -1
    });
    this.play('up');
	}
  preUpdate(t, dt){
    super.preUpdate(t, dt);
    let animation;
    if(this.body.velocity.x >= 0 && this.body.velocity.y >= 0){
        animation = 'left';
    }
    else if(this.body.velocity.x >= 0 && this.body.velocity.y < 0){
        animation = 'up';
    }
    else if (this.body.velocity.x < 0 && this.body.velocity.y < 0){
        animation = 'right';
    }
    else{
        animation = 'down';
    }
    //Ejecutamos la animación solo si no es la que se estaba ejecutando ya
    this.vida ? this.play(animation, true) : this.destroy()
  }
}