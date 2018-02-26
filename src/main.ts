import * as _ from 'lodash';
import * as p5 from 'p5';

const RES = 15;
const WIDTH = 50;
const HEIGHT = 50;

interface IPosition {
    x: number;
    y: number;
}

abstract class GameObj implements IPosition {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    show(sketch: p5Sketch) {
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
    }
}

abstract class TempGameObj extends GameObj {
    age: number;
    constructor(x: number, y: number) {
        super(x, y);
        this.age = 0;
    }
    incrementAge() {
        this.age++;
    }
}

class Player extends GameObj {
    show(sketch) {
        sketch.fill(0, 0, 255);
        sketch.noStroke();
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
    }
}

const MAX_BOMB_AGE = 100;
const MAX_FIRE_AGE = 100;
class Bomb extends TempGameObj {
    age: number;
    show(sketch) {
        sketch.fill(0);
        sketch.noStroke();
        sketch.ellipseMode(sketch.RADIUS);
        sketch.ellipse((this.x * RES) + (RES / 2), (this.y * RES) + (RES / 2), RES / 2, RES / 2);
    }
}

class Fire extends TempGameObj {
    age: number;
    show(sketch) {
        sketch.fill(255, 0, 0, 100);
        sketch.noStroke();
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
    }
}

class Box extends GameObj {
    show(sketch) {
        sketch.fill(123);
        sketch.noStroke();
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
    }
}

interface IGameWorld {
    boxes: Box[];
    bombs: Bomb[];
    fires: Fire[];
    player: Player;
}

const gameWorld: IGameWorld = {
    boxes: [],
    bombs: [],
    fires: [],
    player: undefined,
}

function collides(p1: IPosition, p2: IPosition): boolean {
    return p1.x === p2.x && p1.y === p2.y;
}

const sketch = new p5(function (sketch: p5Sketch) {

    sketch.setup = function () {
        gameWorld.player = new Player(_.random(1, WIDTH - 1), _.random(1, HEIGHT - 1));
        _.forEach(_.range(_.random(30)), (i) => {
            const box = new Box(_.random(1, WIDTH - 1), _.random(1, HEIGHT - 1));
            gameWorld.boxes.push(box);
        });

        console.log(gameWorld);
        
        sketch.createCanvas(WIDTH * RES, HEIGHT * RES);
    }

    sketch.draw = function () {

        sketch.background(220);

        gameWorld.player.show(sketch);

        gameWorld.boxes = _.filter(gameWorld.boxes, (b) => {
            return !_.reduce(gameWorld.fires, (collision, f) => collision || collides(f, b), false)
        });

        _.forEach(gameWorld.boxes, (b) => b.show(sketch));

        gameWorld.bombs = _.filter(gameWorld.bombs, (b) => b.age < MAX_BOMB_AGE);
        gameWorld.fires = _.filter(gameWorld.fires, (f) => f.age < MAX_FIRE_AGE);

        _.forEach(gameWorld.bombs, (b) => {
            b.show(sketch);
            b.incrementAge();
            if (b.age === MAX_BOMB_AGE) {
                console.log(_.range(-4, 5));
                _.forEach(_.range(-4, 5), (i) => {
                    gameWorld.fires.push(new Fire(b.x + i, b.y));
                    gameWorld.fires.push(new Fire(b.x, b.y + i));
                });
            }
        });

        _.forEach(gameWorld.fires, (f) => {
            f.show(sketch);
            f.incrementAge();
        });

    }

    sketch.keyPressed = function () {
        if (sketch.keyCode === sketch.LEFT_ARROW) {
            gameWorld.player.x--;
        } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
            gameWorld.player.x++;
        } else if (sketch.keyCode === sketch.UP_ARROW) {
            gameWorld.player.y--;
        } else if (sketch.keyCode === sketch.DOWN_ARROW) {
            gameWorld.player.y++;
        } else if (sketch.keyCode === 32) {
            const bomb = new Bomb(gameWorld.player.x, gameWorld.player.y);
            gameWorld.bombs.push(bomb);
        }
    }

});