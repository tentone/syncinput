export declare enum ButtonAction {
    DOWN = -1,
    UP = 1,
    RESET = 0
}
export declare class Button {
    pressed: boolean;
    justPressed: boolean;
    justReleased: boolean;
    update(action: ButtonAction): void;
    set(justPressed: boolean, pressed: boolean, justReleased: boolean): void;
    reset(): void;
}
