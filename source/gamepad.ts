import {Button, ButtonAction} from './button';
import {InputHandler} from './input-handler';
import {GamepadHapticEffectType} from './gamepad-haptic-effect';
import {EventManager} from './event-manager';

export type GamepadEffectParameters = {
	/**
	 * Duration of the effect in milliseconds.
	 */
	duration?: number,

	/**
	 * duration of the delay after playEffect() is called until vibration is started.
	 */
	startDelay?: number,

	/**
	 * The vibration magnitude for the low frequency rumble motor.
	 */
	strongMagnitude?: number,

	/**
	 * The vibration magnitude for the high frequency rumble motor.
	 */
	weakMagnitude?: number,

	/**
	 * Intensity of the effect for the left trigger.
	 */
	leftTrigger?: number,

	/**
	 * Intensity of the effect for the right trigger.
	 */
	rightTrigger?: number
};

/**
 * Gamepad provides basic support for gamepads.
 *
 * Some gamepads require a button press to being detected.
 * 
 * Gamepad implementation across browsers is still fragmented, every browser implements it a bit differently, so test it on every target before deploying an application using it.
 *
 * For more information about the Gamepad API state take look at the W3C Gamepad API page https://www.w3.org/TR/gamepad/.
 */
export class Gamepad extends InputHandler
{
	/**
	 * Identifier of the gamepad device.
	 */
	public id: string = null;

	/**
	 * Mapping of the gamepad.
	 * 
	 * https://www.w3.org/TR/gamepad/#dom-gamepad-mapping
	 */
	public mapping: GamepadMappingType = null;

	/**
	 * Indicates if the gamepad is connected to the system.
	 */
	public connected: boolean = false;
	
	/**
	 * Index of the gamepad instance.
	 */
	public index: number = -1;

	/**
	 * Deadzone for the gamepad analog sticks.
	 * 
	 * Values (in absolute) below this threshold are considered 0.
	 */
	public deadzone: number = 0.01;

	/**
	 * Vibration actuator used to provide haptic feedback.
	 * 
	 * https://www.w3.org/TR/gamepad/#dom-gamepadhapticactuator
	 */
	public vibrationActuator: GamepadHapticActuator = null;

	/**
	 * Gamepad buttons with their associated state.
	 *
	 * Should be different for every gamepad.
	 */
	public buttons: Button[] = [];

	/**
	 * Axes values for the gamepad.
	 */
	public axes: number[] = [];

	/**
	 * Gamepad API object used to acess the gamepad input.
	 */
	public gamepad: any = null;

	/**
	 * Event manager for gamepad connection.
	 */
	private event: EventManager = null;

	public constructor()
	{
		super();
		
		this.initialize();
	}

	public initialize(): void
	{
		this.event = new EventManager();
		this.event.add(window, 'gamepadconnected', (event: any) => 
		{
			console.log('SyncInput: Gamepad connected', event);

			// If no gamepad is set use the connected one
			if (this.index === -1 || this.index === event.gamepad.index)
			{
				this.setGamepad(event.gamepad);
			}
		});
		this.event.add(window, 'gamepaddisconnected', (event: any) => 
		{
			console.log('SyncInput: Gamepad disconnected', event);
			
			if (this.index === event.gamepad.index)
			{
				console.log('SyncInput: Lost connection to gamepad', event);
				this.connected = false;
				this.gamepad = null;
			}
		});
		this.event.create();

		// Get the first gamepad connected to the system
		var gamepads = this.getGamepads();
		for (var i = 0; i < gamepads.length; i++)
		{
			this.setGamepad(gamepads[i]);
			return;
		}


		// If no gamepad is found set the
		if (this.gamepad === null)
		{
			console.error('SyncInput: No gamepad found, waiting for connection.');
		}
	}

	/**
	 * Reset the haptic actuator of the gamepad. Stops all effects.
	 */
	public resetHaptic(): void
	{	
		// @ts-ignore
		if (this.vibrationActuator?.reset)
		{
			// @ts-ignore
			this.vibrationActuator.reset();
		}
		
	}

	/**
	 * Start a haptic effect on the gamepad.
	 * 
	 * @param type - Type of the effect to start.
	 * @param params - Parameters for the effect.
	 */
	public startHapticEffect(type: GamepadHapticEffectType, params: GamepadEffectParameters): void
	{
		// @ts-ignore
		if (this.vibrationActuator?.playEffect)
		{
			// @ts-ignore
			this.vibrationActuator.playEffect(type, params);
		}
	}

