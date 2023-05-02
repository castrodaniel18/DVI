
import ElectroballGroup from "../Projectiles/ElectroballGroup";
import Mage from "./Mage";

export const ELECTROMANCER_NAME = 'character2'
export const ELECTROMANCER_SPRITE = 'assets/sprites/electromancer'
export const ELECTROMANCER_SPRITE_SIZE = 16;
export const ELECTROMANCER_SPRITE_NAME = 'electromancer'
export const ELECTROMANCER_SELECTION = 'assets/elements/playerSelection2.png'
export const ELECTROMANCER_HEALTH = 100;
export const ELECTROMANCER_DAMAGE = 50;
export const ELECTROMANCER_SPRITE_WEAPON_NAME = 'electroball'
export const ELECTROMANCER_SPRITE_WEAPON = 'assets/sprites/electromancer/Charge_1.png'
export const ELECTROMANCER_WEAPON = ElectroballGroup
export const ELECTROMANCER_FIREBALLS = 15;
export const ELECTROMANCER_SPEED = 150;
export const ELECTROMANCER_CAST_TIME = 1200;
export const ELECTROMANCER_CRIT_PROB = 0.2;

let cursorOnPauseButton = false;

export default class Electromancer extends Mage{
    constructor(scene, sprite, x, y,inventorySize){
        super(scene, x, y, ELECTROMANCER_NAME, sprite, ELECTROMANCER_HEALTH, ELECTROMANCER_DAMAGE, ELECTROMANCER_SPEED, ELECTROMANCER_CRIT_PROB, inventorySize);

        this.addWeapon(scene);
        this.mouseClickAction();

        this.scene.anims.create({
            key:'shoot',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_shoot',{start:0,end:15}),
            frameRate: 10,
            repeat: -1
        });
    }

    preUpdate(t,dt){
        super.preUpdate(t, dt);

        this.scene.pauseButton.on('pointerover', () => {
            cursorOnPauseButton = true;
        });
    
        this.scene.pauseButton.on('pointerout', () => {
            cursorOnPauseButton = false;
        });
    }

    addWeapon(scene){
        let weaponDamage = this.damage*(1+this.damageIncrease);
        this.weapon = new ELECTROMANCER_WEAPON(scene, ELECTROMANCER_FIREBALLS);
    }

    mouseClickAction(){
        this.scene.input.on('pointerdown', pointer => {
            if (!cursorOnPauseButton){
                this.pointerX = pointer.worldX;
                this.pointerY = pointer.worldY;
                this.shoot(this.pointerX, this.pointerY, ELECTROMANCER_CAST_TIME);
            }
        })
    }

    checkHitBox(){
        if (this.anims.currentAnim.key == 'idleD'){
            this.body.setSize(35, 70);
            this.body.offset.set(43, 60);
        }
        else if (this.anims.currentAnim.key == 'D'){
            this.body.setSize(35, 65);
            this.body.offset.set(35, 65);
        }
        else if (this.anims.currentAnim.key == 'idleA'){
            this.body.setSize(35, 70);
            this.body.offset.set(50, 60);
        }
        else{
            this.body.setSize(35, 65);
            this.body.offset.set(60, 65);
        }
    }

    dashParry(){
        this.damage *= 1.5;
        this.buffDamageAnim.visible = true;
        this.buffFamageAnim.anims.play('damage_buff', true);
        setTimeout(() => {
            this.damage /= 1.5;
            this.buffDamageAnim.visible = false;
        }, 3000);
    }
}