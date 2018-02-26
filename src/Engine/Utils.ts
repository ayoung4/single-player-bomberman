export module Utils {

    export interface IPosition {
        x: number;
        y: number;
    }

    export function collides(p1: IPosition, p2: IPosition): boolean {
        return p1.x === p2.x && p1.y === p2.y;
    }

    export function isEven(n: number): boolean {
        return !(n & 1);
    }

    export function isOdd(n: number): boolean {
        return !!(n & 1);
    }

    export function makeEven(n: number): number {
        return !(n & 1) ? n + 1 : n;
    }

    export function makeOdd(n: number): number {
        return !!(n & 1) ? n + 1 : n;
    }

}