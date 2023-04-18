import Phaser from 'phaser'

import Level1Scene from './scenes/Level1Scene'
import StartScene from './scenes/StartScene'
import characterSelection from './scenes/CharacterSelection'
import LevelSelector from './scenes/LevelSelector';

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
	scene: [StartScene,characterSelection, LevelSelector, Level1Scene],
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
