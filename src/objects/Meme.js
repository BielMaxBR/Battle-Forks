//import Container from './Container.js'
var colidindo = false
export default class Meme extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 0, y = 0, { texture, frames, animsConfig }) {
        super(scene, 0, 0, texture, frames)
        this.x = x
        this.y = y
        scene.physics.add.existing(this, false)
        scene.add.existing(this)

        //this.children = new Container(scene, 0, 0)

        this.body.offset.y = 32
        this.body.height = 32

        this.attackZone = scene.add.zone(this.x + this.width, this.y, this.body.width, 32)
        scene.physics.add.existing(this.attackZone, false)

        // criar o sprite e suas animações
        this.#createAnimations(texture, animsConfig)
        // criar os eventos de colisão
        scene.physics.add.overlap(this.attackZone, scene.teams.p2, this.overlapCallback, null, scene)
        // criar o gerenciador de animações
        this.play('walk')
        // criar os eventos de ataque
        // criar o sistema de morte e delete
    }
    update() {
        this.body.setVelocity(0);
        if (!colidindo) {
            this.body.setVelocityX(100)
        } else if (this.anims.currentAnim.key != 'idle') {
            this.play('idle')
        }
        this.attackZone.body.setVelocity(this.body.velocity.x, this.body.velocity.y)
        colidindo = false
    }
    overlapCallback(thisMeme, outro) {
        colidindo = true
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