import { WIDTH, HEIGHT } from './Settings';
import { Utils } from './Utils';
import * as _ from 'lodash';

export class Layer<T> {
    posMatrix: boolean[][];
    width: number;
    height: number;
    contents: { [key: string]: T };
    constructor() {
        this.width = WIDTH;
        this.width = HEIGHT;
        this.posMatrix = [];
        this.contents = {};
        _.forEach(_.range(this.width), (x) => {
            this.posMatrix[x] = [];
            _.forEach(_.range(this.height), (y) => {
                this.posMatrix[x][y] = false;
            });
        });
    }
    toXYString(x: number, y: number): string {
        return `${x},${y}`;
    }
    fromXYString(str: string): Utils.IPosition {
        const [x, y] = _.map(str.split(','), (str) => Number(str));
        return { x, y };
    }
    hasCollision(x: number, y: number): boolean {
        return this.posMatrix[x][y];
    }
    find(x: number, y: number): T {
        return this.contents[this.toXYString(x, y)];
    }
    insert(x: number, y: number, item: T): T {
        this.posMatrix[x][y] = true;
        this.contents[this.toXYString(x, y)] = item;
        return item;
    }
    remove(x: number, y: number): void {
        this.posMatrix[x][y] = false;
        delete this.contents[this.toXYString(x, y)];
    }
    all(): T[] {
        const keys = _.keys(this.contents);
        return _.map(keys, (k) => this.contents[k]);
    }
}