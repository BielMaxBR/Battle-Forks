import { SCENE } from "../utils/constants.js";

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: SCENE.UI })
    }

    init(buttonsConfig) {
        this.buttonsConfig = buttonsConfig
    }

    create() {
        this.createButtons()
        console.log('%c Ui carregada', 'color:pink')
    }

    createButtons() {
        this.hotbar = new Hotbar(this,this.buttonsConfig)
    }
}