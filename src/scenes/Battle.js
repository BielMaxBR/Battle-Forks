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
    }
    create() {
        this.game.fps = 30
        console.log(this.add.rectangle)
        this.meme = new Square(this)
        this.meme.x = 64
        this.meme.y = 64
        console.log('batalha iniciada')
    }
    update() {
        this.meme.update()
    }
}