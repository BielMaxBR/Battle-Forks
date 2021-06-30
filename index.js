import Battle from './src/Scenes/Battle.js'

const config = {
    type: Phaser.WEBGL,
    width: 700,
    height: 500,
    canvas: document.getElementById('canvas'),
    scene: [Battle]
}
window.onload = () => {
    let game = new Phaser.Game(config)
}