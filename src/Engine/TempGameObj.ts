import { GameObj } from './GameObj';

export abstract class TempGameObj extends GameObj {
    protected age: number;
    protected maxAge: number;
    deletable: boolean;
    constructor(x: number, y: number, maxAge?: number) {
        super(x, y);
        this.age = 0;
        this.maxAge = maxAge || 30;
        this.deletable = false;
    }
    incrementAge() {
        if (!this.deletable) {
            if (this.age < this.maxAge) {
                this.age++;
            } else {
                this.deletable = true;
            }
        }
    }
}
