import Container from './Container.js'
import Sprite from './Sprite.js'

export default class Meme extends Phaser.GameObjects.GameObject {
    constructor(scene, name, spriteConfig) {
        super(scene, 'sprite')
        this.name = name
        this.children = new Container(scene, 0, 0)

        this.sprite = new Sprite(scene, spriteConfig)
        this.children.add(this.sprite)

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
        this.sprite.play('walk')
        
    }
    update() {
        if (this.x <= 500) {
            this.x += 1
        } else if(this.sprite.anims.currentAnim.key != 'idle') {
            this.sprite.play('idle')
        } 

        this.children.x = this.x
        this.children.y = this.y

    }
}