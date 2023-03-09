import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import Level1Scene from './scenes/Level1Scene'

const config = {
	type: Phaser.AUTO,
	parent: 'juego',
	width: 800,
	height: 600,
	pixelArt: true,
	scale:{
	autoCenter: Phaser.Scale.CENTER_BOTH,
	mode: Phaser.Scale.FIT,
	zoom:1
	},
	scene: [Level1Scene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	transparent:false
	
};
 new Phaser.Game(config)
