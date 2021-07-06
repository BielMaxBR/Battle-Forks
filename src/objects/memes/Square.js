import Meme from "../Meme.js";

export default class Square extends Meme {
    constructor(scene, x, y, team) {
        super(
            scene,
            x, y,
            team,
            {
                attackFrames: [8],
                damage: 5,
                life: 12,
                stunPoints: [5],
                cooldown: 1.5,
                type: 'single',
                velocity: 80
            },
            {
                texture: 'test',
                frames: 4,
                animsConfig: {
                    frameRate: 12,
                    anims: [
                        {
                            key: 'walk',
                            start: 0,
                            end: 3
                        },
                        {
                            key: 'idle',
                            start: 10,
                            end: 17
                        },
                        {
                            key: 'attack',
                            start: 4,
                            end: 9
                        },
                        {
                            key: 'stun',
                            start: 0,
                            end: 0
                        }

                    ]
                }
            }
        )
    }
}