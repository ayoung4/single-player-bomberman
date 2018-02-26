import { TempGameObj } from './TempGameObj';
import { RES } from './Settings';

export class Bomb extends TempGameObj {
    age: number;
    show(sketch) {
        sketch.fill(0);
        sketch.noStroke();
        sketch.ellipseMode(sketch.RADIUS);
        sketch.ellipse((this.x * RES) + (RES / 2), (this.y * RES) + (RES / 2), RES / 2, RES / 2);
    }
}
