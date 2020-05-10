/**
 * Key is used by Keyboard, Mouse, etc, to represent a key state.
 *
 * @class Key
 * @constructor
 */
function Key()
{
	/**
	 * Indicates if this key is currently pressed.
	 * @property pressed
	 * @default false
	 * @type {boolean}
	 */
	this.pressed = false;

	/**
	 * Indicates if this key was just pressed.
	 * @property justPressed
	 * @default false
	 * @type {boolean}
	 */
	this.justPressed = false;
	
	/**
	 * Indicates if this key was just released.
	 * @property justReleased
	 * @default false
	 * @type {boolean}
	 */
	this.justReleased = false;
}

/**
 * Down
 * @attribute DOWN
 * @type {number}
 */
Key.DOWN = -1;

/**
 * Up
 * @attribute UP
 * @type {number}
 */
Key.UP = 1;

/**
 * Reset
 * @attribute RESET
 * @type {number}
 */
Key.RESET = 0;

Key.prototype.constructor = Key;

/**
 * Update Key status based on new key state.
 * 
 * @method update
 */
Key.prototype.update = function(action)
{
	this.justPressed = false;
	this.justReleased = false;

	if(action === Key.DOWN)
	{
		if(this.pressed === false)
		{
			this.justPressed = true;
		}
		this.pressed = true;
	}
	else if(action === Key.UP)
	{
		if(this.pressed)
		{
			this.justReleased = true;
		}
		this.pressed = false;
	}
	else if(action === Key.RESET)
	{
		this.justReleased = false;
		this.justPressed = false;
	}
};

/**
 * Set this key attributes manually.
 * 
 * @method set
 */
Key.prototype.set = function(justPressed, pressed, justReleased)
{
	this.justPressed = justPressed;
	this.pressed = pressed;
	this.justReleased = justReleased;
};

/**
 * Reset key to default values.
 * 
 * @method reset
*/
Key.prototype.reset = function()
{
	this.justPressed = false;
	this.pressed = false;
	this.justReleased = false;
};

/**
 * Gamepad provides basic support for gamepads.
 *
 * Some gamepads require a button press to being detected.
 * 
 * Gamepad implementation across browsers is still fragmented, every browser implements it a bit differently, so test it on every target before deploying an application using it.
 *
 * For more information about the Gamepad API state take look at the W3C Gamepad API page https:// www.w3.org/TR/gamepad/.
 * 
 * @class Gamepad
 * @constructor
 */
