import Character from "./Character";

export const CHARACTER_3_NAME = 'character3'
export const CHARACTER_3_SPRITE = 'assets/sprites/character3.png'
export const CHARACTER_3_SPRITE_NAME = 'character3_sprite'
export const CHARACTER_3_SELECTION = 'assets/elements/playerSelection3.png'
export const CHARACTER_3_HEALTH = 100;
export const CHARACTER_3_DAMAGE = 4;
export const CHARACTER_3_WEAPON = 'fireball'
export const CHARACTER_3_SPEED = 100;

export default class Character3 extends Character{
    constructor(scene, sprite, x, y){
        super(scene, x, y, CHARACTER_3_NAME, sprite, CHARACTER_3_HEALTH, CHARACTER_3_DAMAGE, CHARACTER_3_WEAPON, CHARACTER_3_SPEED);
    }
}