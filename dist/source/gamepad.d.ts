import { Button } from './button';
import { InputHandler } from './input-handler';
export declare class Gamepad extends InputHandler {
    vendor: number;
    product: number;
    connected: boolean;
    index: number;
    buttons: Button[];
    gamepad: any;
    constructor();
    initialize(): void;
    setGamepad(gamepad: any): any;
    dispose(): void;
    setProductVendor(gamepad: any): void;
    update(): void;
    getAnalogueButton(button: number): number;
    getAxis(axis: number): number;
    buttonExists(button: number): boolean;
    buttonPressed(button: number): boolean;
    buttonJustPressed(button: number): boolean;
    buttonJustReleased(button: number): boolean;
}
