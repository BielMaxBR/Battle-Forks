var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}
var platforms, forks


function create ()
{
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();


    forks = this.physics.add.group();
    // player = this.physics.add.sprite(790, 512, 'dude');

    // player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'walking',
        frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'stopped',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'hit',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    // this.physics.add.collider(player, platforms);
}

var velocity = 100
function update ()
{
    // console.log(player.x)
    if (cursors.left.isDown)
    {
        console.log('aperted')
        forks.create(790, 512, 'dude')
        // forks.children.iterate( function (fork) {
        //     // fork.enableBody(true, fork.x, 0, true, true);
            
        //     fork.setVelocityX(velocity*(-1));
        //     fork.anims.play('walking', true);
        //     if (fork.x < 0) {
        //         fork.x = 800
        //     }

    }

    forks.children.iterate( function (fork) {
        fork.setVelocityX(velocity*(-1));
        fork.anims.play('walking', true);
        if (fork.x < 0) {
            fork.x = 800
        }
    })
    
}