function Gamepad()
{
	/**
	 * Vendor code of the gamepad device.
	 *
	 * @attribute vendor
	 * @type {number}
	 */
	this.vendor = -1;

	/**
	 * Product code of the gamepad device.
	 *
	 * @attribute product
	 * @type {number}
	 */
	this.product = -1;

	/**
	 * Connected state of the gamepad.
	 *
	 * @attribute connected
	 * @type {boolean}
	 */
	this.connected = false;
	
	this.gamepad = null;

	/**
	 * Gamepad buttons with their associated state.
	 *
	 * Should be different for every gamepad.
	 *
	 * @attribute buttons
	 * @type {Array}
	 */
	this.buttons = [];

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
 * @param {Object} Browser gamepad object.
 * @method setGamepad
 */
Gamepad.prototype.setGamepad = function(gamepad)
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
			this.buttons.push(new Key());
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
 * 
 * @method disconnect
 */
Gamepad.prototype.disconnect = function()
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
 * @param {Object} gamepad Gamepad object.
 */
Gamepad.prototype.setProductVendor = function(gamepad)
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
 * 
 * @method update
 */
Gamepad.prototype.update = function(delta)
{
	this.gamepad = navigator.getGamepads()[this.index];

	if(this.gamepad !== undefined)
	{
		for(var i = 0; i < this.buttons.length; i++)
		{
			this.buttons[i].update(this.gamepad.buttons[i].pressed ? Key.DOWN : Key.UP);
		}
	}
};

/**
 * Get analog button value between 0 and 1.
 *
 * If the button is not analog enabled it will return 0 if button is not pressed or 1 if the button is pressed.
 *
 * @method getAnalogueButton
 * @param {number} button Button to get analogue value from.
 * @return {number} Value between 0 and 1 depending how hard the button is pressed.
 */
Gamepad.prototype.getAnalogueButton = function(button)
{
	return (button > this.buttons.length || button < 0) ? 0 : this.gamepad.buttons[button].value;
};

/**
 * Get axis value between -1 and 1 depending on the direction.
 *
 * @method getAxis
 * @param {number} Axis to get value from.
 * @return {number} Value between -1 and 1 depending on the axis direction
 */
Gamepad.prototype.getAxis = function(axis)
{
	return (axis > this.gamepad.axes.length || axis < 0) ? 0 : this.gamepad.axes[axis];
};

/**
 * Check if a button exists in the connected Gamepad.
 * 
 * @method buttonExists
 * @param {number} button Button to check status of
 * @return {boolean} True if button exists in the connected gamepad.
 */
Gamepad.prototype.buttonExists = function(button)
{
	return button >= 0 && button < this.buttons.length;
};

/**
 * Check if gamepad button is currently pressed.
 * 
 * @method buttonPressed
 * @param {number} button Button to check status of
 * @return {boolean} True if button is currently pressed
 */
Gamepad.prototype.buttonPressed = function(button)
{
	return this.buttons[button] ? this.buttons[button].pressed : false;
};

/**
 * Check if a gamepad button was just pressed.
 * 
 * @method buttonJustPressed
 * @param {number} button Button to check status of
 * @return {boolean} True if button was just pressed
 */
Gamepad.prototype.buttonJustPressed = function(button)
{
	return this.buttons[button] ? this.buttons[button].justPressed : false;
};

/**
 * Check if a gamepad button was just released.
 * 
 * @method buttonJustReleased
 * @param {number} button Button to check status of
 * @return {boolean} True if button was just released
 */
Gamepad.prototype.buttonJustReleased = function(button)
{
	return this.buttons[button] ? this.buttons[button].justReleased : false;
};

/**
 * Gamepad LEFT button.
 * @type {number}
 * @attribute LEFT
 */
Gamepad.LEFT = 14;

/**
 * Gamepad RIGHT button.
 * @type {number}
 * @attribute RIGHT
 */
Gamepad.RIGHT = 15;

/**
 * Gamepad DOWN button.
 * @type {number}
 * @attribute DOWN
 */
Gamepad.DOWN = 13;

/**
 * Gamepad UP button.
 * @type {number}
 * @attribute UP
 */
Gamepad.UP = 12;

/**
 * Gamepad SELECT button.
 * @type {number}
 * @attribute SELECT
 */
Gamepad.SELECT = 8;

/**
 * Gamepad START button.
 * @type {number}
 * @attribute START
 */
Gamepad.START = 9;

/**
 * Gamepad HOME button.
 * @type {number}
 * @attribute HOME
 */
Gamepad.HOME = 16;

/**
 * Gamepad LEFT_TRIGGER_A button.
 * @type {number}
 * @attribute LEFT_TRIGGER_A
 */
Gamepad.LEFT_TRIGGER_A = 4;

/**
 * Gamepad LEFT_TRIGGER_B button.
 * @type {number}
 * @attribute LEFT_TRIGGER_B
 */
Gamepad.LEFT_TRIGGER_B = 6;

/**
 * Gamepad RIGHT_TRIGGER_A button.
 * @type {number}
 * @attribute RIGHT_TRIGGER_A
 */
Gamepad.RIGHT_TRIGGER_A = 5;

/**
 * Gamepad RIGHT_TRIGGER_B button.
 * @type {number}
 * @attribute RIGHT_TRIGGER_B
 */
Gamepad.RIGHT_TRIGGER_B = 7;

/**
 * Gamepad L1 button.
 * @type {number}
 * @attribute L1
 */
Gamepad.L1 = 4;

/**
 * Gamepad L2 button.
 * @type {number}
 * @attribute L2
 */
Gamepad.L2 = 6;

/**
 * Gamepad L3 button.
 * @type {number}
 * @attribute L3
 */
Gamepad.L3 = 6;

/**
 * Gamepad R1 button.
 * @type {number}
 * @attribute R1
 */
Gamepad.R1 = 5;

/**
 * Gamepad R2 button.
 * @type {number}
 * @attribute R2
 */
Gamepad.R2 = 7;

/**
 * Gamepad R3 button.
 * @type {number}
 * @attribute R3
 */
Gamepad.R3 = 11;

/**
 * Gamepad A button.
 * @type {number}
 * @attribute A
 */
Gamepad.A = 0;

/**
 * Gamepad B button.
 * @type {number}
 * @attribute B
 */
Gamepad.B = 1;

/**
 * Gamepad C button.
 * @type {number}
 * @attribute C
 */
Gamepad.C = 2;

/**
 * Gamepad D button.
 * @type {number}
 * @attribute D
 */
Gamepad.D = 3;

/**
 * Gamepad X button.
 * @type {number}
 * @attribute X
 */
Gamepad.X = 2;

/**
 * Gamepad Y button.
 * @type {number}
 * @attribute Y
 */
Gamepad.Y = 3;

/**
 * Gamepad LEFT_ANALOGUE_BUT axis.
 * @type {number}
 * @attribute LEFT_ANALOGUE_BUT
 */
Gamepad.LEFT_ANALOGUE_BUT = 10;

/**
 * Gamepad LEFT_ANALOGUE_HOR axis.
 * @type {number}
 * @attribute LEFT_ANALOGUE_HOR
 */
Gamepad.LEFT_ANALOGUE_HOR = 0;

/**
 * Gamepad LEFT_ANALOGUE_VERT axis.
 * @type {number}
 * @attribute LEFT_ANALOGUE_VERT
 */
Gamepad.LEFT_ANALOGUE_VERT = 1;

/**
 * Gamepad RIGHT_ANALOGUE_BUT axis.
 * @type {number}
 * @attribute RIGHT_ANALOGUE_BUT
 */
Gamepad.RIGHT_ANALOGUE_BUT = 11;

/**
 * Gamepad RIGHT_ANALOGUE_HOR axis.
 * @type {number}
 * @attribute RIGHT_ANALOGUE_HOR
 */
Gamepad.RIGHT_ANALOGUE_HOR = 2;

/**
 * Gamepad RIGHT_ANALOGUE_VERT axis.
 * @type {number}
 * @attribute RIGHT_ANALOGUE_VERT
 */
Gamepad.RIGHT_ANALOGUE_VERT = 3;

/**
 * Keyboard instance for input in sync with the running application, internally stores the key transitions provided by the browser.
 * 
 * Allow to detect every key press, release event in sync with the app frame update.
 * 
 * @class Keyboard
 * @constructor
 */
function Keyboard()
{
	/**
	 * Array with keyboard keys status.
	 *
	 * @property keys
	 * @type {Array}
	 */
	this.keys = [];

	/**
	 * The actions array serves as a buffer for the key input actions.
	 *
	 * Until the update method is called it stores all the key stroke actions.
	 *
	 * On update the key strokes are updated and the keys array stores the correct values.
	 *
	 * @property actions
	 * @type {Array}
	 */
	this.actions = [];

	this.events = [];

	var self = this;
	var actions = this.actions;

	this.events.push([window, "keydown", function(event)
	{
		actions.push(event.keyCode);
		actions.push(Key.DOWN);
	}]);
	this.events.push([window, "keyup", function(event)
	{
		actions.push(event.keyCode);
		actions.push(Key.UP);
	}]);
	this.events.push([window, "focus", function(event)
	{
		self.reset();
	}]);

	this.create();
}

Keyboard.prototype = Keyboard;
Keyboard.prototype.constructor = Keyboard;

/**
 * Update key flags synchronously.
 * 
 * @method update
 */
Keyboard.update = function()
{
	var end = 0;

	while(this.actions.length > end)
	{
		var key = this.actions.shift();
		var action = this.actions.shift();

		if(this.keys[key] === undefined)
		{
			this.keys[key] = new Key();
		}

		this.keys[key].update(action);

		if(this.keys[key].justReleased || this.keys[key].justPressed)
		{
			this.actions.push(key);
			this.actions.push(Key.RESET);
			end += 2;
		}
	}
};

/**
 * Reset keyboard status to default.
 *
 * Does not clean the action list.
 * 
 * @method reset
 */
Keyboard.reset = function()
{
	// Reset all keys
	for(var i = 0; i < this.keys.length; i++)
	{
		if(this.keys[i] !== undefined)
		{
			this.keys[i].reset();
		}
	}
};

/**
 * Check if a key is pressed.
 * 
 * @method keyPressed
 * @return {boolean} True is the key is currently pressed
 */
Keyboard.keyPressed = function(key)
{
	return this.keys[key] !== undefined && this.keys[key].pressed;
};

/**
 * Check is a key as just pressed.
 * 
 * @method keyJustPressed
 * @return {boolean} True is the key was just pressed
 */
Keyboard.keyJustPressed = function(key)
{
	return this.keys[key] !== undefined && this.keys[key].justPressed;
};

/**
 * Check if a key was just released.
 * 
 * @method keyJustReleased
 * @return {boolean} True is the key was just pressed
 */
Keyboard.keyJustReleased = function(key)
{
	return this.keys[key] !== undefined && this.keys[key].justReleased;
};

/**
 * Create keyboard events.
 * 
 * @method dispose
 */
Keyboard.create = function()
{
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].addEventListener(event[1], event[2]);
	}
};

