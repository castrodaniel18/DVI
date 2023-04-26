import ExperiencePoint from "./ExperiencePoint";

const EXP_SPRITES = ['experience_red', 'experience_green','experience_blue', 'experience_purple', 'experience_yellow'];

const MIN_EXP = 2;
const MAX_EXP = 6;
const MAX_DISTANCE = 30;

export default class ExperiencePointGroup extends Phaser.GameObjects.Group{
    constructor(scene, xReference, yReference){
        super(scene.physics.world, scene);
        this.scene = scene;
        this.experiencePoints = [];
        this.createExpPoints(xReference, yReference);
    }

    createExpPoints(xReference, yReference){
        this.numExps = Phaser.Math.Between(MIN_EXP, MAX_EXP);
        for (let i=0; i<this.numExps; i++){
            let x =Phaser.Math.Between(xReference - MAX_DISTANCE, xReference + MAX_DISTANCE)
            let y =Phaser.Math.Between(yReference - MAX_DISTANCE, yReference + MAX_DISTANCE)
            x = Phaser.Math.Clamp(x, 0, this.scene.game.config.width);
            y = Phaser.Math.Clamp(y, 0, this.scene.game.config.height);
            let color = Phaser.Math.Between(0, 4);
            const expPoint = new ExperiencePoint(this.scene, x, y, EXP_SPRITES[color]);
            this.experiencePoints.push(expPoint);
        }
    }
}