import Square from '../objects/memes/Square.js'

export default class Battle extends Phaser.Scene {
    constructor() {
        super("Battle")
    }
    preload() {
        this.load.spritesheet('test', './src/assets/testAnim.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 17,
        })
        this.createTeams()
    }
    create() {
        this.meme = new Square(this, 64, 64, 'p1')

        this.algo = new Square(this, 500, 64, 'p2')

        console.log('batalha iniciada')
    }
    update() {
        for (const meme of this.teams.p1.getChildren()) {
            meme.update()
        }
        for (const meme of this.teams.p2.getChildren()) {
            meme.update()
        }
    }
    createTeams() {
        this.teams = {}
        this.teams.p1 = this.physics.add.group()
        this.teams.p2 = this.physics.add.group()
        this.teams.p1.runChildUpdate = true
        this.teams.p2.runChildUpdate = true
    }
}