/**
 * Dispose keyboard events.
 * 
 * @method dispose
 */
Keyboard.dispose = function()
{
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].removeEventListener(event[1], event[2]);
	}
};

/**
 * TAB key
 * @attribute TAB
 * @type {number}
 */
Keyboard.TAB = 9;

/**
 * ENTER key
 * @attribute ENTER
 * @type {number}
 */
Keyboard.ENTER = 13;

/**
 * SHIFT key
 * @attribute SHIFT
 * @type {number}
 */
Keyboard.SHIFT = 16;

/**
 * CTRL key
 * @attribute CTRL
 * @type {number}
 */
Keyboard.CTRL = 17;

/**
 * ALT key
 * @attribute ALT
 * @type {number}
 */
Keyboard.ALT = 18;

/**
 * CAPS_LOCK key
 * @attribute CAPS_LOCK
 * @type {number}
 */
Keyboard.CAPS_LOCK = 20;

/**
 * ESC key
 * @attribute ESC
 * @type {number}
 */
Keyboard.ESC = 27;

/**
 * SPACEBAR key
 * @attribute SPACEBAR
 * @type {number}
 */
Keyboard.SPACEBAR = 32;

/**
 * PAGE_UP key
 * @attribute PAGE_UP
 * @type {number}
 */
Keyboard.PAGE_UP = 33;

