import { Box } from './Box';
import { Bomb } from './Bomb';
import { Fire } from './Fire';
import { Player } from './Player';
import { WIDTH, HEIGHT, MAX_BOMB_AGE, MAX_FIRE_AGE } from './Settings';
import { Utils } from './Utils';
import * as _ from 'lodash';

export class GameWorld {
    boxes: Box[];
    bombs: Bomb[];
    fires: Fire[];
    player: Player;
    constructor() {
        this.setup();
    }
    setup() {
        this.boxes = [];
        this.bombs = [];
        this.fires = [];
        this.player = new Player(_.random(1, WIDTH - 1), _.random(1, HEIGHT - 1));
        _.forEach(_.range(_.random(30)), (i) => {
            const box = new Box(_.random(1, WIDTH - 1), _.random(1, HEIGHT - 1));
            this.boxes.push(box);
        });
    }
    step() {

        this.boxes = _.filter(this.boxes, (b) => {
            return !_.reduce(this.fires, (collision, f) => collision || Utils.collides(f, b), false)
        });

        this.bombs = _.filter(this.bombs, (b) => b.age < MAX_BOMB_AGE);
        this.fires = _.filter(this.fires, (f) => f.age < MAX_FIRE_AGE);

        _.forEach(this.bombs, (b) => {
            b.incrementAge();
            if (b.age === MAX_BOMB_AGE) {
                _.forEach(_.range(-4, 5), (i) => {
                    this.fires.push(new Fire(b.x + i, b.y));
                    this.fires.push(new Fire(b.x, b.y + i));
                });
            }
        });

        _.forEach(this.fires, (f) => f.incrementAge());
    }
    show(sketch: p5Sketch) {
        this.player.show(sketch);
        _.forEach(this.boxes, (b) => b.show(sketch));
        _.forEach(this.bombs, (b) => b.show(sketch));
        _.forEach(this.fires, (f) => f.show(sketch));

    }
    processInput(keyCode: number) {
        if (keyCode === 37) {
            // left
            this.player.x--;
        } else if (keyCode === 39) {
            // right
            this.player.x++;
        } else if (keyCode === 38) {
            // up
            this.player.y--;
        } else if (keyCode === 40) {
            // down
            this.player.y++;
        } else if (keyCode === 32) {
            // space
            const bomb = new Bomb(this.player.x, this.player.y);
            this.bombs.push(bomb);
        }
    }
}