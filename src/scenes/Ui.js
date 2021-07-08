import { SCENE } from "../utils/constants.js";

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: SCENE.UI })
    }
    create() {
        this.button = this.add.rectangle(100, 10, 30, 30, 0xffffff)
    }
}