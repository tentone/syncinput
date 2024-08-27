
/**
 * Gamepad mapping type.
 */
export enum GamepadMappingType {
    /**
     * Non standard gamepad input.
     */
    none = '',

    /**
     * Standard gamepad input.
     * 
     * https://www.w3.org/TR/gamepad/#dfn-standard-gamepad
     */
    standard = 'standard',

    /**
     * XR gamepad input, for usage with WebXR applications.
     * 
     * https://www.w3.org/TR/webxr-gamepads-module-1/#xr-standard-gamepad-mapping
     */
    xrStandard = 'xr-standard'
}
