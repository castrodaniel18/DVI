import ProjectileGroup from "./ProjectileGroup";
import EnemyProjectile, {FIREBALL_IMGKEY_NAME} from "./EnemyProjectile";

export default class EnemyProjectileGroup extends ProjectileGroup{

    constructor(scene, num_fireballs){
        super(scene, FIREBALL_IMGKEY_NAME, EnemyProjectile, num_fireballs);
    }
    
}