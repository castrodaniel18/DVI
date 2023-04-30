import Phaser from "phaser";
import Fang from "./../objects/Items/Fang"

export default class LevelUpScene extends Phaser.Scene {
    constructor() {
      super({ key: 'LevelUpScene' });
    }
  
    preload() {
        //https://drunkenimpgamestudio.itch.io/pixel-ui-borders
        this.load.image('levelUpBorder','public/assets/elements/levelUpBorder.png');
        this.load.image('card','public/assets/elements/playerSelection1.png');
        this.load.image('colmillo_chupasangre_card','public/assets/elements/colmillo_chupasangre_card.png');
        this.load.image('cuchillo_sacauntos_card','public/assets/elements/cuchillo_sacaunto_card.png');
        this.load.image('manto_nuberu_card','public/assets/elements/manto_nuberu_card.png');
        this.load.image('piedra_san_pedro_card','public/assets/elements/piedra_san_pedro_card.png');
    }

    init(data) {
        //Nos guardamos la escena de juego para poder aplicar los cambios que da el objeto
        this.mainScene = data.mainScene;
    }
  
    create() {
        //Fondo
        this.levelUpBorder = this.add.image(425, 350, 'levelUpBorder');
        this.levelUpBorder.setScale(2, 2);

        //Título Settings
        this.add.text(210, 150, 'Chose an upgrade:', { fontFamily: 'myFont', fontSize: '39px', color: '#ffffff' });

        const items = ["colmillo_chupasangre_card", "cuchillo_sacauntos_card", "manto_nuberu_card", "piedra_san_pedro_card"];

        const elementosAleatorios = [];
        while (elementosAleatorios.length < 3) {
            const indiceAleatorio = Phaser.Math.Between(0, items.length - 1);
            const elementoAleatorio = items[indiceAleatorio];
            if (!elementosAleatorios.includes(elementoAleatorio)) {
            elementosAleatorios.push(elementoAleatorio);
            }
        }
        console.log(elementosAleatorios);


        //Tarjetas objetos
        this.object1 = this.add.image(220, 300, elementosAleatorios[0]).setInteractive();
        this.object1.setScale(.25);
        this.object1.on('pointerdown', () => {
            this.scene.resume('Level1Scene');
            this.scene.stop();
        })

        this.object2 = this.add.image(400, 300, elementosAleatorios[1]).setInteractive();
        this.object2.setScale(.25);
        this.object2.on('pointerdown', () => {
            this.scene.resume('Level1Scene');
            this.scene.stop();
        })

        this.object3 = this.add.image(580, 300, elementosAleatorios[2]).setInteractive();
        this.object3.setScale(.25);
        this.object3.on('pointerdown', () => {
            this.scene.resume('Level1Scene');
            this.scene.stop();
        })

    }
      
  }