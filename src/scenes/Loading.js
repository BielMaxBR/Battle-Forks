export default class Loading extends Phaser.Scene {
    constructor() {
        super("Loading")
    }

    preload() {
        let width = this.game.config.width
        let height = this.game.config.height

        let progress = this.add.graphics()

        this.load.on('progress', (value) => {

            progress.clear();
            progress.fillStyle(0xffffff, 1)
            progress.fillRect(0, height / 2, width * value, 60)

            console.log(`%c Loading: ${Math.floor(value * 100)}%`, 'color:#e8e000;')
        });

        this.load.on('complete', () => {

            progress.destroy();
            console.log('%c Loading Complete', 'color:#55ff55;')
            this.scene.start("Game")
        });

        this.load.setPath('../src/assets/');

        this.load.spritesheet('test', 'testAnim.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 17,
        })
    }
}