/**
 * PAGE_DOWN key
 * @attribute PAGE_DOWN
 * @type {number}
 */
Keyboard.PAGE_DOWN = 34;

/**
 * END key
 * @attribute END
 * @type {number}
 */
Keyboard.END = 35;

/**
 * HOME key
 * @attribute HOME
 * @type {number}
 */
Keyboard.HOME = 36;

/**
 * INSERT key
 * @attribute INSERT
 * @type {number}
 */
Keyboard.INSERT = 45;

/**
 * DEL key
 * @attribute DEL
 * @type {number}
 */
Keyboard.DEL = 46;

/**
 * LEFT key
 * @attribute LEFT
 * @type {number}
 */
Keyboard.LEFT = 37;

/**
 * RIGHT key
 * @attribute RIGHT
 * @type {number}
 */
Keyboard.RIGHT = 39;

/**
 * UP key
 * @attribute UP
 * @type {number}
 */
Keyboard.UP = 38;

/**
 * DOWN key
 * @attribute DOWN
 * @type {number}
 */
Keyboard.DOWN = 40;

/**
 * NUM0 key
 * @attribute NUM0
 * @type {number}
 */
Keyboard.NUM0 = 48;

/**
 * NUM1 key
 * @attribute NUM1
 * @type {number}
 */
