import { Box } from './Box';
import { Bomb } from './Bomb';
import { Fire } from './Fire';
import { Player } from './Player';
import { Layer } from './Layer';
import { WIDTH, HEIGHT, MAX_BOMB_AGE, MAX_FIRE_AGE, RES, BOX_DENSITY } from './Settings';
import { Utils } from './Utils';
import * as _ from 'lodash';

export class GameWorld {
    boxes: Box[];
    bombs: Bomb[];
    fires: Fire[];
    player: Player;
    map: number[][];
    constructor() {
        this.setup();
    }
    setup() {

        this.boxes = [];
        this.bombs = [];
        this.fires = [];
        this.map = [];

        const randomX = () => _.random(1, WIDTH - 1);
        const randomY = () => _.random(1, HEIGHT - 1);

        this.player = new Player(Utils.makeEven(randomX() - 1), Utils.makeEven(randomY() - 1));

        _.forEach(_.range(WIDTH), (x) => {
            this.map.push([]);
            _.forEach(_.range(HEIGHT), (y) => {
                if (x === 0 || x === WIDTH - 1 || y === 0 || y === HEIGHT - 1) {
                    this.map[x].push(1)
                } else if (Utils.isEven(x) && Utils.isEven(y)) {
                    this.map[x].push(1)
                } else {
                    this.map[x].push(0);
                }
            });
        });

        _.forEach(_.range(BOX_DENSITY), (i) => {
            const x = randomX();
            const y = randomY();
            if (this.map[x][y] === 0 && !this.hasCollision(x, y)) {
                const box = new Box(x, y);
                this.boxes.push(box);
            }
        });

    }
    hasWallCollision(x: number, y: number): boolean {
        if (this.map[x][y] !== 0) return true;
        return false;
    }
    hasBoxCollision(x: number, y: number): boolean {
        return _.reduce(this.boxes, (collision, b) => collision || Utils.collides(b, { x, y }), false);
    }
    hasFireCollision(x: number, y: number): boolean {
        return _.reduce(this.fires, (collision, b) => collision || Utils.collides(b, { x, y }), false);
    }
    hasCollision(x: number, y: number): boolean {

        if (this.hasWallCollision(x, y)) return true;

        const obstacles = [...this.boxes, ...this.bombs];

        return _.reduce(obstacles, (collision, o) => collision || Utils.collides(o, { x, y }), false);

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
                const fires = b.explode(this, 4);
                this.fires = [...fires, ...this.fires];
            }
        });

        _.forEach(this.fires, (f) => f.incrementAge());
    }
    show(sketch: p5Sketch) {


        this.player.show(sketch);
        _.forEach(this.boxes, (b) => b.show(sketch));
        _.forEach(this.bombs, (b) => b.show(sketch));
        _.forEach(this.fires, (f) => f.show(sketch));
        _.forEach(_.range(WIDTH), (x) => {
            _.forEach(_.range(HEIGHT), (y) => {
                sketch.stroke(0);
                if (this.map[x][y]) {
                    sketch.fill(0);
                    sketch.rect(x * RES, y * RES, RES, RES);
                    sketch.fill(40);
                    sketch.rect(x * RES, y * RES - 10, RES, RES);
                } else if (!this.hasCollision(x, y)) {
                    sketch.fill(100);
                    sketch.rect(x * RES, y * RES, RES, RES);
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
            this.bombs.push(bomb);
        }
    }
}