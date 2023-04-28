import ProjectileGroup from "./ProjectileGroup";
import EnemyProjectile, {ENEMY_PROJECTILE_IMGKEY_NAME} from "./EnemyProjectile";

export default class EnemyProjectileGroup extends ProjectileGroup{

    constructor(scene, num_projectiles){
        super(scene, ENEMY_PROJECTILE_IMGKEY_NAME, EnemyProjectile, num_projectiles);
    }
    
}