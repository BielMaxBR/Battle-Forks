import { SCENE } from "../utils/constants.js"

import Meme from "../prefabs/Meme.js"
import Base from "../prefabs/Base.js"

export default class Battle extends Phaser.Scene {
    constructor() {
        super(SCENE.BATTLE)
    }
    // criar o sistema pra guardar o time e o preço
    // criar o gerador de unidades de acordo com a mão

    // converter pro lado backend da força
    init({ hands, unitsData }) {
        this.createTeams(hands)
        this.unitsData = unitsData
   
    }
    create() {
        console.log('%c batalha iniciada!', 'color:dodgerblue;')

        this.unitFactory('p1', "1")
        this.unitFactory('p2', "1")
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

        let { spriteConfig, combatConfig } = this.unitsData[id]
        let { x, y } = this.teams[team].base
        let newUnit = new Meme(this, x, y, direction, combatConfig, spriteConfig)

        this.teams.p1.inGame.add(newUnit)
    }

    createTeams(hands) {
        this.teams = {
            p1: {
                base: new Base(this, 10, 100),
                hand: hands.p1,
                inGame: this.physics.add.group()
            },
            p2: {
                base: new Base(this, 600, 100),
                hand: hands.p2,
                inGame: this.physics.add.group()
            }
        }
    }
}