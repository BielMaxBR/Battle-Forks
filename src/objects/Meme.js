import Container from '../utils/Container.js'

export default class Meme extends Phaser.GameObjects.GameObject {
    constructor(scene, name) {
        super(scene, name)
        this.children = new Container(scene, this.x, this.y)
        this.sprite = scene.add.rectangle(this.x, this.y, 10, 10, 0xffffff)
        this.children.add(this.sprite)
        
        this.once('destroy',()=>{
            this.children.destroy()
        })
    }
    update() {
        this.x += 1
        
        this.children.x = this.x
        this.children.y = this.y
    }
}