	/**
	 * Get gamepads connected to the system.
	 * 
	 * @returns Array with all gamepads connected to the system.
	 */
	public getGamepads(): any[]
	{
		const gamepads = navigator.getGamepads();

		return gamepads.filter(function(gamepad) 
		{	
			return gamepad !== null;
		});
	}

	/**
	 * Set which gamepad should be used by this gamepad instance.
	 *
	 * Can be used to override the gamepad attached to this object and enable multiple gamepad support.
	 * 
	 * @param gamepad - Browser gamepad object.
	 */
	public setGamepad(gamepad: any): any
	{	
		if (gamepad)
		{
			// Store gamepad and its index
			this.index = gamepad.index;
			this.gamepad = gamepad;

			// Create and initialize buttons
			this.buttons = [];
			for (var i: number = 0; i < gamepad.buttons.length; i++)
			{
				this.buttons.push(new Button());
			}

			// Try to get the device vendor and product id
			this.setProductVendor(gamepad);
			this.connected = true;
		}
		else
		{
			console.warn('nunuStudio: No gamepad found');
			this.dispose();
		}
	}

	/**
	 * Disconnect this gamepad object.
	 */
	public dispose(): void
	{
		this.mapping = null;
		this.vibrationActuator = null;
		this.id = null;

		this.connected = false;

		this.gamepad = null;
		this.buttons = [];

		this.event.destroy();
		this.event = null;
	}

	/**
	 * Get vendor id and product id for the connected gamepad.
	 *
	 * @param gamepad - Gamepad object.
	 */
	public setProductVendor(gamepad: any): void
	{
		this.id = gamepad.id;
		this.mapping = gamepad.mapping;
		this.vibrationActuator = gamepad.vibrationActuator;
	}

	/**
	 * Update the gamepad state.
	 *
	 * Should be called every frame before checking the buttons values.
	 */
	public update(): void
	{
		if (!this.connected)
		{
			return;
		}

		this.gamepad = navigator.getGamepads()[this.index];
	
		if (this.gamepad)
		{
			for (var i: number = 0; i < this.buttons.length; i++)
			{
				this.buttons[i].update(this.gamepad.buttons[i].pressed ? ButtonAction.DOWN : ButtonAction.UP);
			}

			
		}
	}

	/**
	 * Get analog button value between 0 and 1.
	 *
	 * If the button is not analog enabled it will return 0 if button is not pressed or 1 if the button is pressed.
	 *
	 * @param buttonIndex - Button to get analogue value from.
	 * @returns Value between 0 and 1 depending how hard the button is pressed.
	 */
	public getAnalogueButton(buttonIndex: number): number
	{
		return buttonIndex > this.buttons.length || buttonIndex < 0 ? 0 : this.applyDeadzone(this.gamepad.buttons[buttonIndex].value);
	}

	/**
	 * Apply deadzone to the value.
	 * 
	 * @param value - Value to apply the deadzone to.
	 * @returns Value with the deadzone applied.
	 */
	public applyDeadzone(value: number): number
	{
		return Math.abs(value) < this.deadzone ? 0 : value;
	}

	/**
	 * Get axis value between -1 and 1 depending on the direction.
	 *
	 * @param axisIndex - Index of the axis to get value from.
	 * @returns Value between -1 and 1 depending on the axis direction
	 */
	public getAxis(axisIndex: number): number
	{
		return axisIndex > this.gamepad.axes.length || axisIndex < 0 ? 0 : this.applyDeadzone(this.gamepad.axes[axisIndex]);
	}

	/**
	 * Check if a button exists in the connected public static 
	 *
	 * @param button - Button to check status of
	 * @returns True if button exists in the connected gamepad.
	 */
	public buttonExists(button: number): boolean
	{
		return button >= 0 && button < this.buttons.length;
	}

	/**
	 * Check if gamepad button is currently pressed.
	 * 
	 * @param button - Button to check status of
	 * @returns True if button is currently pressed
	 */
	public buttonPressed(button: number): boolean
	{
		return this.buttons[button] ? this.buttons[button].pressed : false;
	}

	/**
	 * Check if a gamepad button was just pressed.
	 * 
	 * @param button - Button to check status of
	 * @returns True if button was just pressed
	 */
	public buttonJustPressed(button: number): boolean
	{
		return this.buttons[button] ? this.buttons[button].justPressed : false;
	}

	/**
	 * Check if a gamepad button was just released.
	 * 
	 * @param button - Button to check status of
	 * @returns True if button was just released
	 */
	public buttonJustReleased(button: number): boolean
	{
		return this.buttons[button] ? this.buttons[button].justReleased : false;
	}
}
