export default class BaseButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, { texture = 'baseTexture', width, height }) {
        super(scene, x, y, texture)

        scene.add.existing(this)

        this.setInteractive()

        this.isPressed = false

        this.on('pointerdown', () => {
            this.emit('pressed')
            this.isPressed = true
        });
        this.on('pointerup', () => {
            this.emit('released')
            this.isPressed = false
        });

    }
}