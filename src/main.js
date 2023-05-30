import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
import Level1Scene from './scenes/Level1Scene'
import Level2Scene from './scenes/Level2Scene'
import characterSelection from './scenes/characterSelection'
import Settings from './scenes/Settings'
import LevelSelector from './scenes/LevelSelector';
import PauseScene from './scenes/PauseScene'
import ItemSelectScene from './scenes/ItemSelectScene'
import UIScene from './scenes/UIScene'

import GameOver from './scenes/GameOver'
import LevelCompleted from './scenes/LevelCompleted'
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
	scene: [StartScene, characterSelection,LevelSelector, Level1Scene, Level2Scene, Settings ,UIScene, PauseScene, ItemSelectScene,GameOver, LevelCompleted],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			fps:60,
			debug: false
		},
	},
	transparent:false
	
};
 new Phaser.Game(config)
