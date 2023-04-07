import {Button, ButtonAction} from './button';
import {InputHandler} from './input-handler';

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
	 * Vendor code of the gamepad device.
	 */
	public vendor: number = -1;

	/**
	 * Product code of the gamepad device.
	 */
	public product: number = -1;

	/**
	 * Connected state of the gamepad.
	 */
	public connected: boolean = false;
	
	/**
	 * Index of the gamepad instance.
	 */
	public index: number = -1;

	/**
	 * Gamepad buttons with their associated state.
	 *
	 * Should be different for every gamepad.
	 */
	public buttons: Button[] = [];

	/**
	 * Gamepad API object used to acess the gamepad input.
	 */
	public gamepad: any = null;

	public constructor()
	{
		super();
		
		this.initialize();
	}

	public initialize(): void
	{
		var gamepads = navigator.getGamepads();
		for (var i = 0; i < gamepads.length; i++)
		{
			if (gamepads[i] !== null)
			{
				this.setGamepad(gamepads[i]);
				break;
			}
		}
		
		if (this.gamepad === null)
		{
			console.error('SyncInput: No gamepad found');
		}
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
		this.vendor = -1;
		this.product = -1;
		this.connected = false;

		this.gamepad = null;
		this.buttons = [];
	}

	/**
	 * Get vendor id and product id for the connected gamepad.
	 *
	 * @param gamepad - Gamepad object.
	 */
	public setProductVendor(gamepad: any): void
	{
		// Chrome
		try
		{
			var temp = gamepad.id.split(':');

			this.vendor = temp[1].split(' ')[1];
			this.product = temp[2].replace(' ', '').replace(')', '');

			return;
		}
		catch (e) {}

		// Firefox
		try
		{
			var temp = gamepad.id.split('-');

			this.vendor = temp[0];
			this.product = temp[1];

			return;
		}
		catch (e) {}
	}

	/**
	 * Update the gamepad state.
	 *
	 * Should be called every frame before checking the buttons values.
	 */
	public update(): void
	{
		this.gamepad = navigator.getGamepads()[this.index];

		if (this.gamepad !== undefined)
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
	 * @param button - Button to get analogue value from.
	 * @returns Value between 0 and 1 depending how hard the button is pressed.
	 */
	public getAnalogueButton(button: number): number
	{
		return button > this.buttons.length || button < 0 ? 0 : this.gamepad.buttons[button].value;
	}

	/**
	 * Get axis value between -1 and 1 depending on the direction.
	 *
	 * @param axis - Axis to get value from.
	 * @returns Value between -1 and 1 depending on the axis direction
	 */
	public getAxis(axis: number): number
	{
		return axis > this.gamepad.axes.length || axis < 0 ? 0 : this.gamepad.axes[axis];
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
