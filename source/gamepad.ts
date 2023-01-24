import {Button} from "./button";

/**
 * Gamepad provides basic support for gamepads.
 *
 * Some gamepads require a button press to being detected.
 * 
 * Gamepad implementation across browsers is still fragmented, every browser implements it a bit differently, so test it on every target before deploying an application using it.
 *
 * For more information about the Gamepad API state take look at the W3C Gamepad API page https://www.w3.org/TR/gamepad/.
 */
export class Gamepad
{
	

	/**
	 * Gamepad LEFT button.
	 * @type {number}
	 * @attribute LEFT
	 */
	public static LEFT = 14;

	/**
	 * Gamepad RIGHT button.
	 * @type {number}
	 * @attribute RIGHT
	 */
	public static RIGHT = 15;

	/**
	 * Gamepad DOWN button.
	 * @type {number}
	 * @attribute DOWN
	 */
	public static DOWN = 13;

	/**
	 * Gamepad UP button.
	 * @type {number}
	 * @attribute UP
	 */
	public static UP = 12;

	/**
	 * Gamepad SELECT button.
	 * @type {number}
	 * @attribute SELECT
	 */
	public static SELECT = 8;

	/**
	 * Gamepad START button.
	 * @type {number}
	 * @attribute START
	 */
	public static START = 9;

	/**
	 * Gamepad HOME button.
	 * @type {number}
	 * @attribute HOME
	 */
	public static HOME = 16;

	/**
	 * Gamepad LEFT_TRIGGER_A button.
	 * @type {number}
	 * @attribute LEFT_TRIGGER_A
	 */
	public static LEFT_TRIGGER_A = 4;

	/**
	 * Gamepad LEFT_TRIGGER_B button.
	 * @type {number}
	 * @attribute LEFT_TRIGGER_B
	 */
	public static LEFT_TRIGGER_B = 6;

	/**
	 * Gamepad RIGHT_TRIGGER_A button.
	 * @type {number}
	 * @attribute RIGHT_TRIGGER_A
	 */
	public static RIGHT_TRIGGER_A = 5;

	/**
	 * Gamepad RIGHT_TRIGGER_B button.
	 * @type {number}
	 * @attribute RIGHT_TRIGGER_B
	 */
	public static RIGHT_TRIGGER_B = 7;

	/**
	 * Gamepad L1 button.
	 * @type {number}
	 * @attribute L1
	 */
	public static L1 = 4;

	/**
	 * Gamepad L2 button.
	 * @type {number}
	 * @attribute L2
	 */
	public static L2 = 6;

	/**
	 * Gamepad L3 button.
	 * @type {number}
	 * @attribute L3
	 */
	public static L3 = 6;

	/**
	 * Gamepad R1 button.
	 * @type {number}
	 * @attribute R1
	 */
	public static R1 = 5;

	/**
	 * Gamepad R2 button.
	 * @type {number}
	 * @attribute R2
	 */
	public static R2 = 7;

	/**
	 * Gamepad R3 button.
	 * @type {number}
	 * @attribute R3
	 */
	public static R3 = 11;

	/**
	 * Gamepad A button.
	 * @type {number}
	 * @attribute A
	 */
	public static A = 0;

	/**
	 * Gamepad B button.
	 * @type {number}
	 * @attribute B
	 */
	public static B = 1;

	/**
	 * Gamepad C button.
	 * @type {number}
	 * @attribute C
	 */
	public static C = 2;

	/**
	 * Gamepad D button.
	 * @type {number}
	 * @attribute D
	 */
	public static D = 3;

	/**
	 * Gamepad X button.
	 * @type {number}
	 * @attribute X
	 */
	public static X = 2;

	/**
	 * Gamepad Y button.
	 * @type {number}
	 * @attribute Y
	 */
	public static Y = 3;

	/**
	 * Gamepad LEFT_ANALOGUE_BUT axis.
	 * @type {number}
	 * @attribute LEFT_ANALOGUE_BUT
	 */
	public static LEFT_ANALOGUE_BUT = 10;

	/**
	 * Gamepad LEFT_ANALOGUE_HOR axis.
	 * @type {number}
	 * @attribute LEFT_ANALOGUE_HOR
	 */
	public static LEFT_ANALOGUE_HOR = 0;

	/**
	 * Gamepad LEFT_ANALOGUE_VERT axis.
	 * @type {number}
	 * @attribute LEFT_ANALOGUE_VERT
	 */
	public static LEFT_ANALOGUE_VERT = 1;

	/**
	 * Gamepad RIGHT_ANALOGUE_BUT axis.
	 * @type {number}
	 * @attribute RIGHT_ANALOGUE_BUT
	 */
	public static RIGHT_ANALOGUE_BUT = 11;