Keyboard.NUM1 = 49;

/**
 * NUM2 key
 * @attribute NUM2
 * @type {number}
 */
Keyboard.NUM2 = 50;

/**
 * NUM3 key
 * @attribute NUM3
 * @type {number}
 */
Keyboard.NUM3 = 51;

/**
 * NUM4 key
 * @attribute NUM4
 * @type {number}
 */
Keyboard.NUM4 = 52;

/**
 * NUM5 key
 * @attribute NUM5
 * @type {number}
 */
Keyboard.NUM5 = 53;

/**
 * NUM6 key
 * @attribute NUM6
 * @type {number}
 */
Keyboard.NUM6 = 54;

/**
 * NUM7 key
 * @attribute NUM7
 * @type {number}
 */
Keyboard.NUM7 = 55;

/**
 * NUM8 key
 * @attribute NUM8
 * @type {number}
 */
Keyboard.NUM8 = 56;

/**
 * NUM9 key
 * @attribute NUM9
 * @type {number}
 */
Keyboard.NUM9 = 57;

/**
 * A key
 * @attribute A
 * @type {number}
 */
Keyboard.A = 65;

/**
 * B key
 * @attribute B
 * @type {number}
 */
Keyboard.B = 66;

/**
 * C key
 * @attribute C
 * @type {number}
 */
Keyboard.C = 67;

/**
 * D key
 * @attribute D
 * @type {number}
 */
Keyboard.D = 68;

/**
 * E key
 * @attribute E
 * @type {number}
 */
Keyboard.E = 69;

/**
 * F key
 * @attribute F
 * @type {number}
 */
Keyboard.F = 70;

/**
 * G key
 * @attribute G
 * @type {number}
 */
Keyboard.G = 71;

/**
 * H key
 * @attribute H
 * @type {number}
 */
Keyboard.H = 72;

/**
 * I key
 * @attribute I
 * @type {number}
 */
Keyboard.I = 73;

/**
 * J key
 * @attribute J
 * @type {number}
 */
Keyboard.J = 74;

/**
 * K key
 * @attribute K
 * @type {number}
 */
Keyboard.K = 75;

/**
 * L key
 * @attribute L
 * @type {number}
 */
Keyboard.L = 76;

/**
 * M key
 * @attribute M
 * @type {number}
 */
Keyboard.M = 77;

/**
 * N key
 * @attribute N
 * @type {number}
 */
Keyboard.N = 78;

/**
 * O key
 * @attribute O
 * @type {number}
 */
Keyboard.O = 79;

/**
 * P key
 * @attribute P
 * @type {number}
 */
Keyboard.P = 80;

/**
 * Q key
 * @attribute Q
 * @type {number}
 */
Keyboard.Q = 81;

/**
 * R key
 * @attribute R
 * @type {number}
 */
Keyboard.R = 82;

/**
 * S key
 * @attribute S
 * @type {number}
 */
Keyboard.S = 83;

/**
 * T key
 * @attribute T
 * @type {number}
 */
Keyboard.T = 84;

/**
 * U key
 * @attribute U
 * @type {number}
 */
Keyboard.U = 85;

/**
 * V key
 * @attribute V
 * @type {number}
 */
Keyboard.V = 86;

/**
 * W key
 * @attribute W
 * @type {number}
 */
Keyboard.W = 87;

/**
 * X key
 * @attribute X
 * @type {number}
 */
Keyboard.X = 88;

/**
 * Y key
 * @attribute Y
 * @type {number}
 */
Keyboard.Y = 89;

/**
 * Z key
 * @attribute Z
 * @type {number}
 */
Keyboard.Z = 90;

/**
 * F1 key
 * @attribute F1
 * @type {number}
 */
Keyboard.F1 = 112;

/**
 * F2 key
 * @attribute F2
 * @type {number}
 */
Keyboard.F2 = 113;

/**
 * F3 key
 * @attribute F3
 * @type {number}
 */
Keyboard.F3 = 114;

/**
 * F4 key
 * @attribute F4
 * @type {number}
 */
