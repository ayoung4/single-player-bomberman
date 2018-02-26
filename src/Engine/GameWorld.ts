import { Box } from './Box';
import { Bomb } from './Bomb';
import { Fire } from './Fire';
import { Player } from './Player';
import { Wall } from './Wall';
import { Layer } from './Layer';
import { WIDTH, HEIGHT, MAX_BOMB_AGE, MAX_FIRE_AGE, RES, BOX_DENSITY } from './Settings';
import { Utils } from './Utils';
import * as _ from 'lodash';

export class GameWorld {
    boxes: Layer<Box>;
    bombs: Layer<Bomb>;
    fires: Layer<Fire>;
    player: Player;
    walls: Layer<Wall>;
    constructor() {
        this.setup();
    }
    setup() {

        this.boxes = new Layer();
        this.bombs = new Layer();
        this.fires = new Layer();
        this.walls = new Layer();

        const randomX = () => _.random(1, WIDTH - 1);
        const randomY = () => _.random(1, HEIGHT - 1);

        this.player = new Player(Utils.makeEven(randomX() - 1), Utils.makeEven(randomY() - 1));

        _.forEach(_.range(WIDTH), (x) => {
            _.forEach(_.range(HEIGHT), (y) => {
                if (x === 0
                    || x === WIDTH - 1
                    || y === 0
                    || y === HEIGHT - 1
                    || (Utils.isEven(x) && Utils.isEven(y))) {
                    this.walls.insert(x, y, new Wall(x, y));
                }
            });
        });

        _.forEach(_.range(BOX_DENSITY), (i) => {
            const x = randomX();
            const y = randomY();
            if (!this.walls.hasCollision(x, y)) {
                const box = new Box(x, y);
                this.boxes.insert(x, y, box);
            }
        });

    }
    hasCollision(x: number, y: number): boolean {

        if (this.walls.hasCollision(x, y)) return true;
        if (this.bombs.hasCollision(x, y)) return true;
        if (this.boxes.hasCollision(x, y)) return true;

    }
    step() {


        const removedBoxes = _.filter(this.boxes.all, (b) => {
            return _.reduce(this.fires.all, (collision, f) => collision || Utils.collides(f, b), false)
        });

        // this.bombs = _.filter(this.bombs, (b) => b.age < MAX_BOMB_AGE);
        // this.fires = _.filter(this.fires, (f) => f.age < MAX_FIRE_AGE);

        // _.forEach(this.bombs, (b) => {
        //     b.incrementAge();
        //     if (b.age === MAX_BOMB_AGE) {
        //         const fires = b.explode(this, 4);
        //         this.fires = [...fires, ...this.fires];
        //     }
        // });
        // _.forEach(this.fires, (f) => f.incrementAge());
    }
    show(sketch: p5Sketch) {

        _.forEach(_.range(WIDTH), (x) => {
            _.forEach(_.range(HEIGHT), (y) => {
                if (this.player.x === x && this.player.y === y) {
                    this.player.show(sketch);
                } else {
                    let item = this.walls.find(x, y)
                        || this.fires.find(x, y)
                        || this.boxes.find(x, y)
                        || this.bombs.find(x, y);
                    if (item) {
                        item.show(sketch);
                    } else {
                        sketch.fill(100);
                        sketch.rect(x * RES, y * RES, RES, RES);
                    }
                }
            });
        });

    }
    processInput(keyCode: number) {
        if (keyCode === 37) {
            // left
            if (!this.hasCollision(this.player.x - 1, this.player.y)) {
                this.player.x--;
            }
        } else if (keyCode === 39) {
            // right
            if (!this.hasCollision(this.player.x + 1, this.player.y)) {
                this.player.x++;
            }
        } else if (keyCode === 38) {
            // up
            if (!this.hasCollision(this.player.x, this.player.y - 1)) {
                this.player.y--;
            }
        } else if (keyCode === 40) {
            // down
            if (!this.hasCollision(this.player.x, this.player.y + 1)) {
                this.player.y++;
            }
        } else if (keyCode === 32) {
            // space
            const bomb = new Bomb(this.player.x, this.player.y);
            this.bombs.insert(this.player.x, this.player.y, bomb);
        }
    }
}