import { GameObj } from './GameObj';
import { RES } from './Settings';

export class Player extends GameObj {
    show(sketch) {
        sketch.noStroke();
        sketch.fill(0, 0, 215);
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
        sketch.fill(0, 0, 255);
        sketch.rect(this.x * RES, (this.y * RES) - 10, RES, RES);
    }
}
