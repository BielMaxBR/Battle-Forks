import { SCENE } from "../utils/constants.js"

import Hotbar from "../prefabs/ui/Hotbar.js"
import ProgressBar from "../prefabs/ui/ProgressBar.js"

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: SCENE.UI })
    }

    preload() {
        this.load.image('baseTexture', '/src/assets/emptyShape.png')
    }

    init(buttonsConfig) {
        this.buttonsConfig = buttonsConfig
    }

    create() {
        this.createButtons()
        console.log('%c Ui carregada', 'color:pink')
    }

    createButtons() {
        this.hotbar = new Hotbar(this, this.buttonsConfig)
        this.test = new ProgressBar(this, 0, 200, 640, 100, {
            backColor: 0x555555,
            barColor: 0xfffff0,
            borderSize: 20,
            minValue: 0,
            maxValue: 10,
            value: 0
        })
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.test.addValue(1)
                
                console.log(this.test.value)
            },
            loop:true
        })
    }
}