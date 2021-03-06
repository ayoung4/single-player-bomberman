import { GameObj } from './GameObj';
import { RES } from './Settings';

export class Box extends GameObj {
    show(sketch) {
        sketch.noStroke();
        sketch.fill(156, 150, 140);
        sketch.rect(this.x * RES, this.y * RES, RES, RES);
        sketch.strokeWeight(1);
        sketch.stroke(136, 130, 120);
        sketch.fill(206, 200, 190);
        sketch.rect(this.x * RES, (this.y * RES) - 10, RES, RES);
        sketch.noStroke();
    }
}