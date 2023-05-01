import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
import Level1Scene from './scenes/Level1Scene'
import characterSelection from './scenes/characterSelection'
import Settings from './scenes/Settings'
import LevelSelector from './scenes/LevelSelector';
import PauseScene from './scenes/PauseScene'
import ItemSelectScene from './scenes/ItemSelectScene'
import HealthBar from './objects/Characters/Bar'

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
	scene: [StartScene, characterSelection, Level1Scene, Settings, LevelSelector, PauseScene, ItemSelectScene, HealthBar],
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
