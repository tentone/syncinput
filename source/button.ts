
/**
 * Stored possible actions for buttons.
 */
export enum ButtonAction 
{
	/**
	 * Down
	 */
	DOWN = -1,

	/**
	 * Up
	 */
	UP = 1,

	/**
	 * Reset
	 */
	RESET = 0
}

/**
 * Key is used by Keyboard and Mouse, to represent a key state.
 */
export class Button 
{
	/**
	 * Indicates if this key is currently pressed.
	 */
	public pressed: boolean = false;

	/**
	 * Indicates if this key was just pressed.
	 */
	public justPressed: boolean = false;

	/**
	 * Indicates if this key was just released.
	 */
	public justReleased: boolean = false;

	/**
	 * Update Key status based on new key state.
	 * 
	 * @param action - Button action to apply.
	 */
	public update(action: ButtonAction): void 
	{
		this.justPressed = false;
		this.justReleased = false;

		if (action === ButtonAction.DOWN) 
		{
			if (!this.pressed) 
			{
				this.justPressed = true;
			}
			this.pressed = true;
		}
		else if (action === ButtonAction.UP) 
		{
			if (this.pressed) 
			{
				this.justReleased = true;
			}
			this.pressed = false;
		}
		else if (action === ButtonAction.RESET) 
		{
			this.justReleased = false;
			this.justPressed = false;
		}
	}

	/**
	 * Set this key attributes manually.
	 * 
	 * @param justPressed - Indicate if the button was just pressed.
	 * @param pressed - Indicate if the button is pressed.
	 * @param justReleased - Indicate if the button was just released.
	 */
	public set(justPressed: boolean, pressed: boolean, justReleased: boolean): void 
	{
		this.justPressed = justPressed;
		this.pressed = pressed;
		this.justReleased = justReleased;
	}

	/**
	 * Reset key to default values.
	 */
	public reset(): void 
	{
		this.justPressed = false;
		this.pressed = false;
		this.justReleased = false;
	}
}
