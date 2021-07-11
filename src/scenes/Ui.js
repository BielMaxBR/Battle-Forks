import { SCENE } from "../utils/constants.js"

import Hotbar from "../prefabs/ui/Hotbar.js"
import UnitButton from "../prefabs/ui/UnitButton.js"

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
        this.test = new UnitButton(this, 100, 150, {
            texture: "i1",
            width: 64,
            height: 40,
            price: 50,
            cooldown: 2
        })
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                //this.test.addValue(1)
            },
            loop: true
        })
    }
}