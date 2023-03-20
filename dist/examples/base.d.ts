import { Keyboard, Mouse, Gamepad, Touch } from '../source/main';
export declare abstract class ExampleBase {
    canvas: HTMLCanvasElement;
    fps: HTMLElement;
    keyboard: Keyboard;
    mouse: Mouse;
    gamepad: Gamepad;
    touch: Touch;
    deviceRefreshRate: boolean;
    refreshRate: number;
    t: number;
    running: boolean;
    init(): void;
    start(): void;
    loop(): void;
    dispose(): void;
    update(delta: number): void;
    render(): void;
}
