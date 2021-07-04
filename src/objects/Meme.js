//import Container from './Container.js'

export default class Meme extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 0, y = 0, team, { texture, frames, animsConfig }) {
        super(scene, 0, 0, texture, frames)
        this.x = x
        this.y = y

        this.team = team

        scene.physics.add.existing(this, false)
        scene.add.existing(this)

        //this.children = new Container(scene, 0, 0)

        this.body.offset.y = 32
        this.body.height = 32



        // criar o sprite e suas animações
        this.createAnimations(texture, animsConfig)
        // criar os eventos de colisão
        this.attackZone = scene.add.zone(this.x + this.width, this.y, this.body.width, 32)
        scene.physics.add.existing(this.attackZone)
        this.attackZone.Enemys = []

        this.attackZone.on('overlapstart', () => {
            this.colidindo = true
        })
        this.attackZone.on('overlapend', () => {
            this.colidindo = false
        })
        // criar o gerenciador de animações
        this.play('walk')
        // criar os eventos de ataque
        // criar o sistema de morte e delete

    }
    update() {
        this.checkOverlap()
        this.move()
    }

    move() {
        this.body.setVelocity(0)

        if (!this.colidindo) {
            this.body.setVelocityX(100)
            
        } else if (this.anims.currentAnim.key != 'idle') {
            this.attackZone.Enemys[0].destroy()
            this.play('idle')
        }
        this.attackZone.body.setVelocity(this.body.velocity.x, this.body.velocity.y)
    }

    checkOverlap() {
        var bodyList = this.scene.physics.overlapRect(this.attackZone.x, this.attackZone.y, this.attackZone.body.width-this.attackZone.body.width/2, this.attackZone.body.height)
        var objectList = []

        bodyList.forEach((body) => {
            const obj = body.gameObject
            if (obj.team) {
                if (obj.team != this.team) {
                    objectList.push(obj)
                }

            }

        })

        this.attackZone.Enemys = objectList

        if (objectList.length > 0) this.attackZone.emit("overlapstart")
        else this.attackZone.emit("overlapend")
    }

    createAnimations(texture, { frameRate, anims }) {
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