export module Utils {
    
    export interface IPosition {
        x: number;
        y: number;
    }

    export function collides(p1: IPosition, p2: IPosition): boolean {
        return p1.x === p2.x && p1.y === p2.y;
    }

}