Keyboard.F4 = 115;

/**
 * F5 key
 * @attribute F5
 * @type {number}
 */
Keyboard.F5 = 116;

/**
 * F6 key
 * @attribute F6
 * @type {number}
 */
Keyboard.F6 = 117;

/**
 * F7 key
 * @attribute F7
 * @type {number}
 */
Keyboard.F7 = 118;

/**
 * F8 key
 * @attribute F8
 * @type {number}
 */
Keyboard.F8 = 119;

/**
 * F9 key
 * @attribute F9
 * @type {number}
 */
Keyboard.F9 = 120;

/**
 * F10 key
 * @attribute F10
 * @type {number}
 */
Keyboard.F10 = 121;

/**
 * F11 key
 * @attribute F11
 * @type {number}
 */
Keyboard.F11 = 122;

/**
 * F12 key
 * @attribute F12
 * @type {number}
 */
Keyboard.F12 = 123;

/**
 * Vector 2 represents pairs of X and Y values. Use to represent all bidimensional variables.
 *
 * Mouse position, acceleration use this object type.
 *
 * @class Vector2
 * @constructor
 * @param {number} x X coordinate.
 * @param {number} x Y coordinate.
 */
function Vector2(x, y)
{
	this.x = (x !== undefined) ? x : 0;
	this.y = (y !== undefined) ? y : 0;
}

/**
 * Set the value of the vector.
 *
 * @method set
 * @param {number} x X coordinate.
 * @param {number} x Y coordinate.
 */
Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
};

/**
 * Mouse instance for sync input the mouse should be updated everytime before.
 *
 * Automatically calculates the diff of position between frames.
 * 
 * @class Mouse
 * @constructor
 */
function Mouse()
{
	//Raw data
	this._keys = [];
	this._position = new Vector2(0, 0);
	this._positionUpdated = false;
	this._delta = new Vector2(0, 0);
	this._wheel = 0;
	this._wheelUpdated = false;
	this._doubleClicked = new Array(5);

	/**
	 * Array with mouse buttons status.
	 *
	 * @type {array}
	 * @property keys
	 */
	this.keys = new Array(5);

	/**
	 * Mouse position inside of the window (coordinates in window space).
	 *
	 * @type {Vector2}
	 * @property position
	 */
	this.position = new Vector2(0, 0);

	/**
	 * Mouse movement (coordinates in window space).
	 *
	 * @type {Vector2}
	 * @property delta
	 */
	this.delta = new Vector2(0, 0);

	/**
	 * Mouse scroll wheel movement.
	 *
	 * @type {number}
	 * @property wheel
	 */
	this.wheel = 0;
	
	/**
	 * Indicates a button of the mouse was double clicked.
	 *
	 * @type {Array}
	 * @property doubleClicked
	 */
	this.doubleClicked = new Array(5);

	//Canvas (use to calculate coordinates relative to it)
	this.canvas = null;
	
	//Events
	this.events = [];

	//Initialize key instances
	for(var i = 0; i < 3; i++)
	{
		this._doubleClicked[i] = false;
		this.doubleClicked[i] = false;
		this._keys[i] = new Key();
		this.keys[i] = new Key();
	}

	//Self pointer
	var self = this;

	//Scroll wheel
	if(window.onmousewheel !== undefined)
	{
		//Chrome, edge
		this.events.push([window, "mousewheel", function(event)
		{
			self._wheel = event.deltaY;
			self._wheelUpdated = true;
		}]);
	}
	else if(window.addEventListener !== undefined)
	{
		//Firefox
		this.events.push([window, "DOMMouseScroll", function(event)
		{
			self._wheel = event.detail * 30;
			self._wheelUpdated = true;
		}]);
	}
	else
	{
		this.events.push([window, "wheel", function(event)
		{
			self._wheel = event.deltaY;
			self._wheelUpdated = true;
		}]);
	}

	//Touchscreen input
	if("ontouchstart" in window || navigator.msMaxTouchPoints > 0)
	{
		//Auxiliar variables to calculate touch delta
		var lastTouch = new Vector2(0, 0);

		//Touch screen pressed event
		this.events.push([window, "touchstart", function(event)
		{
			var touch = event.touches[0];
			lastTouch.set(touch.clientX, touch.clientY);
			self.updateKey(Mouse.LEFT, Key.DOWN);
		}]);

		//Touch screen released event
		this.events.push([window, "touchend", function(event)
		{
			self.updateKey(Mouse.LEFT, Key.UP);
		}]);

		// Touch cancel event
		this.events.push([window, "touchcancel", function(event)
		{
			self.updateKey(Mouse.LEFT, Key.UP);
		}]);

		//Touch screen move event
		this.events.push([window, "touchmove", function(event)
		{
			var touch = event.touches[0];

			if(self.canvas !== null)
			{
				var rect = self.canvas.getBoundingClientRect();
				self.updatePosition(touch.clientX - rect.left, touch.clientY - rect.top, touch.clientX - lastTouch.x, touch.clientY - lastTouch.y);
			}
			else
			{
				self.updatePosition(touch.clientX, touch.clientY, touch.clientX - lastTouch.x, touch.clientY - lastTouch.y);
			}

			lastTouch.set(touch.clientX, touch.clientY);
		}]);
	}
	//Input
	else
	{
		//Move event
		this.events.push([window, "mousemove", function(event)
		{
			if(self.canvas !== null)
			{
				var rect = self.canvas.getBoundingClientRect();
				self.updatePosition(event.clientX - rect.left, event.clientY - rect.top, event.movementX, event.movementY);
			}
			else
			{
				self.updatePosition(event.clientX, event.clientY, event.movementX, event.movementY);
			}
		}]);

		//Button pressed event
		this.events.push([window, "mousedown", function(event)
		{
			self.updateKey(event.which - 1, Key.DOWN);
		}]);

		//Button released event
		this.events.push([window, "mouseup", function(event)
		{
			self.updateKey(event.which - 1, Key.UP);
		}]);
	}

	//Mouse double click
	this.events.push([window, "dblclick", function(event)
	{
		self._doubleClicked[event.which - 1] = true;
	}]);

	//Initialize events
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].addEventListener(event[1], event[2]);
	}
}

