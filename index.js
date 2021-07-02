import Battle from './src/scenes/Battle.js'

const config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 500,
    canvas: document.getElementById('canvas'),
    scene: [Battle],
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    }
}
window.onload = () => {
    var game = new Phaser.Game(config)
}