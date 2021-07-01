import Battle from './src/scenes/Battle.js'

const config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 500,
    canvas: document.getElementById('canvas'),
    scene: [Battle]
}
window.onload = () => {
    var game = new Phaser.Game(config)
}