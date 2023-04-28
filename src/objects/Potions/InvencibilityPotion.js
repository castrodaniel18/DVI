import Potion from "./Potion";

const EFFECT_TIME = 10000;
const INVENCIBILITY_POTION_SPRITE = 'invencibilityPotion'
export const INVENCIBILITY_POTION_SPAWN_RATE = 0.002;

export default class InvencibilityPotion extends Potion {
    constructor(scene){
        super(scene, INVENCIBILITY_POTION_SPRITE);
    }

    apply(){
        this.scene.player.isInvencible = true;
        const scene = this.scene;
        setTimeout(() => {
            scene.player.isInvencible = false;
        }, EFFECT_TIME);

        this.scene.player.setTint(0xFFD206); // Cambiar el color del personaje
        this.scene.time.addEvent({
            delay: EFFECT_TIME, // La duración del efecto en milisegundos
            callback: () => {
                this.clearTint(); // Restablecer el color original del personaje
            },
            callbackScope: this
        });
    }
}