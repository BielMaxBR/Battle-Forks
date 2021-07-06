import enums from "../utils/enums.js"

export default class Meme extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 0, y = 0, team, combatConfig, { texture, frames, animsConfig }) {
        super(scene, x, y, texture, frames)

        this.team = team
        scene.teams[team].add(this)
        if (this.team == 'p1') {
            this.direction = 1
        } else {
            this.direction = -1
        }

        this.combatConfig = combatConfig

        this.velocity = this.combatConfig.velocity * this.direction

        this.actualLife = this.combatConfig.life

        this.canAttack = true

        this.isStuned = false

        scene.physics.add.existing(this, false)
        scene.add.existing(this)

        this.state = 1

        this.body.offset.y = 32
        this.body.height = 32

        // criar o sprite e suas animações
        this.createAnimations(texture, animsConfig)

        this.flipX = this.direction == -1 ? true : false
        // criar os eventos de colisão
        this.attackZone = scene.add.zone(this.x, this.y, this.combatConfig.range, 32)
        scene.physics.add.existing(this.attackZone)
        this.attackZone.x += (this.attackZone.width / 2) * this.direction
        this.attackZone.Enemys = []

        this.attackZone.on('overlapstart', () => {
            this.colidindo = true
        })
        this.attackZone.on('overlapend', () => {
            this.colidindo = false
        })
        // criar o gerenciador de animações
        // criar os eventos de ataque
        this.on('animationrepeat', anim => {
            if (anim.key == enums.ATTACK.name) {
                this.state = enums.IDLE.id

                this.scene.time.addEvent({
                    delay: this.combatConfig.cooldown,
                    callback: () => this.canAttack = true,
                    loop: false,
                })
            }
        })
        this.on('animationupdate', (anim, frame) => {
            if (anim.key == enums.ATTACK.name) {
                if (this.combatConfig.attackFrames.indexOf(+frame.textureFrame) != -1) {
                    this.attack()
                }
            }
        })
        this.calcAttackFrameRate(this.combatConfig.attackSpeed)
        
        // criar o sistema de morte e delete
    }

    update() {
        this.updateState()
        this.checkOverlap()
        this.checkMovement()
        this.checkAnimation()
    }
    
    calcAttackFrameRate(duration) {
        let anim = this.anims.anims.entries[enums.ATTACK.name]
        let frames = anim.frames.length
        
        anim.frameRate = 1000/duration*frames
    }

    updateState() {
        if (this.isStuned) {
            this.state = enums.STUN.id
        } else {

            if (this.canAttack) {
                if (this.colidindo) {
                    this.canAttack = false
                    this.state = enums.ATTACK.id
                }
                if (!this.colidindo) {
                    this.state = enums.WALK.id
                }
            }
        }

    }

    attack() {
        switch (this.combatConfig.type) {
            case 'single':
                const enemy = this.attackZone.Enemys[0]
                if (!enemy) return
                //console.log('hit')
                enemy.takeDamage(this.combatConfig.damage)
                break
        }
    }

    takeDamage(damage) {
        if (this.isStuned) return

        const oldLife = this.actualLife
        this.actualLife -= damage

        const stunCheck = this.checkIfStun(oldLife, this.actualLife)

        if (stunCheck[0]) this.stun(stunCheck[1])
    }

    checkIfStun(oldLife, newLife) {
        if (newLife <= 0) {
            return [true, true]
        }

        for (const stunPoint of this.combatConfig.stunPoints) {
            if (oldLife > stunPoint && newLife <= stunPoint) {
                return [true, false]
            }
        }
        return [false, false]
    }

    stun(toDeath) {
        this.isStuned = true
        this.canAttack = false
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                if (toDeath) {
                    this.attackZone.destroy()
                    this.destroy()
                }

                this.isStuned = false
                this.canAttack = true

            },
            loop: false
        })
    }

    move() {
        this.body.setVelocity(0)
        this.attackZone.body.setVelocity(0)

        this.body.setVelocityX(this.velocity)

        this.attackZone.body.setVelocityX(this.velocity)
    }

    stunMove() {
        this.body.setVelocity(0)
        this.attackZone.body.setVelocity(0)

        const stunVel = 200 * -this.direction


        this.body.setVelocityX(stunVel)

        this.attackZone.body.setVelocityX(stunVel)
    }


    checkMovement() {
        switch (this.state) {
            case enums.WALK.id:
                this.move()
                break
            case enums.STUN.id:
                this.stunMove()
                break
            default:
                this.body.setVelocity(0)
                this.attackZone.body.setVelocity(0)
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
        var bodyList = this.scene.physics.overlapRect(this.attackZone.body.x, this.attackZone.body.y, this.attackZone.body.width, this.attackZone.body.height)
        var objectList = []

        bodyList.forEach((body) => {
            const obj = body.gameObject

            if (obj.team) {

                if (obj.team != this.team) {
                    if (!obj.isStuned) {
                        objectList.push(obj)
                    }
                }
            }

        })
        objectList = objectList.sort((a, b) => {
            var distA = Phaser.Math.Distance.BetweenPoints(this, a)
            var distB = Phaser.Math.Distance.BetweenPoints(this, b)
            if (distA < distB) {
                return 1
            }
            if (distA > distB) {
                return -1
            }
            return 0
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