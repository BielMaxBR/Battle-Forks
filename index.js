var config = {
    type: Phaser.AUTO,
    width: 16*8,
    height: 16*8,
    zoom:4,
    parent: 'phaser-example',
    title:"projeta a tudo e todos",
    canvasStyle:"margin: auto; position: absolute; top: 0px; bottom: 0px; Left: 0px; right: 0px; border: 10px solid grey;",
    pixelArt: true,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);
const rng = new Phaser.Math.RandomDataGenerator();
function preload ()
{
    this.load.image('tilemap', 'assets/micro-tilemap.png')
}

function create ()
{
    let level = createArray(16,16)

    var map = this.make.tilemap({ data: level, tileWidth: 8, tileHeight: 8 });
    var tiles = map.addTilesetImage('tilemap');
    var layer = map.createLayer(0, tiles, 0, 0);
}

function update ()
{

}

function createArray(x , y) {
    let array = []
    for (let i = 0; i < y; i++) {
        array[i] = []
        for (let j = 0; j < x; j++) {
            array[i][j] = `${rng.between(0,3)}`
        }
    } 
    return array
}