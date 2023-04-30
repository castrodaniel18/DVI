import Phaser from "phaser";
import * as item1 from "../objects/Items/Stone";
import * as item2 from "../objects/Items/Cape";
import * as item3 from "../objects/Items/Knife";
import * as item4 from "../objects/Items/Fang";
import Items from "../objects/Items/Items";
export default class ItemSelectScene extends Phaser.Scene{
    constructor() {
        super({ key: 'itemSelection' });
        this.itemArray=Items.getItems();
    }
    preload(){
        //carga de imagenes
       
    }
    init(){}
    create(){
        this.itemArray = array => {//mezcla los objetos 
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
          }  
        //crear los botones que contengan los objetos
        //buttonItem1 = this.add.image(50,50,)
        /*buttonItem1.on('pointerdown', function(){
            if(this.scene.playerItems.length<this.scene.player.inventorySize){
                itemSelect();
            }
           
            
        }, this)*/
    }
    itemSelect(){//Selecciona un item o lo sube de nivel, un mismo item solo puede llegar a nivel 5
        /*if(item.level===0)añadir el item al inventario
        if(item.level<5){
            item.apply();
            item.level+=1;
        }
        */
    }
}