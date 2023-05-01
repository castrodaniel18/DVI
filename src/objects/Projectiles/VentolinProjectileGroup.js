import ProjectileGroup from "./ProjectileGroup";
import VentolinProjectile, {VENTOLIN_PROJECTILE_IMGKEY_NAME} from "./VentolinProjectile";

export default class VentolinProjectileGroup extends ProjectileGroup{

    constructor(scene, num_projectiles){
        super(scene, VENTOLIN_PROJECTILE_IMGKEY_NAME, VentolinProjectile, num_projectiles);
    }
    
}