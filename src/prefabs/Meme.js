import states from "../utils/states.js"
import { STUNTIME, STUNSPEED } from "../utils/constants.js"

export default class Meme extends Phaser.GameObjects.Sprite {
    constructor(scene, x = 0, y = 0, team, direction = 1, combatConfig, spriteConfig) {
        super(scene, x, y, spriteConfig.texture)

        this.setDirectionAndTeam(team, direction)
        this.setAnimationAndCallbacks(spriteConfig)
        this.createCombatConfig(combatConfig)
        this.setStateAndPhysics()
        this.createAttackZone()

    }

    setDirectionAndTeam(team,direction) {
        this.team = team
        this.direction = direction
    }

    setAnimationAndCallbacks({ texture, frames, animsConfig }) {
        this.createAnimations(texture, animsConfig)

        this.flipX = this.direction == -1 ? true : false

        this.on('animationrepeat', anim => {
            if (anim.key == states.ATTACK.name) {
                this.state = states.IDLE.id

                this.scene.time.addEvent({
                    delay: this.combatConfig.cooldown,
                    callback: () => this.canAttack = true,
                    loop: false,
                })
            }
        })
        this.on('animationupdate', (anim, frame) => {
            if (anim.key == states.ATTACK.name) {
                if (this.combatConfig.attackFrames.indexOf(+frame.textureFrame) != -1) {
                    this.attack()
                }
            }
        })


    }

    createCombatConfig(config) {
        this.combatConfig = config

        this.velocity = config.velocity * this.direction
        this.actualLife = config.life

        this.canAttack = true
        this.isStuned = false

        this.calcAttackFrameRate(config.attackTime)
    }

    setStateAndPhysics() {
        this.state = states.WALK.id

        this.scene.physics.add.existing(this, false)
        this.scene.add.existing(this)

        this.body.offset.y = 32
        this.body.height = 32

    }

    createAttackZone() {
        this.attackZone = this.scene.add.zone(this.x, this.y, this.combatConfig.range, 32)
        this.scene.physics.add.existing(this.attackZone)

        this.attackZone.x += (this.attackZone.width / 2) * this.direction

        this.attackZone.Enemys = []

        this.attackZone.on('overlapstart', () => {
            this.colidindo = true
        })
        this.attackZone.on('overlapend', () => {
            this.colidindo = false
        })
    }

    update() {
        this.updateState()
        this.checkOverlap()
        this.checkMovement()
        this.checkAnimation()
        this.checkBorder()
    }

    checkBorder() {
        if (this.x > this.scene.game.config.width+this.width || this.x < -this.width) {
            this.scene.teams[this.team].inGame.remove(this)
            this.attackZone.destroy()
            this.destroy()
        }
    }

    calcAttackFrameRate(duration) {
        let anim = this.anims.anims.entries[states.ATTACK.name]
        let frames = anim.frames.length

        anim.frameRate = 1000 / duration * frames
    }

    updateState() {
        if (this.isStuned) {
            this.state = states.STUN.id
        } else {

            if (this.canAttack) {
                if (this.colidindo) {
                    this.canAttack = false
                    this.state = states.ATTACK.id
                }
                if (!this.colidindo) {
                    this.state = states.WALK.id
                }
            }
        }

    }

    attack() {
        switch (this.combatConfig.type) {
            case 'single':
                const enemy = this.attackZone.Enemys[0]
                if (!enemy) return

                enemy.takeDamage(this.combatConfig.damage)
                break
        }
    }

    takeDamage(damage) {
        if (this.isStuned) return

        const oldLife = this.actualLife
        this.actualLife -= damage

        const { runStun, isDead } = this.checkIfStun(oldLife, this.actualLife)

        if (runStun) this.stun(isDead)
    }

    checkIfStun(oldLife, newLife) {
        if (newLife <= 0) {
            return {
                runStun: true,
                isDead: true
            }
        }

        for (const stunPoint of this.combatConfig.stunPoints) {
            if (oldLife > stunPoint && newLife <= stunPoint) {
                return {
                    runStun: true,
                    isDead: false
                }
            }
        }
        return {
            runStun: false,
            isDead: false
        }
    }

    stun(toDeath) {
        this.isStuned = true
        this.canAttack = false
        this.scene.time.addEvent({
            delay: STUNTIME,
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

        const stunVel = STUNSPEED * -this.direction


        this.body.setVelocityX(stunVel)

        this.attackZone.body.setVelocityX(stunVel)
    }


    checkMovement() {
        switch (this.state) {
            case states.WALK.id:
                this.move()
                break
            case states.STUN.id:
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
        return Object.values(states).find(
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