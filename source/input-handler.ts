/**
 * Input handler is used to capture input data from a specific type of devide.
 * 
 * Is used as base for mouse, keyboard, touch and gamepad input.
 */
export abstract class InputHandler {
    /**
     * Initialize the input handler.
     * 
     * Must be called before accessing the data from the handler.
     */
    public initialize(): void {}

    /**
     * Dispose the input handler.
     * 
     * Destroy all events used to capture input.
     */
    public dispose(): void {}
}