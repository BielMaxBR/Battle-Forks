import { SCENE } from "../utils/constants.js"

import Hotbar from "../prefabs/ui/Hotbar.js"
import UnitButton from "../prefabs/ui/UnitButton.js"

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: SCENE.UI })
        this.updateList = []
    }

    preload() {
        this.load.image('baseTexture', '/src/assets/emptyShape.png')
        this.cameras.main.setRoundPixels(true)
    }

    init(buttonsConfig) {
        this.buttonsConfig = buttonsConfig
    }

    create() {
        this.createButtons()
        console.log('%c Ui carregada', 'color:pink')
    }

    update() {
        this.updateList.forEach(obj => {
            obj.update()
        })
    }

    createButtons() {
        this.hotbar = new Hotbar(this, this.buttonsConfig)
        this.test = new UnitButton(this, 100, 150, {
            texture: "i1",
            width: 64,
            height: 40,
            price: 50,
            cooldown: 2000
        })
        this.test.setScale(2)
    }
}