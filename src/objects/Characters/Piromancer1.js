import Character from "./Character";
import FireballGroup from "../Projectiles/FireballGroup";
import Piromancer from "./Piromancer";

export const CHARACTER_1_NAME = 'piromancer1';
export const CHARACTER_1_SPRITE = 'assets/sprites/piromancer';
export const CHARACTER_1_SPRITE_SIZE = 16;
export const CHARACTER_1_SPRITE_NAME = 'character1_sprite';
export const CHARACTER_1_SELECTION = 'assets/elements/playerSelection1.png';
export const CHARACTER_1_HEALTH = 150;
export const CHARACTER_1_DAMAGE = 3;
export const CHARACTER_1_SPRITE_WEAPON_NAME = 'fireball';
export const CHARACTER_1_SPRITE_WEAPON = 'assets/elemnts/fireball';
export const CHARACTER_1_WEAPON = FireballGroup;
export const CHARACTER_1_FIREBALLS = 15;
export const CHARACTER_1_SPEED = 100;

export default class Piromancer1 extends Piromancer{
    constructor(scene, sprite, x, y){
        super(scene, x, y, CHARACTER_1_NAME, sprite, CHARACTER_1_HEALTH, CHARACTER_1_DAMAGE, CHARACTER_1_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();
    }

    addWeapon(scene){
        this.weapon = new CHARACTER_1_WEAPON(scene, CHARACTER_1_FIREBALLS);
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