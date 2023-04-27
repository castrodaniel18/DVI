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
        this.loadExp();
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
            this.scene.start('LevelSelector', {characterName: CHARACTER_NAMES[index]});
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
        this.load.spritesheet('piromancer_idle', 'assets/sprites/piromancer/Idle.png', {frameWidth: 128, frameHeight: 128});

        //load piromancer
        this.load.on('complete', () => {
            let piromancer_idle_backwards = this.add.sprite(100, 100, 'piromancer_idle');
            piromancer_idle_backwards.flipX = true;
          });
        this.load.spritesheet('piromancer_dead', 'assets/sprites/piromancer/Dead.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('piromancer_move', 'assets/sprites/piromancer/Run.png', {frameWidth: 128, frameHeight: 128});

        //load electromancer
        this.load.spritesheet('electromancer_idle', 'assets/sprites/electromancer/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.on('complete', () => {
            let electromancer_idle_backwards = this.add.sprite(100, 100, 'electromancer_idle');
            electromancer_idle_backwards.flipX = true;
          });
        this.load.spritesheet('electromancer_dead', 'assets/sprites/electromancer/Dead.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('electromancer_move', 'assets/sprites/electromancer/Run.png', {frameWidth: 128, frameHeight: 128});

        //load luminomancer
        this.load.spritesheet('luminomancer_idle', 'assets/sprites/luminomancer/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.on('complete', () => {
            let luminomancer_idle_backwards = this.add.sprite(100, 100, 'luminomancer_idle');
            luminomancer_idle_backwards.flipX = true;
          });
        this.load.spritesheet('luminomancer_dead', 'assets/sprites/luminomancer/Dead.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('luminomancer_move', 'assets/sprites/luminomancer/Run.png', {frameWidth: 128, frameHeight: 128});
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

    loadExp(){
        this.load.image('experience_red', 'assets/elements/experience_points(red).png');
        this.load.image('experience_blue', 'assets/elements/experience_points(blue).png');
        this.load.image('experience_green', 'assets/elements/experience_points(green).png');
        this.load.image('experience_purple', 'assets/elements/experience_points(purple).png');
        this.load.image('experience_yellow', 'assets/elements/experience_points(blue).png');
    }
  }