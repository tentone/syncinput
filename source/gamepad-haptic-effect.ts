export enum GamepadHapticEffectType {
  /**
   * Haptic configuration with an eccentric rotating mass (ERM) vibration motor in each handle of a standard gamepad.
   * 
   * In this configuration, either motor is capable of vibrating the whole gamepad.
   * 
   * https://www.w3.org/TR/gamepad/#dom-gamepadhapticeffecttype-dual-rumble
   */
  dualRumble = 'dual-rumble',

  /**
   * Haptics configuration with a vibration motor in each of the bottom front buttons.
   * 
   * https://www.w3.org/TR/gamepad/#dom-gamepadhapticeffecttype-trigger-rumble
   */
  triggerRumble = 'trigger-rumble'
}
