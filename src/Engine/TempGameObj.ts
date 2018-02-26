import { GameObj } from './GameObj';

export abstract class TempGameObj extends GameObj {
    age: number;
    constructor(x: number, y: number) {
        super(x, y);
        this.age = 0;
    }
    incrementAge() {
        this.age++;
    }
}


