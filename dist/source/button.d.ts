export declare class ButtonAction {
    static DOWN: number;
    static UP: number;
    static RESET: number;
}
export declare class Button {
    pressed: boolean;
    justPressed: boolean;
    justReleased: boolean;
    update(action: number): void;
    set(justPressed: boolean, pressed: boolean, justReleased: boolean): void;
    reset(): void;
}
