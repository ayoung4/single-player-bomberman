import { TempGameObj } from './TempGameObj';
import { RES } from './Settings';
import { Fire } from './Fire';
import { GameWorld } from './GameWorld';

export class Bomb extends TempGameObj {
    age: number;
    show(sketch) {
        sketch.fill(0);
        sketch.noStroke();
        sketch.ellipseMode(sketch.RADIUS);
        sketch.ellipse((this.x * RES) + (RES / 2), (this.y * RES) + (RES / 2), RES / 2, RES / 2);
    }
    explode(context: GameWorld, length: number) {
        const fires = [];
        fires.push(new Fire(this.x, this.y));
        for (let i = 1; i < length; i++) {
            if (context.boxes.hasCollision(this.x - i, this.y)) {
                fires.push(new Fire(this.x - i, this.y));
                break;
            } else if (context.hasCollision(this.x - i, this.y)) {
                break;
            } else {
                fires.push(new Fire(this.x - i, this.y));
            }
        }
        for (let i = 1; i < length; i++) {
            if (context.boxes.hasCollision(this.x + i, this.y)) {
                fires.push(new Fire(this.x + i, this.y));
                break;
            } else if (context.hasCollision(this.x + i, this.y)) {
                break;
            } else {
                fires.push(new Fire(this.x + i, this.y));
            }
        }
        for (let i = 1; i < length; i++) {
            if (context.boxes.hasCollision(this.x, this.y + i)) {
                fires.push(new Fire(this.x, this.y + i));
                break;
            } else if (context.hasCollision(this.x, this.y + i)) {
                break;
            } else {
                fires.push(new Fire(this.x, this.y + i));
            }
        }
        for (let i = 1; i < length; i++) {
            if (context.boxes.hasCollision(this.x, this.y - i)) {
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
