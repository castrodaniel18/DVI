import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import Level1Scene from './scenes/Level1Scene'
import StartScene from './scenes/StartScene'

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
	dom: {
		createContainer: true
	},
	scene: [StartScene,Level1Scene],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		},
	},
	transparent:false
	
};
 new Phaser.Game(config)
