import { EventManager } from './event-manager';
import { InputHandler } from './input-handler';
export declare class Keyboard extends InputHandler {
    keys: any[];
    actions: any[];
    domElement: HTMLElement | Window;
    events: EventManager;
    constructor(element?: HTMLElement);
    initialize(): void;
    update(): void;
    reset(): void;
    keyPressed(key: number): boolean;
    keyJustPressed(key: number): boolean;
    keyJustReleased(key: number): boolean;
    dispose(): void;
}
