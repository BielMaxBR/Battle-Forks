import BaseButton from './BaseButton.js'
import ProgressBar from './ProgressBar.js'

export default class UnitButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, { texture, width, height, price, cooldown }) {
        super(scene, x, y)
        scene.add.existing(this)

        this.price = price
        this.cooldown = cooldown

        this.button = new BaseButton(scene, 0, 0, { texture, width, height })
        this.add(this.button)

        this.bar = new ProgressBar(scene, 0, height * (3 / 4), width, height / 4, {
            backColor: 0x333333,
            barColor: 0x94fffb,
            borderColor: 0x3f3f3f,
            borderSize: 1.5,
            minValue: 0,
            maxValue: cooldown,
            value: 0
        })
        this.add(this.bar)

        this.bar.setVisible(false)

        this.priceText = scene.add.text(0, height / 2, this.price, {
            fontFamily: 'tiny',
            color: "yellow",
            stroke: '#000',
            strokeThickness: 5,
        })
        this.add(this.priceText)
    }

}