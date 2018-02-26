import { GameObj } from './GameObj';
import { RES } from './Settings';

export class Player extends GameObj {
    show(sketch) {
        sketch.fill(0, 0, 255);
        sketch.noStroke();
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
    }
}
