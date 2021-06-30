import Meme from '../objects/Meme.js'

export default class Battle extends Phaser.Scene {
    constructor() {
        super("Battle")
    }
    preload() {
        this.load.spritesheet('test', './src/assets/testAnim.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 3,
        })
    }
    create() {
        this.meme = new Meme(this, "meme")
        this.meme.x = 64
        this.meme.y = 64
        console.log('batalha iniciada')
    }
    update() {
        this.meme.update()
    }
}