Mouse.prototype = Mouse;
Mouse.prototype.constructor = Mouse;


/**
 * Left mouse button.
 *
 * @attribute LEFT
 * @type {number}
 */
Mouse.LEFT = 0;

/**
 * Middle mouse button.
 *
 * @attribute MIDDLE
 * @type {number}
 */
Mouse.MIDDLE = 1;

/**
 * Right mouse button.
 *
 * @attribute RIGHT
 * @type {number}
 */
Mouse.RIGHT = 2;

/**
 * Back mouse navigation button.
 *
 * @attribute BACK
 * @type {number}
 */
Mouse.BACK = 3;

/**
 * Forward mouse navigation button.
 *
 * @attribute FORWARD
 * @type {number}
 */
Mouse.FORWARD = 4;

/**
 * Element to be used for coordinates calculation relative to that canvas.
 * 
 * @method setCanvas
 * @param {Element} canvas Canvas to be attached to the Mouse instance
 */
Mouse.prototype.setCanvas = function(canvas)
{
	this.canvas = canvas;

	canvas.mouseInside = false;

	canvas.addEventListener("mouseenter", function()
	{
		this.mouseInside = true;
	});

	canvas.addEventListener("mouseleave", function()
	{
		this.mouseInside = false;
	});
};

/**
 * Check if mouse is inside attached canvas (updated async).
 * 
 * @method insideCanvas
 * @return {boolean} True if mouse is currently inside the canvas
 */
Mouse.prototype.insideCanvas = function()
{
	if(this.canvas === null)
	{
		return false;
	}
	
	return this.canvas.mouseInside;
};

/**
 * Set mouse lock, if true mouse lock will be request, if false the mouse will be released.
 * 
 * @method setLock
 * @param {boolean} value If true pointer lock will be requested for the canvas attached to the Mouse instance
 */
