export default class Base extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, team) {
        super(scene, x, y)

        this.team = team

        this.scene.physics.add.existing(this, false)
        this.scene.add.existing(this)

        this.actualLife = 30
    }
    takeDamage(damage) {
        this.actualLife -= damage
        if(this.actualLife <= 0) {
            console.log(`%c adversário de ${this.team} ganhou!`,'color:#28ed00;')
            this.destroy()
        }
    }
}