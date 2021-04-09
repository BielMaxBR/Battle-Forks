var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: 'brawlhalla',
    title:"projeta a tudo e todos",
    canvasStyle:"margin: auto; position: absolute; top: 0px; bottom: 0px; Left: 0px; right: 0px; border: 10px solid grey;",
    pixelArt: true,
    notAudio: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

const moves = {
    KeyD() {
        return new Phaser.Math.Vector2(1,0)
    },
    KeyA() {
        return new Phaser.Math.Vector2(-1,0)
    },
    KeyW() {
        return new Phaser.Math.Vector2(0,-1)
    },
    KeyS() {
        return new Phaser.Math.Vector2(0,1)
    },
}

function preload() {

}

function create() {
    this.input.keyboard.on('keydown', (e) =>{
        if (moves[e.code]) {
            console.log(moves[e.code]())
        }
    })

    this.input.keyboard.createCombo([ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13 ], { resetOnMatch: true });

    this.input.keyboard.on('keycombomatch', function (event) {
        console.log('Konami Code entered!');
    });
}

function update() {
    if (game.sound.context.state === 'suspended') {game.sound.context.resume();}
}