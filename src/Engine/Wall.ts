import { GameObj } from './GameObj';
import { RES } from './Settings';

export class Wall extends GameObj {
    show(sketch) {
        sketch.noStroke();
        sketch.fill(0);
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
        sketch.fill(40);
        sketch.rect(this.x * RES, (this.y * RES) - 15, RES, RES);
    }
}