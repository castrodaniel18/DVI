import Character from "./Character";
import FireballGroup from "../Projectiles/FireballGroup";

export const CHARACTER_1_NAME = 'character1';
export const CHARACTER_1_SPRITE = 'assets/sprites/character1.png';
export const CHARACTER_1_SPRITE_SIZE = 16;
export const CHARACTER_1_SPRITE_NAME = 'character1_sprite';
export const CHARACTER_1_SELECTION = 'assets/elements/playerSelection1.png';
export const CHARACTER_1_HEALTH = 150;
export const CHARACTER_1_DAMAGE = 3;
export const CHARACTER_1_SPRITE_WEAPON_NAME = 'fireball';
export const CHARACTER_1_SPRITE_WEAPON = 'assets/elemnts/fireball';
export const CHARACTER_1_WEAPON = FireballGroup;
export const CHARACTER_1_SPEED = 100;

export default class Character1 extends Character{
    constructor(scene, sprite, x, y){
        super(scene, x, y, CHARACTER_1_NAME, sprite, CHARACTER_1_HEALTH, CHARACTER_1_DAMAGE, CHARACTER_1_SPEED);
    }
}