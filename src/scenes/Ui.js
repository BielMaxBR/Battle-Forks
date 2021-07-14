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

    init({ buttonsConfig, battleScene }) {
        this.buttonsConfig = buttonsConfig
        this.battleScene = battleScene
        console.log(typeof battleScene)
        this.createButtons()
    }

    create() {
        console.log('%c Ui carregada', 'color:pink')
    }

    update() {
        this.updateList.forEach(obj => {
            obj.update()
        })
    }

    createButtons() {
        this.hotbar = new Hotbar(this, this.game.config.width/2, 426, {
            buttonsConfig: this.buttonsConfig,
            rows: 1,
            columns: 5,
            width: 500,
            margin: 2
        })
    }
}