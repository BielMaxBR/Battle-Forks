import Container from '../utils/Container.js'

export default class Meme extends Phaser.GameObjects.GameObject {
    constructor(scene, name) {
        super(scene, name)
        // this.children = new Container(scene, this.x, this.y)

        // this.sprite = scene.add.sprite(this.x, this.y, 'test')
        // this.children.add(this.sprite)

        // this.sprite.anims.create({
        //     key: 'walk',
        //     frames: this.sprite.anims.generateFrameNames('test',{
        //         start: 0,
        //         end: 3,
        //     }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // this.sprite.play('walk')
        // this.once('destroy', () => {
        //     this.children.destroy()
        // })


        // gerar o Container com o sprite
        // criar o sprite e suas animações
        // criar os eventos de colisão
        // criar o gerenciador de animações
        // criar os eventos de ataque
        // criar o sistema de morte e delete
    }
    update() {
        this.x += 1

        this.children.x = this.x
        this.children.y = this.y
    }
}