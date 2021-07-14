import UnitButton from "./UnitButton.js"

export default class Hotbar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, { buttonsConfig, rows = 1, columns = 5, width, height = 0, margin }) {
        super(scene, x, y)
        scene.add.existing(this)

        // 500/5-(2*5+1)
        const buttonWidth = (width - (margin * (columns + 1))) / (columns)

        let buttonIndex = 0
        for (let r = 0; r < rows; r++) {
            const buttonY = margin + (height * (r + 1)) - (height / 2)
            for (let c = 0; c < columns; c++) {
                const buttonX = buttonWidth * c + margin * c
                if (!buttonsConfig[buttonIndex]) continue
                const { id, team, icon, price, cooldown } = buttonsConfig[buttonIndex]
                console.log(buttonWidth, buttonX, buttonY, buttonIndex)
                let newbtn = new UnitButton(scene, buttonX, buttonY, {
                    texture: icon,
                    id,
                    team,
                    price,
                    cooldown,
                    width: 64,
                    height: 40
                })

                newbtn.on('buy', btn => {
                    console.log('%c comprou', 'color:lightyellow;')
                    scene.battleScene.unitFactory(btn.team, btn.id)
                })

                this.add(newbtn)
            }
        }

        /*buttonsConfig.forEach(({ id, team, icon, price, cooldown }) => {
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
        })*/
    }
}