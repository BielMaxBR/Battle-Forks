import Square from '../objects/memes/Square.js'
import Square2 from '../objects/memes/Square2.js'

export default class Battle extends Phaser.Scene {
    constructor() {
        super("Battle")
    }
    create() {
        this.createTeams()
        this.meme = new Square(this, 64, 64, 'p1')

        this.algo = new Square2(this, 500, 64, 'p2')

        console.log('batalha iniciada')
    }
    update() {
        this.teams.p1.inGame.children.iterate(this.updateMeme)
        this.teams.p2.inGame.children.iterate(this.updateMeme)
    }

    updateMeme(meme) {
        meme.update()
    }

    createTeams() {
        this.teams = {
            p1: {
                hand: [],
                inGame: this.physics.add.group()
            },
            p2: {
                hand: [],
                inGame: this.physics.add.group()
            }
        }
    }
}