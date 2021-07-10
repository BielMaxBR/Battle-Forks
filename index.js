import Battle from './src/scenes/Battle.js'
import Loading from './src/scenes/Loading.js'
import UI from './src/scenes/Ui.js';

const config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,
    },
    canvas: document.getElementById('canvas'),
    scene: [Loading, Battle, UI],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    fps: {
        min: 15,
        target: 30
    },
    render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true,
    },
    images: {
        missing: '/src/assets/emptyShape.png'
    },
    banner: {
        text: '#ffffff',
        background: [
            '#000000'
        ]
    }
}
document.addEventListener("DOMContentLoaded", () =>
    new Phaser.Game(config)
);