import Phaser from "phaser";
import * as character1 from "../objects/Characters/Character1";
import * as character2 from "../objects/Characters/Character2";
import * as character3 from "../objects/Characters/Character3";

const CHARACTER_NAMES = [character1.CHARACTER_1_NAME, character2.CHARACTER_2_NAME, character3.CHARACTER_3_NAME];

const INITIAL_CHARACTER_CARD_POS = 200;
const CHARACTER_CARD_SEPARATION = 200;

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'characterSelection' });
    }
  
    preload() {
        this.load.image('fondo','assets/elements/fondo.png');
        this.loadCharacters();
        this.loadWeapons();
        this.loadPotions();
    }
  
    create() {
    let bg = this.add.image(0,0,'fondo').setOrigin(0,0);
    // crea un grupo de botones para cada personaje disponible
    const buttonGroup = this.add.group();
    CHARACTER_NAMES.forEach((character, index) => {
        const button = this.add.image(0, index * 100, character);
        button.setScale(0.30);
        button.setInteractive();
        button.on('pointerdown', () => {
            // al hacer clic en el botón, guarda el personaje seleccionado y cambia a la escena del juego
            this.scene.start('Level1Scene', {characterName: CHARACTER_NAMES[index]});
        });
        buttonGroup.add(button);
    });


        for(let i = 0; i < CHARACTER_NAMES.length; i++){
            buttonGroup.getChildren()[i].setPosition((CHARACTER_CARD_SEPARATION * i) + INITIAL_CHARACTER_CARD_POS, 300);
        }
    }

    loadCharacters(){
        this.load.image(character1.CHARACTER_1_NAME, character1.CHARACTER_1_SELECTION);
        this.load.spritesheet(character1.CHARACTER_1_SPRITE_NAME, character1.CHARACTER_1_SPRITE,{frameWidth:character1.CHARACTER_1_SPRITE_SIZE, frameHeight:character1.CHARACTER_1_SPRITE_SIZE});
        this.load.spritesheet(character1.CHARACTER_1_SPRITE_WEAPON_NAME, character1.CHARACTER_1_SPRITE_WEAPON, {frameWidth: 25.6, frameHeight: 25.5})
        this.load.image(character2.CHARACTER_2_NAME, character2.CHARACTER_2_SELECTION);
        this.load.spritesheet(character2.CHARACTER_2_SPRITE_NAME, character2.CHARACTER_2_SPRITE,{frameWidth:character2.CHARACTER_2_SPRITE_SIZE, frameHeight:character2.CHARACTER_2_SPRITE_SIZE});
        this.load.spritesheet(character2.CHARACTER_2_SPRITE_WEAPON_NAME, character2.CHARACTER_2_SPRITE_WEAPON, {frameWidth: 25.6, frameHeight: 25.5})
        this.load.image(character3.CHARACTER_3_NAME, character3.CHARACTER_3_SELECTION);
        this.load.spritesheet(character3.CHARACTER_3_SPRITE_NAME, character3.CHARACTER_3_SPRITE,{frameWidth:character3.CHARACTER_3_SPRITE_SIZE, frameHeight:character3.CHARACTER_3_SPRITE_SIZE});
        this.load.spritesheet(character3.CHARACTER_3_SPRITE_WEAPON_NAME, character3.CHARACTER_3_SPRITE_WEAPON, {frameWidth: 25.6, frameHeight: 25.5})
    
        this.load.spritesheet('healthBar', 'assets/elements/health.png',{frameWidth:640, frameHeight:128});
    }

    loadWeapons(){
        this.load.spritesheet('fireball', 'assets/elements/fireball.png', {frameWidth: 25.6, frameHeight: 25.5});
    }

    loadPotions(){
        this.load.image('lifePotion', 'assets/elements/potion_life.png');
        this.load.image('strengthPotion', 'assets/elements/potion_strength.png');
        this.load.image('speedPotion', 'assets/elements/potion_speed.png');
        this.load.image('invencibilityPotion', 'assets/elements/potion_invencibility.png');
    }
  }