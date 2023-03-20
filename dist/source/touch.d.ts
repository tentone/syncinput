import { Vector2 } from './vector2';
import { EventManager } from './event-manager';
import { Button } from './button';
import { InputHandler } from './input-handler';
export declare class TouchPoint extends Button {
    position: Vector2;
    delta: Vector2;
    first: Vector2;
    radius: Vector2;
    force: number;
    rotation: number;
}
export declare class Touch extends InputHandler {
    maxPoints: number;
    points: TouchPoint[];
    private temp;
    domElement: HTMLElement | Window;
    events: EventManager;
    pinch: number;
    constructor(maxPoints?: number, element?: HTMLElement);
    initialize(): void;
    updatePoint(id: number, action: number, pressure: number, rotation: number, position: Vector2, radius: Vector2): void;
    update(): void;
    pan(fingers: number): {
        position: Vector2;
        delta: Vector2;
    };
    pinchZoom(): number;
    touchPressed(idx: number): boolean;
    touchJustPressed(idx: number): boolean;
    touchJustReleased(idx: number): boolean;
    dispose(): void;
}
