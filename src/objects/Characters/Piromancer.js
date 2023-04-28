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
export const PIROMANCER_SPRITE_WEAPON = 'assets/sprites/piromancer/Charge.png';
export const PIROMANCER_WEAPON = FireballGroup;
export const PIROMANCER_FIREBALLS = 15;
export const PIROMANCER_SPEED = 100;
export const PIROMANCER_CAST_TIME = 800;

let cursorOnPauseButton = false;

export default class Piromancer extends Mage{
    constructor(scene, sprite, x, y){
        super(scene, x, y, PIROMANCER_NAME, sprite, PIROMANCER_HEALTH, PIROMANCER_DAMAGE, PIROMANCER_SPEED);

        this.addWeapon(scene);
        this.mouseClickAction();

        this.scene.anims.create({
            key:'shoot',
            frames: this.scene.anims.generateFrameNumbers(this.sprite + '_shoot',{start:0,end:7}),
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
        this.weapon = new PIROMANCER_WEAPON(scene, PIROMANCER_FIREBALLS);
    }

    mouseClickAction(){
        this.scene.input.on('pointerdown', pointer => {
            if (!cursorOnPauseButton){
                this.pointerX = pointer.worldX;
                this.pointerY = pointer.worldY;
                this.shoot(this.pointerX, this.pointerY, PIROMANCER_CAST_TIME);
            }
        })
    }

    checkHitBox(){
        if (this.anims.currentAnim.key == 'idleD'){
            this.body.setSize(35, 70);
            this.body.offset.set(30, 60);
        }
        else if (this.anims.currentAnim.key == 'D'){
            this.body.setSize(35, 65);
            this.body.offset.set(35, 65);
        }
        else if (this.anims.currentAnim.key == 'idleA'){
            this.body.setSize(35, 70);
            this.body.offset.set(62, 60);
        }
        else{
            this.body.setSize(35, 65);
            this.body.offset.set(60, 65);
        }
    }
}