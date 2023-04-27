import FireballGroup from "../Projectiles/FireballGroup";
import Mage from "./Mage";

export const PIROMANCER_NAME = 'piromancer';
export const PIROMANCER_SPRITE = 'assets/sprites/piromancer';
export const PIROMANCER_SPRITE_SIZE = 16;
export const PIROMANCER_SPRITE_NAME = 'piromancer';
export const PIROMANCER_SELECTION = 'assets/elements/playerSelection1.png';
export const PIROMANCER_HEALTH = 150;
export const PIROMANCER_DAMAGE = 3;
export const PIROMANCER_SPRITE_WEAPON_NAME = 'fireball';
export const PIROMANCER_SPRITE_WEAPON = 'assets/elemnts/fireball';
export const PIROMANCER_WEAPON = FireballGroup;
export const PIROMANCER_FIREBALLS = 15;
export const PIROMANCER_SPEED = 100;

export default class Piromancer extends Mage{
    constructor(scene, sprite, x, y){
        super(scene, x, y, PIROMANCER_NAME, sprite, PIROMANCER_HEALTH, PIROMANCER_DAMAGE, PIROMANCER_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();
    }

    addWeapon(scene){
        this.weapon = new PIROMANCER_WEAPON(scene, PIROMANCER_FIREBALLS);
    }

    mouseClickAction(){
        this.scene.input.on('pointerdown', pointer => {
            this.pointerX = pointer.worldX;
            this.pointerY = pointer.worldY;
            this.shoot(this.pointerX, this.pointerY);
        })
    }

    shoot(pointerX, pointerY){
        this.weapon.shoot(pointerX, pointerY);
    }
}