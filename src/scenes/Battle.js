import Square from '../objects/memes/Square.js'
import Square2 from '../objects/memes/Square2.js'

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

        this.algo = new Square2(this, 500, 64, 'p2')

        console.log('batalha iniciada')
    }
    update() {
        this.teams.p1.children.iterate(this.updateMeme)
        this.teams.p2.children.iterate(this.updateMeme)
    }

    updateMeme(meme) {
        meme.update()
    }

    createTeams() {
        this.teams = {}
        this.teams.p1 = this.physics.add.group()
        this.teams.p2 = this.physics.add.group()
        this.teams.p1.runChildUpdate = true
        this.teams.p2.runChildUpdate = true
    }
}