Mouse.prototype.setLock = function(value)
{
	if(this.canvas !== null)
	{
		if(value)
		{
			this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock || this.canvas.webkitRequestPointerLock;
			if(this.canvas.requestPointerLock !== undefined)
			{
				this.canvas.requestPointerLock();
			}
		}
		else
		{
			if(document.exitPointerLock !== undefined)
			{
				document.exitPointerLock();
			}
			else if(document.mozExitPointerLock !== undefined)
			{
				document.mozExitPointerLock();
			}
			else if(document.webkitExitPointerLock !== undefined)
			{
				document.webkitExitPointerLock();
			}
		}
	}
};

/**
 * Check if mouse button is currently pressed.
 * 
 * @method buttonPressed
 * @param {number} button Button to check status of
 * @return {boolean} True if button is currently pressed
 */
Mouse.prototype.buttonPressed = function(button)
{
	return this.keys[button].pressed;
};

/**
 * Check if Mouse button was double clicked.
 * 
 * @method buttonDoubleClicked
 * @param {number} button Button to check status of
 * @return {boolean} True if some mouse button was just double clicked
 */
Mouse.prototype.buttonDoubleClicked = function()
{
	return this.doubleClicked;
};

/**
 * Check if a mouse button was just pressed.
 * 
 * @method buttonJustPressed
 * @param {number} button Button to check status of
 * @return {boolean} True if button was just pressed
 */
Mouse.prototype.buttonJustPressed = function(button)
{
	return this.keys[button].justPressed;
};

/**
 * Check if a mouse button was just released.
 * 
 * @method buttonJustReleased
 * @param {number} button Button to check status of
 * @return {boolean} True if button was just released
 */
Mouse.prototype.buttonJustReleased = function(button)
{
	return this.keys[button].justReleased;
};

/**
 * Update mouse position.
 * 
 * @method updatePosition
 * @param {number} x
 * @param {number} y
 * @param {number} xDiff
 * @param {number} yDiff
 */
Mouse.prototype.updatePosition = function(x, y, xDiff, yDiff)
{
	this._position.set(x, y);
	this._delta.x += xDiff;
	this._delta.y += yDiff;
	this._positionUpdated = true;
};

/**
 * Update a mouse button.
 *
 * @method updateKey
 * @param {number} button
 * @param {number} action
 */
Mouse.prototype.updateKey = function(button, action)
{
	if(button > -1)
	{
		this._keys[button].update(action);
	}
};

/**
 * Update mouse buttons state, position, wheel and delta synchronously.
 * 
 * @method update
 */
Mouse.prototype.update = function()
{
	//Update mouse keys state
	for(var i = 0; i < this._keys.length; i++)
	{
		if(this._keys[i].justPressed && this.keys[i].justPressed)
		{
			this._keys[i].justPressed = false;
		}
		if(this._keys[i].justReleased && this.keys[i].justReleased)
		{
			this._keys[i].justReleased = false;
		}
		this.keys[i].set(this._keys[i].justPressed, this._keys[i].pressed, this._keys[i].justReleased);
	}

	//Update mouse wheel
	if(this._wheelUpdated)
	{
		this.wheel = this._wheel;
		this._wheelUpdated = false;
	}
	else
	{
		this.wheel = 0;
	}

	//Update mouse double click
	if(this._doubleClicked)
	{
		this.doubleClicked = true;
		this._doubleClicked = false;
	}
	else
	{
		this.doubleClicked = false;
	}

	//Update mouse Position if needed
	if(this._positionUpdated)
	{
		this.delta.x = this._delta.x;
		this.delta.y = this._delta.y;
		this._delta.set(0,0);

		this.position.x = this._position.x;
		this.position.y = this._position.y;

		this._positionUpdated = false;
	}
	else
	{
		this.delta.x = 0;
		this.delta.y = 0;
	}
};

/**
 * Dispose mouse events.
 * 
 * @method dispose
 */
Mouse.prototype.dispose = function()
{
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].removeEventListener(event[1], event[2]);
	}
};

var VERSION = "V1.2";

export { Gamepad, Key, Keyboard, Mouse, VERSION, Vector2 };
//# sourceMappingURL=syncinput.module.js.map
