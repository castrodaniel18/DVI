import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
<<<<<<< HEAD
import characterSelection from './scenes/CharacterSelection'
import LevelSelector from './scenes/LevelSelector';
import Settings from './scenes/Settings';
=======
import Level1Scene from './scenes/Level1Scene'
import characterSelection from './scenes/characterSelection'
import Settings from './scenes/Settings'
import LevelSelector from './scenes/LevelSelector';
import PauseScene from './scenes/PauseScene'
import LevelUpScene from './scenes/levelUpScene'
>>>>>>> 32e93ae849cb83adf1c52a3381aaf8456016497e

const config = {
	type: Phaser.AUTO,
	parent: 'game',
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
<<<<<<< HEAD
	scene: [StartScene,characterSelection, LevelSelector, Level1Scene, Settings],
=======
	scene: [StartScene, characterSelection, Level1Scene, Settings, LevelSelector, PauseScene, LevelUpScene],
>>>>>>> 32e93ae849cb83adf1c52a3381aaf8456016497e
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
