import FireballGroup from "../Projectiles/FireballGroup";
import Mage from "./Mage";

export const ELECTROMANCER_NAME = 'character2'
export const ELECTROMANCER_SPRITE = 'assets/sprites/electromancer'
export const ELECTROMANCER_SPRITE_SIZE = 16;
export const ELECTROMANCER_SPRITE_NAME = 'electromancer'
export const ELECTROMANCER_SELECTION = 'assets/elements/playerSelection2.png'
export const ELECTROMANCER_HEALTH = 100;
export const ELECTROMANCER_DAMAGE = 3;
export const ELECTROMANCER_SPRITE_WEAPON_NAME = 'fireball'
export const ELECTROMANCER_SPRITE_WEAPON = 'assets/elemnts/fireball'
export const ELECTROMANCER_WEAPON = FireballGroup
export const ELECTROMANCER_FIREBALLS = 15;
export const ELECTROMANCER_SPEED = 150;
export const ELECTROMANCER_CAST_TIME = 1400;

export default class Electromancer extends Mage{
    constructor(scene, sprite, x, y){
        super(scene, x, y, ELECTROMANCER_NAME, sprite, ELECTROMANCER_HEALTH, ELECTROMANCER_DAMAGE, ELECTROMANCER_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();

        this.scene.anims.create({
            key:'shoot',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_shoot',{start:0,end:6}),
            frameRate: 5,
            repeat: -1
        });
    }

    addWeapon(scene){
        this.weapon = new ELECTROMANCER_WEAPON(scene, ELECTROMANCER_FIREBALLS);
    }

    mouseClickAction(){
        this.scene.input.on('pointerdown', pointer => {
            this.pointerX = pointer.worldX;
            this.pointerY = pointer.worldY;
            this.shoot(this.pointerX, this.pointerY, ELECTROMANCER_CAST_TIME);
        })
    }
}