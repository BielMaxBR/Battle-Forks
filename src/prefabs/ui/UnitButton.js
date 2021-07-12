import BaseButton from './BaseButton.js'
import ProgressBar from './ProgressBar.js'

export default class UnitButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, { id, team, texture = 'baseTexture', width, height, price, cooldown }) {
        super(scene, x, y)
        scene.add.existing(this)
        scene.updateList.push(this)

        this.price = price
        this.cooldown = cooldown
        this.id = id
        this.team = team
        this.inCoolDown = true

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
        this.bar.setVisible(false)
        this.add(this.bar)

        this.priceText = scene.add.text(0, height - 15, this.price, {
            fontFamily: 'tiny',
            fontSize: 32,
            color: "yellow",
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#000',
                blur: 7,
                stroke: true,
                fill: true
            },
            stroke: '#000',
            strokeThickness: 3,
            resolution: 200
        })
        this.add(this.priceText)

        this.button.on('pressed', () => {
            if (this.inCoolDown) {
                this.inCoolDown = false
                this.emit('buy',this)

                this.timer = scene.time.addEvent({
                    delay: cooldown,
                    callback: () => this.inCoolDown = true,
                    loop: false
                })
            }
        })
    }

    update() {
        if (!this.inCoolDown) {
            this.bar.setVisible(true)
            this.priceText.setVisible(false)
            this.bar.setValue(this.timer.getElapsed())
        } else {
            this.bar.setVisible(false)
            this.priceText.setVisible(true)
        }
    }

}