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
	}
}