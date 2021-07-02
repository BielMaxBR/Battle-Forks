export default class Sprite extends Phaser.GameObjects.Sprite {
    constructor(scene, { texture, frames, animsConfig }) {
        super(scene, 0, 0, texture, frames)
        scene.add.existing(this)

        this.createAnimations(texture, animsConfig)
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