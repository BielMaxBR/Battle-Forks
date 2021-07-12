import UnitButton from "./UnitButton.js"

export default class Hotbar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, { buttonsConfig, rows, columns, width, height = 0 }) {
        super(scene, x, y)
        scene.add.existing(this)

        buttonsConfig.forEach(({ id, team, icon, price, cooldown }) => {
            let newbtn = new UnitButton(scene, 0, 0, {
                texture: icon,
                id,
                team,
                price,
                cooldown,
                width: 64,
                height: 40
            })
            
            newbtn.on('buy', btn => {
                console.log('%c comprou','color:lightyellow;')
                scene.battleScene.unitFactory(btn.team, btn.id)
            })

            this.add(newbtn)
        })
    }
}