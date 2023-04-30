import Enemy from "./Enemy";

export default class Boss extends Enemy{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
            //Ejecutamos la animación solo si no es la que se estaba ejecutando ya
            if(!this.isDead()){
                this.play(this.checkAnimation(), true);
                this.texto.x = this.x - 5;
                this.texto.y = this.y - 40;
            }
            else
                this.destroy();
    }
}