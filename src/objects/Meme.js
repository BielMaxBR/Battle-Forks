import enums from "../utils/enums.js"

export default class Meme extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 0, y = 0, team, { texture, frames, animsConfig }) {
        super(scene, x, y, texture, frames)

        this.team = team
        this.velocity = 60

        scene.physics.add.existing(this, false)
        scene.add.existing(this)

        this.state = 1

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
        // criar os eventos de ataque
        // criar o sistema de morte e delete
    }

    update() {
        this.checkOverlap()
        this.checkMovement()
        this.checkAnimation()
    }

    move() {
        this.body.setVelocity(0)

        this.body.setVelocityX(this.velocity)

        this.attackZone.body.setVelocity(this.body.velocity.x, this.body.velocity.y)
    }

    checkMovement() {
        switch (this.state) {
            case enums.WALK.id:
                this.move()
                break
        }
    }

    checkAnimation() {
        const currentAnimId = this.getAnimation(this.anims.currentAnim.key, true).id

        if (this.state != currentAnimId) {

            this.play(this.getAnimation(this.state, false).name)
        }
    }

    getAnimation(value, isName) {
        return Object.values(enums).find(
            anim => {
                return (isName ? anim.name : anim.id) == value

            })
    }

    checkOverlap() {
        var bodyList = this.scene.physics.overlapRect(this.attackZone.x, this.attackZone.y, this.attackZone.body.width - this.attackZone.body.width / 2, this.attackZone.body.height)
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
        this.play('walk')
    }
}