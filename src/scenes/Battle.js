import Meme from '../objects/Meme.js'

export default class Battle extends Phaser.Scene {
    constructor() {
        super("Battle")
    }
    preload() {

    }
    create() {
        this.meme = new Meme(this, "meme")
        this.meme.x = 10
        this.meme.y = 10
        console.log('batalha iniciada')
    }
    update() {
        this.meme.update()
    }
}