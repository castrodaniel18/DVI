import Phaser from "phaser";

import Stone from "../objects/Items/Stone";
import Cape from "../objects/Items/Cape";
import Knife from "../objects/Items/Knife";
import Fang from "../objects/Items/Fang";
import Items, {ITEMS} from "../objects/Items/Items";

export default class ItemSelectScene extends Phaser.Scene{
    constructor() {
        super({ key: 'ItemSelectScene' });
        //this.itemArray= ITEMS;
        //this.itemArray = ['cape', 'fang', 'knife', 'stone'];

    }
    preload(){
        //https://drunkenimpgamestudio.itch.io/pixel-ui-borders
        this.load.image('levelUpBorder','/assets/elements/levelUpBorder.png');
        this.load.image('Fang_card','/assets/elements/colmillo_chupasangre_card.png');
        this.load.image('Knife_card','/assets/elements/cuchillo_sacaunto_card.png');
        this.load.image('Cape_card','/assets/elements/manto_nuberu_card.png');
        this.load.image('Stone_card','/assets/elements/piedra_san_pedro_card.png');
    }

    init(data){
        this.mainScene = data.mainScene;
    }

    create(){
        this.scene.bringToTop();
        //Fondo
        this.levelUpBorder = this.add.image(425, 350, 'levelUpBorder');
        this.levelUpBorder.setScale(2, 2);

        //Título Settings
        this.add.text(210, 150, 'Chose an upgrade:', { fontFamily: 'myFont', fontSize: '39px', color: '#ffffff' });

        let cape = new Cape(this);
        let fang = new Fang(this);
        let knife = new Knife(this);
        let stone = new Stone(this);
        this.itemArray = [cape, fang, knife, stone];

        const elementosAleatorios = [];
        while (elementosAleatorios.length < 3) {
            const indiceAleatorio = Phaser.Math.Between(0, this.itemArray.length - 1);
            const elementoAleatorio = this.itemArray[indiceAleatorio];
            if (!elementosAleatorios.includes(elementoAleatorio)) {
            elementosAleatorios.push(elementoAleatorio);
            }
        }

        //crear los botones que contengan los objetos
        this.object1 = this.add.image(220, 300, elementosAleatorios[0].name + '_card').setInteractive();
        this.object1.setScale(.25);
        //Guardamos la escala original para usarla en el pointover
        var originalScaleX = this.object1.scaleX;
        var originalScaleY = this.object1.scaleY;
        //Si el objeto no se puede seleccionar le ponemos un filtro rojo
        if(this.mainScene.playerItems.length < this.mainScene.player.inventorySize || this.mainScene.playerItems.some(item => item.name === elementosAleatorios[0].name)){
            this.object1.on('pointerdown', () => {
                //Si queda espacio en el inventario o el objeto que se quiere coger ya se tiene
                if(this.mainScene.playerItems.length < this.mainScene.player.inventorySize || this.mainScene.playerItems.some(item => item.name === elementosAleatorios[0].name)){
                    this.mainScene.waveController.leveling = false;
                    this.scene.resume(this.mainScene);
                    this.scene.stop();
                    this.itemSelect(elementosAleatorios[0]);
                }
            })
            //Animación para tween
            this.object1.on('pointerover', function () {
                // Crea la animación tween
                this.tweens.add({
                targets: this.object1,
                scaleX: 0.28, // Escala horizontal del botón
                scaleY: 0.28, // Escala vertical del botón
                alpha: 1, // Cambia la opacidad del botón a 0.7
                duration: 200, // Duración de la animación en milisegundos
                ease: 'Linear' // Tipo de interpolación de la animación
                });
    
            }, this);
        }else{
            this.object1.setTint(0xff5252);
        }

        // Agrega un evento de puntero fuera del botón
        this.object1.on('pointerout', function () {

            // Crea la animación tween inversa
            this.tweens.add({
              targets: this.object1,
              scaleX: originalScaleX, // Escala horizontal del botón de regreso al valor original
              scaleY: originalScaleY, // Escala vertical del botón de regreso al valor original
              alpha: 1, // Cambia la opacidad del botón a 0.7
              duration: 200, // Duración de la animación en milisegundos
              ease: 'Linear' // Tipo de interpolación de la animación
            });
  
        }, this);

        this.object2 = this.add.image(400, 300, elementosAleatorios[1].name + '_card').setInteractive();
        this.object2.setScale(.25);
        if(this.mainScene.playerItems.length < this.mainScene.player.inventorySize || this.mainScene.playerItems.some(item => item.name === elementosAleatorios[1].name)){
            originalScaleX = this.object2.scaleX;
            originalScaleY = this.object2.scaleY;
            this.object2.on('pointerdown', () => {
                if(this.mainScene.playerItems.length < this.mainScene.player.inventorySize || this.mainScene.playerItems.some(item => item.name === elementosAleatorios[1].name)){
                    this.mainScene.waveController.leveling = false;
                    this.scene.resume(this.mainScene);
                    this.scene.stop();
                    this.itemSelect(elementosAleatorios[1]);
                }
            })
            //Animación para tween
            this.object2.on('pointerover', function () {
                // Crea la animación tween
                this.tweens.add({
                targets: this.object2,
                scaleX: 0.28, // Escala horizontal del botón
                scaleY: 0.28, // Escala vertical del botón
                alpha: 1, // Cambia la opacidad del botón a 0.7
                duration: 200, // Duración de la animación en milisegundos
                ease: 'Linear' // Tipo de interpolación de la animación
                });
    
            }, this);
        }else{
            this.object2.setTint(0xff5252);
        }

        // Agrega un evento de puntero fuera del botón
        this.object2.on('pointerout', function () {

            // Crea la animación tween inversa
            this.tweens.add({
              targets: this.object2,
              scaleX: originalScaleX, // Escala horizontal del botón de regreso al valor original
              scaleY: originalScaleY, // Escala vertical del botón de regreso al valor original
              alpha: 1, // Cambia la opacidad del botón a 0.7
              duration: 200, // Duración de la animación en milisegundos
              ease: 'Linear' // Tipo de interpolación de la animación
            });
  
        }, this);

        this.object3 = this.add.image(580, 300, elementosAleatorios[2].name + '_card').setInteractive();
        this.object3.setScale(.25);
        if(this.mainScene.playerItems.length < this.mainScene.player.inventorySize || this.mainScene.playerItems.some(item => item.name === elementosAleatorios[2].name)){
            originalScaleX = this.object3.scaleX;
            originalScaleY = this.object3.scaleY;
            this.object3.on('pointerdown', () => {
                if(this.mainScene.playerItems.length < this.mainScene.player.inventorySize || this.mainScene.playerItems.some(item => item.name === elementosAleatorios[2].name)){
                    this.mainScene.waveController.leveling = false;
                    this.scene.resume(this.mainScene);
                    this.scene.stop();
                    this.itemSelect(elementosAleatorios[2]);
                }
            })
            //Animación para tween
            this.object3.on('pointerover', function () {
                // Crea la animación tween
                this.tweens.add({
                targets: this.object3,
                scaleX: 0.28, // Escala horizontal del botón
                scaleY: 0.28, // Escala vertical del botón
                alpha: 1, // Cambia la opacidad del botón a 0.7
                duration: 200, // Duración de la animación en milisegundos
                ease: 'Linear' // Tipo de interpolación de la animación
                });
    
            }, this);
        }else{
            this.object3.setTint(0xff5252);
        }

        // Agrega un evento de puntero fuera del botón
        this.object3.on('pointerout', function () {

            // Crea la animación tween inversa
            this.tweens.add({
              targets: this.object3,
              scaleX: originalScaleX, // Escala horizontal del botón de regreso al valor original
              scaleY: originalScaleY, // Escala vertical del botón de regreso al valor original
              alpha: 1, // Cambia la opacidad del botón a 0.7
              duration: 200, // Duración de la animación en milisegundos
              ease: 'Linear' // Tipo de interpolación de la animación
            });
  
        }, this);
    }

