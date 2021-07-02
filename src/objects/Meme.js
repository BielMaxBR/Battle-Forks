import Container from './Container.js'

export default class Meme extends Phaser.GameObjects.Sprite {
    constructor(scene, name, { texture, frames, animsConfig }) {
        super(scene, 0, 0, texture, frames)
        
        scene.physics.add.existing(this, false)
        scene.add.existing(this)

        this.body.offset.y = 32
        this.body.height = 32
        
        this.name = name
        this.children = new Container(scene, 0, 0)

        // criar o sprite e suas animações
        // criar os eventos de colisão
        this.#createAnimations(texture, animsConfig)
        // criar o gerenciador de animações
        this.play('walk')
        // criar os eventos de ataque
        // criar o sistema de morte e delete
        console.log(this.body)
    }
    update() {
        this.body.setVelocity(0);
        if (this.x <= 500) {
            this.body.setVelocityX(100)
        } else if (this.anims.currentAnim.key != 'idle') {
            this.play('idle')
        }

    }
    #createAnimations(texture, { frameRate, anims }) {
        for (const anim of anims) {
            this.anims.create({
                key: anim.key,
                frames: this.anims.generateFrameNames(texture, {
                    start: anim.start,
                    end: anim.end
                }),
                frameRate,
                repeat: -1

            })
        }
    }
}