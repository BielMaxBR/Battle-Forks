import { SCENE } from "../utils/constants.js"

import Meme from "../objects/Meme.js"

export default class Battle extends Phaser.Scene {
    constructor() {
        super(SCENE.BATTLE)
    }
    // criar o sistema pra guardar o time e o preço
    // criar o gerador de unidades de acordo com a mão

    // converter pro lado backend da força
    init({ hands }) {
        this.createTeams(hands)
        this.data = this.cache.json.get('memes')
    }
    create() {
        console.log('%c batalha iniciada!', 'color:dodgerblue;')

        this.unitFactory('p1',"1")
    }
    update() {
        this.teams.p1.inGame.children.iterate(this.updateMeme)
        this.teams.p2.inGame.children.iterate(this.updateMeme)
    }

    updateMeme(meme) {
        meme.update()
    }

    unitFactory(team, id) {
        let direction = team == "p1" ? 1 : -1

        let { spriteConfig, combatConfig } = this.data[id]

        let newUnit = new Meme(this, 10, 100, direction, combatConfig, spriteConfig)

        this.teams.p1.inGame.add(newUnit)
    }

    createTeams(hands) {
        this.teams = {
            p1: {
                hand: hands.p1,
                inGame: this.physics.add.group()
            },
            p2: {
                hand: hands.p2,
                inGame: this.physics.add.group()
            }
        }
    }
}