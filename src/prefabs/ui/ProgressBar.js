export default class ProgressBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, { backColor, barColor, borderSize = 0, minValue = 0, maxValue = 1, value = 1 }) {
        super(scene, x, y)

        scene.add.existing(this)

        this.height = height
        this.width = width

        this.background = scene.add.rectangle(x, y, width, height, backColor)
        this.background.setStrokeStyle(borderSize, 0xff0000)
        this.add(this.background)
        this.bar = scene.add.rectangle(x, y, width, height, barColor)
        this.bar.width = this.width * (this.value - this.minValue) / (this.maxValue - this.minValue)
        this.add(this.bar)

        this.minValue = minValue
        this.maxValue = maxValue
        this.value = value


    }
    setHeight(v) {
        this.height = v
        this.background.height = v
        this.bar.height = v
    }
    setWidth(v) {
        this.width = v
        this.background.width = v
        this.bar.width = v
    }
    addValue(value) {
        this.value += value
        this.bar.width = this.width * (this.value - this.minValue) / (this.maxValue - this.minValue)
    }
}