import { SCENE } from "../utils/constants.js"

let battleConfig = { hands: { p1: [1, 2], p2: [1] } }

export default class Loading extends Phaser.Scene {
    constructor() {
        super({ key: SCENE.LOADING })
    }

    preload() {

        this.load.setPath('../src/assets/')
        this.load.json('memes', '/jsonData/dataTest.json')


        // this.load.spritesheet('test', '/spritesheets/testAnim.png', {
        //     frameWidth: 64,
        //     frameHeight: 64,
        //     startFrame: 0,
        //     endFrame: 17,
        // })
    }

    create() {
        let width = this.game.config.width
        let height = this.game.config.height

        let unitList = this.getTotalUnits(battleConfig.hands)

        this.data = this.cache.json.get('memes')

        this.progress = this.add.graphics()

        this.load.on('progress', (value) => {

            this.progress.clear()
            this.progress.fillStyle(0xffffff, 1)
            this.progress.fillRect(0, height / 2, width * value, 60)

            console.log(`%c Loading: ${Math.floor(value * 100)}%`, 'color:#e8e000;')
        })

        this.load.on('complete', () => {

            this.progress.destroy()

            console.log('%c Loading Complete', 'color:#55ff55;')

            battleConfig.unitsData = this.getUnitsData(unitList)

            this.scene.start(SCENE.BATTLE, battleConfig)
        })

        this.loadMemeAssets(unitList)

    }

    getUnitsData(list) {
        let unitsData = {}

        for (const id of list) {
            unitsData[id] = this.data[id]
        }


        return unitsData
    }

    getTotalUnits(hands) {
        let total = []
        for (const id of Object.values(hands.p1)) {
            total.push(id)
        }
        for (const id of Object.values(hands.p2)) {
            if (total.indexOf(id) == -1) {
                total.push(id)
            }
        }
        return total
    }

    loadMemeAssets(list) {

        for (const id of list) {
            const meme = this.data[id] || {}
            if (meme === {}) {
                console.error(`id:${id} not be found on game data`)
                return
            }
            const { name, path, config } = meme.assets.spritesheet

            this.load.spritesheet(name, path, config)
        }
        this.load.start()
    }
}