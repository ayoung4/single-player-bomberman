import { GameObj } from './GameObj';
import { RES } from './Settings';

export class Box extends GameObj {
    show(sketch) {
        sketch.fill(123);
        sketch.noStroke();
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
    }
}