	/**
	 * Gamepad RIGHT_ANALOGUE_HOR axis.
	 * @type {number}
	 * @attribute RIGHT_ANALOGUE_HOR
	 */
	public static RIGHT_ANALOGUE_HOR = 2;

	/**
	 * Gamepad RIGHT_ANALOGUE_VERT axis.
	 * @type {number}
	 * @attribute RIGHT_ANALOGUE_VERT
	 */
	public static RIGHT_ANALOGUE_VERT = 3;

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
		var gamepads = navigator.getGamepads();
		for(var i = 0; i < gamepads.length; i++)
		{
			if(gamepads[i] !== null)
			{
				this.setGamepad(gamepads[i]);
				break;
			}
		}
		
		if(this.gamepad === null)
		{
			console.error("No gamepad found");
		}
	}

	/**
	 * Set which gamepad should be used by this Gamepad instance.
	 *
	 * Can be used to override the gamepad attached to this object and enable multiple gamepad support.
	 * 
	 * @param gamepad - Browser gamepad object.
	 */
	public setGamepad(gamepad: any): any
	{	
		if(gamepad !== undefined && gamepad !== null)
		{
			// Store gamepad and its index
			this.index = gamepad.index;
			this.gamepad = gamepad;

			// Create and initialize buttons
			this.buttons = [];
			for(var i = 0; i < gamepad.buttons.length; i++)
			{
				this.buttons.push(new Button());
			}

			// Try to get the device vendor and product id
			this.setProductVendor(gamepad);
			this.connected = true;
		}
		else
		{
			console.warn("nunuStudio: No gamepad found");
			this.disconnect();
		}
	};

	/**
	 * Disconnect this gamepad object.
	 */
	public disconnect(): void
	{
		this.vendor = -1;
		this.product = -1;
		this.connected = false;

		this.gamepad = null;
		this.buttons = [];
	};

	/**
	 * Get vendor id and product id for the connected gamepad.
	 *
	 * @method setProductVendor
	 * @param gamepad - Gamepad object.
	 */
	public setProductVendor(gamepad: any): void
	{
		// Chrome
		try
		{
			var temp = gamepad.id.split(":");

			this.vendor = temp[1].split(" ")[1];
			this.product = temp[2].replace(" ", "").replace(")", "");

			return;
		}
		catch(e){}

		// Firefox
		try
		{
			var temp = gamepad.id.split("-");

			this.vendor = temp[0];
			this.product = temp[1];

			return;
		}
		catch(e){}
	};

	/**
	 * Update the gamepad state.
	 *
	 * Should be called every frame before checking the buttons values.
	 */
	public update(delta: number): void
	{
		this.gamepad = navigator.getGamepads()[this.index];

		if(this.gamepad !== undefined)
		{
			for(var i = 0; i < this.buttons.length; i++)
			{
				this.buttons[i].update(this.gamepad.buttons[i].pressed ? Button.DOWN : Button.UP);
			}
		}
	};

	/**
	 * Get analog button value between 0 and 1.
	 *
	 * If the button is not analog enabled it will return 0 if button is not pressed or 1 if the button is pressed.
	 *
	 * @param button - Button to get analogue value from.
	 * @return Value between 0 and 1 depending how hard the button is pressed.
	 */
	public getAnalogueButton(button: number): number
	{
		return (button > this.buttons.length || button < 0) ? 0 : this.gamepad.buttons[button].value;
	};

	/**
	 * Get axis value between -1 and 1 depending on the direction.
	 *
	 * @param axis - Axis to get value from.
	 * @return Value between -1 and 1 depending on the axis direction
	 */
	public getAxis(axis: number): number
	{
		return (axis > this.gamepad.axes.length || axis < 0) ? 0 : this.gamepad.axes[axis];
	};

	/**
	 * Check if a button exists in the connected public static 
	 *
	 * @param button - Button to check status of
	 * @return True if button exists in the connected gamepad.
	 */
	public buttonExists(button: number): boolean
	{
		return button >= 0 && button < this.buttons.length;
	};

	/**
	 * Check if gamepad button is currently pressed.
	 * 
	 * @method buttonPressed
	 * @param button - Button to check status of
	 * @return True if button is currently pressed
	 */
	public buttonPressed(button: number): boolean
	{
		return this.buttons[button] ? this.buttons[button].pressed : false;
	};

	/**
	 * Check if a gamepad button was just pressed.
	 * 
	 * @method buttonJustPressed
	 * @param button - Button to check status of
	 * @return True if button was just pressed
	 */
	public buttonJustPressed(button: number): boolean
	{
		return this.buttons[button] ? this.buttons[button].justPressed : false;
	};

	/**
	 * Check if a gamepad button was just released.
	 * 
	 * @method buttonJustReleased
	 * @param button - Button to check status of
	 * @return True if button was just released
	 */
	public buttonJustReleased(button: number): boolean
	{
		return this.buttons[button] ? this.buttons[button].justReleased : false;
	};
}
