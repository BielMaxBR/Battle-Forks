var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    canvasStyle:"margin: auto; position: absolute; top: 0px; bottom: 0px; Left: 0px; right: 0px; border: 10px solid grey;",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{

}
var platforms, forks


function create ()
{
}

function update ()
{

}

