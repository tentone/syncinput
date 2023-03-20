export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): void;
    copy(vec: Vector2): void;
    add(vec: Vector2): void;
    divScalar(scalar: number): void;
    dist(vec: Vector2): number;
}
