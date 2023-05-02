import Phaser from "phaser";

import * as LUMINOMANCER from "../objects/Characters/LuminoMancer";
import * as ELECTROMANCER from "../objects/Characters/Electromancer";
import * as PIROMANCER from "../objects/Characters/Piromancer";


const INITIAL_CHARACTER_CARD_POS = 200;
const CHARACTER_CARD_SEPARATION = 200;

const CHARACTER_NAMES = [PIROMANCER.PIROMANCER_NAME, ELECTROMANCER.ELECTROMANCER_NAME, LUMINOMANCER.LUMINOMANCER_NAME];

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'characterSelection' });
    }
  
    preload() {
        this.load.image('menuBackground','assets/elements/menuBackground.png');
        this.load.image('titleButton', 'assets/elements/largeButton.png');
        this.loadCharacters();
        this.loadWeapons();
        this.loadPotions();
        this.loadExp();
        this.loadObjects();
    }

    init(data){
        // guarda la dificultad seleccionada en una variable
        if (data.difficulty != "easy" && data.difficulty != "normal" && data.difficulty != "hard")
            this.difficulty = "normal";
        else
            this.difficulty = data.difficulty;
    }
  
    create() {
    this.scene.bringToTop();
    //Fondo
    this.levelBackground = this.add.image(0, 0, 'menuBackground');
    this.levelBackground.setScale(800 / this.levelBackground.width, 600 / this.levelBackground.height);
    this.levelBackground.setOrigin(0, 0);

    //Título
    this.add.text(220, 75, 'Select your character: ', { fontFamily: 'myFont', fontSize: '35px', color: '#ffffff' });

    // crea un grupo de botones para cada personaje disponible
    const buttonGroup = this.add.group();
    CHARACTER_NAMES.forEach((character, index) => {
        const button = this.add.image(0, index * 100, character);
        button.setScale(0.30);
        button.setInteractive();

        //Guardamos la escala original para usarla en el pointover
        var originalScaleX = button.scaleX;
        var originalScaleY = button.scaleY;

        //Animación para tween
        button.on('pointerover', function () {
            // Crea la animación tween
            this.tweens.add({
            targets: button,
            scaleX: 0.32, // Escala horizontal del botón
            scaleY: 0.32, // Escala vertical del botón
            alpha: 1, // Cambia la opacidad del botón a 0.7
            duration: 200, // Duración de la animación en milisegundos
            ease: 'Linear' // Tipo de interpolación de la animación
            });

        }, this);

        // Agrega un evento de puntero fuera del botón
        button.on('pointerout', function () {

            // Crea la animación tween inversa
            this.tweens.add({
              targets: button,
              scaleX: originalScaleX, // Escala horizontal del botón de regreso al valor original
              scaleY: originalScaleY, // Escala vertical del botón de regreso al valor original
              alpha: 1, // Cambia la opacidad del botón a 0.7
              duration: 200, // Duración de la animación en milisegundos
              ease: 'Linear' // Tipo de interpolación de la animación
            });
  
        }, this);

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
        this.load.image(PIROMANCER.PIROMANCER_NAME, PIROMANCER.PIROMANCER_SELECTION);
        this.load.image(ELECTROMANCER.ELECTROMANCER_NAME, ELECTROMANCER.ELECTROMANCER_SELECTION);
        this.load.image(LUMINOMANCER.LUMINOMANCER_NAME, LUMINOMANCER.LUMINOMANCER_SELECTION);

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
        this.load.image('ventolin_projectile_1', 'assets/elements/Explosion_gas_circle1.png');
        this.load.image('ventolin_projectile_2', 'assets/elements/Explosion_gas_circle3.png');

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
        this.load.image('invencibility_shield', 'assets/elements/shield.png');
        this.load.image('damage_buff', 'assets/elements/damageBuffEffect.png');
        this.load.image('speed_buff', 'assets/elements/speedBuffEffect.png');
        this.load.spritesheet('healing', 'assets/elements/Heal_Effect_Sprite_Sheet.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('spawn_potion_effect', 'assets/elements/Smoke_VFX_2.png', {frameWidth: 64, frameHeight: 64});
    }

    loadExp(){
        this.load.image('experience_red', 'assets/elements/experience_points(red).png');
        this.load.image('experience_blue', 'assets/elements/experience_points(blue).png');
        this.load.image('experience_green', 'assets/elements/experience_points(green).png');
        this.load.image('experience_purple', 'assets/elements/experience_points(purple).png');
        this.load.image('experience_yellow', 'assets/elements/experience_points(blue).png');
    }

    loadObjects(){
        this.load.image('Fang','assets/elements/colmillo_chupasangre.png');
        this.load.image('Knife','assets/elements/cuchillo_sacauntos.png');
        this.load.image('Cape','assets/elements/manto_nuberu.png');
        this.load.image('Stone','assets/elements/piedra_san_pedro.png');
    }
  }