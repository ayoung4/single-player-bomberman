import { TempGameObj } from './TempGameObj';
import { RES } from './Settings';

export class Fire extends TempGameObj {
    age: number;
    show(sketch) {
        sketch.fill(255, 0, 0, 100);
        sketch.noStroke();
        sketch.rect(this.x * RES, this.y * RES, RES, RES, 0.9);
    }
}