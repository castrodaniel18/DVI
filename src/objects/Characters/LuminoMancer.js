import lightballGroup from "../Projectiles/LightBallGroup";
import Mage from "./Mage";

export const LUMINOMANCER_NAME = 'character3'
export const LUMINOMANCER_SPRITE = 'assets/sprites/luminomancer'
export const LUMINOMANCER_SPRITE_SIZE = 16;
export const LUMINOMANCER_SPRITE_NAME = 'luminomancer'
export const LUMINOMANCER_SELECTION = 'assets/elements/playerSelection3.png'
export const LUMINOMANCER_HEALTH = 100;
export const LUMINOMANCER_DAMAGE = 4;
export const LUMINOMANCER_SPRITE_WEAPON_NAME = 'lightball'
export const LUMINOMANCER_SPRITE_WEAPON = 'assets/sprites/luminomancer/Charge.png';
export const LUMINOMANCER_WEAPON = lightballGroup;
export const LUMINOMANCER_FIREBALLS = 20;
export const LUMINOMANCER_SPEED = 100;
export const LUMINOMANCER_CAST_TIME = 200;

let cursorOnPauseButton = false;

export default class Luminomancer extends Mage{
    constructor(scene, sprite, x, y,inventorySize){
        super(scene, x, y, LUMINOMANCER_NAME, sprite, LUMINOMANCER_HEALTH, LUMINOMANCER_DAMAGE, LUMINOMANCER_SPEED,inventorySize);

        this.addWeapon(scene);
        this.mouseClickAction();

        this.scene.anims.create({
            key:'shoot',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_shoot',{start:0,end:6}),
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
        this.weapon = new LUMINOMANCER_WEAPON(scene, LUMINOMANCER_FIREBALLS);
    }

    mouseClickAction(){
        this.scene.input.on('pointerdown', pointer => {
            if (!cursorOnPauseButton){
                this.pointerX = pointer.worldX;
                this.pointerY = pointer.worldY;
                this.shoot(this.pointerX, this.pointerY, LUMINOMANCER_CAST_TIME);
            }
        })
    }

    checkHitBox(){
        if (this.anims.currentAnim.key == 'idleD'){
            this.body.setSize(30, 66);
            this.body.offset.set(37, 63);
        }
        else if (this.anims.currentAnim.key == 'D'){
            this.body.setSize(30, 66);
            this.body.offset.set(45, 63);
        }
        else if (this.anims.currentAnim.key == 'idleA'){
            this.body.setSize(30, 66);
            this.body.offset.set(63, 63);
        }
        else{
            this.body.setSize(30, 66);
            this.body.offset.set(55, 63);
        }
    }
}