import Battle from './src/scenes/Battle.js'
import Loading from './src/scenes/Loading.js'

const config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    canvas: document.getElementById('canvas'),
    scene: [Loading, Battle],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}
window.onload = () => {
    var game = new Phaser.Game(config)
}