import ProjectileGroup from "./ProjectileGroup";
import ScorpioProjectile, {SCORPIO_PROJECTILE_IMGKEY_NAME} from "./ScorpioProjectile";

export default class ScorpioProjectileGroup extends ProjectileGroup{

    constructor(scene, num_projectiles){
        super(scene, SCORPIO_PROJECTILE_IMGKEY_NAME, ScorpioProjectile, num_projectiles);
    }
    
}