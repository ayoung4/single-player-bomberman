import { TempGameObj } from './TempGameObj';
import { RES } from './Settings';
import { Fire } from './Fire';
import { GameWorld } from './GameWorld';

export class Bomb extends TempGameObj {
    size: number;
    constructor(x: number, y: number, size?: number) {
        super(x, y);
        this.size = size || 4;
    }
    show(sketch) {
        sketch.noStroke();
        sketch.ellipseMode(sketch.RADIUS);
        sketch.ellipse((this.x * RES) + (RES / 2), (this.y * RES) + (RES * (4 / 5)), RES / 2.75, RES / 2.75);
        sketch.fill(0);
        sketch.ellipse((this.x * RES) + (RES / 2), (this.y * RES) + (RES * (3 / 5)), RES / 2.5, RES / 2.5);
        sketch.fill(0);
        sketch.ellipse((this.x * RES) + (RES / 2), (this.y * RES) + (RES * (2 / 5)), RES / 2.75, RES / 2.75);
        sketch.fill(50);
    }
    explode(context: GameWorld) {
        const fires = [];
        fires.push(new Fire(this.x, this.y));
        for (let i = 1; i < this.size; i++) {
            if (context.boxes.hasCollision(this.x - i, this.y)
                || context.bombs.hasCollision(this.x - i, this.y)) {
                fires.push(new Fire(this.x - i, this.y));
                break;
            } else if (context.walls.hasCollision(this.x - i, this.y)) {
                break;
            } else {
                fires.push(new Fire(this.x - i, this.y));
            }
        }
        for (let i = 1; i < this.size; i++) {
            if (context.boxes.hasCollision(this.x - i, this.y)
                || context.bombs.hasCollision(this.x - i, this.y)) {
                fires.push(new Fire(this.x + i, this.y));
                break;
            } else if (context.hasCollision(this.x + i, this.y)) {
                break;
            } else {
                fires.push(new Fire(this.x + i, this.y));
            }
        }
        for (let i = 1; i < this.size; i++) {
            if (context.boxes.hasCollision(this.x - i, this.y)
                || context.bombs.hasCollision(this.x - i, this.y)) {
                fires.push(new Fire(this.x, this.y + i));
                break;
            } else if (context.hasCollision(this.x, this.y + i)) {
                break;
            } else {
                fires.push(new Fire(this.x, this.y + i));
            }
        }
        for (let i = 1; i < this.size; i++) {
            if (context.boxes.hasCollision(this.x - i, this.y)
                || context.bombs.hasCollision(this.x - i, this.y)) {
                fires.push(new Fire(this.x, this.y - i));
                break;
            } else if (context.hasCollision(this.x, this.y - i)) {
                break;
            } else {
                fires.push(new Fire(this.x, this.y - i));
            }
        }
        return fires;
    }
}
