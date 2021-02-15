var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: 'phaser-example',
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
const rng = new Phaser.Math.RandomDataGenerator();
let Camera = new Phaser.Cameras.Scene2D.Camera(0,0,800,600);
let cameraPos = new Phaser.Math.Vector2(0,0)

var controls;

function preload ()
{
    this.load.image('tilemap', 'assets/micro-tilemap.png')
}

function create ()
{
    
    Camera.setBounds(-250, -100, 800, 600);
    Camera.setZoom(600/(16*8));
    Camera.centerOn(0, 0)    

    this.cameras.addExisting(Camera)
    this.cameras.main = this.cameras[1]
    let level = createArray(16,16)
    var map = this.make.tilemap({ data: level, tileWidth: 8, tileHeight: 8 });
    var tiles = map.addTilesetImage('tilemap');
    var layer = map.createLayer(0, tiles, 0, 0);

    // this.input.keyboard.on('keydown', function (event) {

    //     switch(event.keyCode) {
    //         case 87:
    //             cameraPos.y-=1
    //             console.log(cameraPos)
    //             Camera.setScroll(cameraPos.x, cameraPos.y)
    //             break;
    //         case 83:
    //             cameraPos.y+=1
    //             console.log(cameraPos)
    //             Camera.setScroll(cameraPos.x, cameraPos.y)
    //             break;
    //         case 65:
    //             cameraPos.x-=1
    //             console.log(cameraPos)
    //             Camera.setScroll(cameraPos.x, cameraPos.y)
    //             break;
    //         case 68:
    //             cameraPos.x+=1
    //             console.log(cameraPos)
    //             Camera.setScroll(cameraPos.x, cameraPos.y)
    //             break;
    //         }
 

    // });
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: Camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.5,
        drag: 0.5,
        maxSpeed: 0.9
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}

function update (time, delta)
{
    controls.update(delta);
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