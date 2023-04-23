import FireballGroup from "../Projectiles/FireballGroup";
import Character from "./Character";

export const CHARACTER_2_NAME = 'character2'
export const CHARACTER_2_SPRITE = 'assets/sprites/character2.png'
export const CHARACTER_2_SPRITE_SIZE = 16;
export const CHARACTER_2_SPRITE_NAME = 'character2_sprite'
export const CHARACTER_2_SELECTION = 'assets/elements/playerSelection2.png'
export const CHARACTER_2_HEALTH = 100;
export const CHARACTER_2_DAMAGE = 3;
export const CHARACTER_2_SPRITE_WEAPON_NAME = 'fireball'
export const CHARACTER_2_SPRITE_WEAPON = 'assets/elemnts/fireball'
export const CHARACTER_2_WEAPON = 'fireball'
export const CHARACTER_2_SPEED = 150;
const SHOOT_SPEED = 150;

export default class Character2 extends Character{
    constructor(scene, sprite, x, y){
        super(scene, x, y,  CHARACTER_2_NAME, sprite, CHARACTER_2_HEALTH, CHARACTER_2_DAMAGE, CHARACTER_2_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();
    }

    addWeapon(scene){
        this.weapon = new FireballGroup(scene);
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