import FireballGroup from "../Projectiles/FireballGroup";
import Mage from "./Mage";

export const LUMINOMANCER_NAME = 'character3'
export const LUMINOMANCER_SPRITE = 'assets/sprites/luminomancer'
export const LUMINOMANCER_SPRITE_SIZE = 16;
export const LUMINOMANCER_SPRITE_NAME = 'luminomancer'
export const LUMINOMANCER_SELECTION = 'assets/elements/playerSelection3.png'
export const LUMINOMANCER_HEALTH = 100;
export const LUMINOMANCER_DAMAGE = 4;
export const LUMINOMANCER_SPRITE_WEAPON_NAME = 'fireball'
export const LUMINOMANCER_SPRITE_WEAPON = 'assets/elemnts/fireball'
export const LUMINOMANCER_WEAPON = FireballGroup;
export const LUMINOMANCER_FIREBALLS = 20;
export const LUMINOMANCER_SPEED = 100;

export default class Luminomancer extends Mage{
    constructor(scene, sprite, x, y){
        super(scene, x, y, LUMINOMANCER_NAME, sprite, LUMINOMANCER_HEALTH, LUMINOMANCER_DAMAGE, LUMINOMANCER_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();
    }

    addWeapon(scene){
        this.weapon = new LUMINOMANCER_WEAPON(scene, LUMINOMANCER_FIREBALLS);
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