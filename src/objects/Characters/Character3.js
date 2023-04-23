import Character from "./Character";
import FireballGroup from "../Projectiles/FireballGroup";

export const CHARACTER_3_NAME = 'character3'
export const CHARACTER_3_SPRITE = 'assets/sprites/character3.png'
export const CHARACTER_3_SPRITE_SIZE = 16;
export const CHARACTER_3_SPRITE_NAME = 'character3_sprite'
export const CHARACTER_3_SELECTION = 'assets/elements/playerSelection3.png'
export const CHARACTER_3_HEALTH = 100;
export const CHARACTER_3_DAMAGE = 4;
export const CHARACTER_3_SPRITE_WEAPON_NAME = 'fireball'
export const CHARACTER_3_SPRITE_WEAPON = 'assets/elemnts/fireball'
export const CHARACTER_3_WEAPON = FireballGroup;
export const CHARACTER_3_SPEED = 100;

export default class Character3 extends Character{
    constructor(scene, sprite, x, y){
        super(scene, x, y, CHARACTER_3_NAME, sprite, CHARACTER_3_HEALTH, CHARACTER_3_DAMAGE, CHARACTER_3_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();
    }

    addWeapon(scene){
        this.weapon = new CHARACTER_3_WEAPON(scene);
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