    //Selecciona un item o lo sube de nivel, un mismo item solo puede llegar a nivel 5
    itemSelect(objeto){
        /*if(item.level===0)añadir el item al inventario
        if(item.level<5){
            item.apply();
            item.level+=1;
        }
        */
        //Si existe un objeto en el inventario que tenga el nombre del objeto seleccionado solo lo subimos de nivel
        if(this.mainScene.playerItems.some(item => item.name === objeto.name)){
            const objetoEncontrado = this.mainScene.playerItems.find(item => item.name === objeto.name);

            const indiceObjetoEncontrado = this.mainScene.playerItems.findIndex(item => item.name === objeto.name);
            if (indiceObjetoEncontrado !== -1) {
                this.mainScene.playerItems[indiceObjetoEncontrado].apply();
                this.mainScene.playerItems[indiceObjetoEncontrado].increaseLevel();

                this.mainScene.itemLevels[indiceObjetoEncontrado].destroy();
                this.mainScene.itemLevels[indiceObjetoEncontrado] = this.mainScene.add.text(50 * (indiceObjetoEncontrado+1), 60, 'Level: ' + this.mainScene.playerItems[indiceObjetoEncontrado].itemLevel, { fontFamily: 'myFont', fontSize: '10px', fill: '#FFFFFF' });
            }
        }
        //Si no también lo metemos en el inventario
        else{
            let instanciaObjeto;
            switch (objeto.name) {
            case "Fang":
                instanciaObjeto = new Fang(this.mainScene);
                break;
            case "Cape":
                instanciaObjeto = new Cape(this.mainScene);
            break;
            case "Stone":
                instanciaObjeto = new Stone(this.mainScene);
                break;
            case "Knife":
                instanciaObjeto = new Knife(this.mainScene);
                break;
            default:
                instanciaObjeto = null;
            }

            if (instanciaObjeto !== null) {
                instanciaObjeto.apply();
                instanciaObjeto.increaseLevel();
                this.mainScene.playerItems.push(instanciaObjeto);

                let image = this.mainScene.add.image(50 * this.mainScene.playerItems.length, 100, instanciaObjeto.name);
                image.setScale(.6);
                this.mainScene.itemImages.push(image);
                this.mainScene.itemLevels.push(this.mainScene.add.text(50 * this.mainScene.playerItems.length, 120, 'Level: ' + instanciaObjeto.itemLevel, { fontFamily: 'myFont', fontSize: '10px', fill: '#FFFFFF' }));

                instanciaObjeto = null;
            }

        }
    }
}