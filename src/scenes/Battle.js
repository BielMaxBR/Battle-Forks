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

        this.meme = new Square(this)
        this.meme.x = 64
        this.meme.y = 64

        this.algo = this.add.rectangle(500, 64, 64, 64, 0xffffff)
        this.teams.p2.add(this.algo)
        this.physics.add.existing(this.algo, true)
        this.algo.x = 500
        this.algo.y = 64
        
        console.log('batalha iniciada')
    }
    update() {
        this.meme.update()
    }
    createTeams() {
        this.teams = {}
        this.teams.p1 = this.physics.add.group()
        this.teams.p2 = this.physics.add.group()
    }
}