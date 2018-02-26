import { RES } from './Settings';
import { Utils } from './Utils';

export abstract class GameObj implements Utils.IPosition {
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

