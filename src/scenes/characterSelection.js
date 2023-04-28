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

    init(data){
        // guarda la dificultad seleccionada en una variable
        if (data.difficulty != "easy" && data.difficulty != "normal" && data.difficulty != "hard")
            this.difficulty = "normal";
        else
            this.difficulty = data.difficulty;
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
            this.scene.start('LevelSelector', {characterName: CHARACTER_NAMES[index], difficulty: this.difficulty});
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
        this.load.image(character2.CHARACTER_2_NAME, character2.CHARACTER_2_SELECTION);
        this.load.spritesheet(character2.CHARACTER_2_SPRITE_NAME, character2.CHARACTER_2_SPRITE,{frameWidth:character2.CHARACTER_2_SPRITE_SIZE, frameHeight:character2.CHARACTER_2_SPRITE_SIZE});
        this.load.image(character3.CHARACTER_3_NAME, character3.CHARACTER_3_SELECTION);
        this.load.spritesheet(character3.CHARACTER_3_SPRITE_NAME, character3.CHARACTER_3_SPRITE,{frameWidth:character3.CHARACTER_3_SPRITE_SIZE, frameHeight:character3.CHARACTER_3_SPRITE_SIZE});    
        this.load.spritesheet('healthBar', 'assets/elements/health.png',{frameWidth:640, frameHeight:128});

        //load piromancer
        this.load.spritesheet('piromancer_idle', 'assets/sprites/piromancer/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('piromancer_dead', 'assets/sprites/piromancer/Dead.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('piromancer_move', 'assets/sprites/piromancer/Run.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('piromancer_shoot', 'assets/sprites/piromancer/Fireball.png', {frameWidth: 128, frameHeight: 128});

        //load electromancer
        this.load.spritesheet('electromancer_idle', 'assets/sprites/electromancer/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('electromancer_dead', 'assets/sprites/electromancer/Dead.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('electromancer_move', 'assets/sprites/electromancer/Run.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('electromancer_shoot', 'assets/sprites/electromancer/Magic_sphere.png', {frameWidth: 128, frameHeight: 128});

        //load luminomancer
        this.load.spritesheet('luminomancer_idle', 'assets/sprites/luminomancer/Idle.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('luminomancer_dead', 'assets/sprites/luminomancer/Dead.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('luminomancer_move', 'assets/sprites/luminomancer/Run.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('luminomancer_shoot', 'assets/sprites/luminomancer/Light_ball.png', {frameWidth: 128, frameHeight: 128});
    }

    loadWeapons(){
        this.load.spritesheet('fireball', 'assets/sprites/piromancer/Charge.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('electroball', 'assets/sprites/electromancer/Charge_1.png', {frameWidth: 64, frameHeight: 128});
        this.load.spritesheet('lightball', 'assets/sprites/luminomancer/Charge.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('enemy_projectile_1', 'assets/elements/Explosion_gas_circle1.png');
        this.load.image('enemy_projectile_2', 'assets/elements/Explosion_gas_circle3.png');

        this.load.image('fireball_image', 'assets/sprites/piromancer/Fireball_Image.png');
        this.load.image('none', 'assets/sprites/piromancer/none.png');
        this.load.image('electroball_image', 'assets/sprites/electromancer/Electroball_Image.png');
        this.load.image('none', 'assets/sprites/electromancer/none.png');
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