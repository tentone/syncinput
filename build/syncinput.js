//tentone | https://github.com/tentone

"use strict";

function Vector2(x, y)
{
	this.x = (x !== undefined) ? x : 0;
	this.y = (y !== undefined) ? y : 0;
}

//Set value
Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
}

function Key()
{
	this.isPressed = false;
	this.justPressed = false;
	this.justReleased = false;
}

//Action List
Key.KEY_DOWN = -1;
Key.KEY_UP = 1;
Key.KEY_RESET = 0;

//Update Key status based new state
Key.prototype.update = function(action)
{
	this.justPressed = false;
	this.justReleased = false;

	if(action === Key.KEY_DOWN)
	{
		if(this.isPressed ===  false)
		{
			this.justPressed = true;
		}
		this.isPressed = true;
	}
	else if(action === Key.KEY_UP)
	{
		if(this.isPressed)
		{
			this.justReleased = true;
		}
		this.isPressed = false;
	}
	else if(action === Key.KEY_RESET)
	{
		this.justReleased = false;
		this.justPressed = false;
	}
}

//Set key status
Key.prototype.set = function(just_pressed, is_pressed, just_released)
{
	this.justPressed = just_pressed;
	this.isPressed = is_pressed;
	this.justReleased = just_released;
}

//Reset key to default values
Key.prototype.reset = function()
{
	this.justPressed = false;
	this.isPressed = false;
	this.justReleased = false;
}

function Mouse()
{
	//Raw data
	this._keys = [];
	this._position = new Vector2(0,0);
	this._position_updated = false;
	this._delta = new Vector2(0,0);
	this._wheel = 0;
	this._wheel_updated = false;

	//Position, delta, and scroll speed
	this.keys = [];
	this.position = new Vector2(0,0);
	this.delta = new Vector2(0,0);
	this.wheel = 0;

	//Calculate coordinates relative to canvas
	this.canvas = null;

	//Initialize key instances
	for(var i = 0; i < 3; i++)
	{
		this._keys.push(new Key());
		this.keys.push(new Key());
	}

	//Self pointer
	var self = this;

	//Scroll wheel
	if(document.onmousewheel !== undefined)
	{
		//Chrome, edge
		document.addEventListener("mousewheel", function(event)
		{
			self._wheel = event.deltaY;
			self._wheel_updated = true;
		}, false);
	}
	else if(document.addEventListener !== undefined)
	{
		//Firefox
		document.addEventListener("DOMMouseScroll", function(event)
		{
			self._wheel = event.detail * 30;
			self._wheel_updated = true;
		}, false);
	}
	else
	{
		document.onwheel = function(event)
		{
			self._wheel = event.deltaY;
			self._wheel_updated = true;
		};
	}

	//Touchscreen input
	if("ontouchstart" in window || navigator.msMaxTouchPoints > 0)
	{
		//Auxiliar variables to calculate touch delta
		var last_touch = new Vector2(0, 0);

		//Touch screen pressed event
		document.addEventListener("touchstart", function(event)
		{
			var touch = event.touches[0];
			last_touch.set(touch.clientX, touch.clientY);
			self.updateKey(Mouse.LEFT, Key.KEY_DOWN);
		}, false);

		//Touch screen released event
		document.addEventListener("touchend", function(event)
		{
			self.updateKey(Mouse.LEFT, Key.KEY_UP);
		}, false);

		//Touch screen move event
		document.addEventListener("touchmove", function(event)
		{
			var touch = event.touches[0];

			if(self.canvas !== null)
			{
				var rect = self.canvas.getBoundingClientRect();
				self.updatePosition(touch.clientX - rect.left, touch.clientY - rect.top, touch.clientX - last_touch.x, touch.clientY - last_touch.y);
			}
			else
			{
				self.updatePosition(touch.clientX, touch.clientY, touch.clientX - last_touch.x, touch.clientY - last_touch.y);
			}

			last_touch.set(touch.clientX, touch.clientY);
		}, false);
	}
	//Input
	else
	{
		//Move event
		document.addEventListener("mousemove", function(event)
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
		}, false);

		//Button pressed event
		document.addEventListener("mousedown", function(event)
		{
			self.updateKey(event.which - 1, Key.KEY_DOWN);
		}, false);

		//Button released event
		document.addEventListener("mouseup", function(event)
		{
			self.updateKey(event.which - 1, Key.KEY_UP);
		}, false);
	}
}

//Mouse Buttons
Mouse.LEFT = 0;
Mouse.MIDDLE = 1;
Mouse.RIGHT = 2;

//Canvas to be used for relative coordinates calculation
Mouse.prototype.setCanvas = function(canvas)
{
	this.canvas = canvas;

	canvas.mouseInside = false;

	canvas.addEventListener("mouseenter", function()
	{
		this.mouseInside = true;
	}, false);

	canvas.addEventListener("mouseleave", function()
	{
		this.mouseInside = false;
	}, false);
}

//Check if mouse is inside attached canvas
Mouse.prototype.insideCanvas = function()
{
	if(this.canvas === null)
	{
		return false;
	}
	
	return this.canvas.mouseInside;
}

//Set if mouse locked
Mouse.prototype.setLock = function(value)
{
	if(this.canvas !== null)
	{
		if(value)
		{
			if(this.canvas.requestPointerLock)
			{
				this.canvas.requestPointerLock();
			}
			else if(this.canvas.mozRequestPointerLock)
			{
				this.canvas.mozRequestPointerLock();
			}
			else if(this.canvas.webkitRequestPointerLock)
			{
				this.canvas.webkitRequestPointerLock();
			}
		}
		else
		{
			if(document.exitPointerLock)
			{
				document.exitPointerLock();
			}
			else if(document.mozExitPointerLock)
			{
				document.mozExitPointerLock();
			}
			else if(document.webkitExitPointerLock)
			{
				document.webkitExitPointerLock();
			}
		}
	}
}

//Check if Mouse button is pressed
Mouse.prototype.buttonPressed = function(button)
{
	return this.keys[button].isPressed;
}

//Check if a mouse button was just pressed
Mouse.prototype.buttonJustPressed = function(button)
{
	return this.keys[button].justPressed;
}

//Check if a mouse button was just released
Mouse.prototype.buttonJustReleased = function(button)
{
	return this.keys[button].justReleased;
}

//Update Mouse Position
Mouse.prototype.updatePosition = function(x, y, x_diff, y_diff)
{
	this._position.set(x, y);
	this._delta.x += x_diff;
	this._delta.y += y_diff;
	this._position_updated = true;
}

//Update Mouse Key
Mouse.prototype.updateKey = function(button, action)
{
	if(button > -1)
	{
		this._keys[button].update(action);
	}
}

//Update Mouse State (Calculate position diff)
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
		this.keys[i].set(this._keys[i].justPressed, this._keys[i].isPressed, this._keys[i].justReleased);
	}

	//Update mouse wheel
	if(this._wheel_updated)
	{
		this.wheel = this._wheel;
		this._wheel_updated = false;
	}
	else
	{
		this.wheel = 0;
	}

	//Update mouse Position if needed
	if(this._position_updated)
	{
		this.delta.x = this._delta.x;
		this.delta.y = this._delta.y;
		this._delta.set(0,0);

		this.position.x = this._position.x;
		this.position.y = this._position.y;

		this._position_updated = false;
	}
	else
	{
		this.delta.x = 0;
		this.delta.y = 0;
	}
}

function Keyboard()
{
	this.keys = [];
	this.actions = [];

	//Initialize Keys
	for(var i = 0; i < 256; i++)
	{
		this.keys.push(new Key());
	}

	var self = this;
	
	//Key down Event
	document.onkeydown = function(event)
	{
		self.actions.push(event.keyCode);
		self.actions.push(Key.KEY_DOWN);
	};

	//Key up Event
	document.onkeyup = function(event)
	{
		self.actions.push(event.keyCode);
		self.actions.push(Key.KEY_UP);
	};
}

//Update key flags syncronously
Keyboard.prototype.update = function()
{
	var end = 0;

	while(this.actions.length > end)
	{
		var key = this.actions.shift();
		var action = this.actions.shift();

		this.keys[key].update(action);

		if(this.keys[key].justReleased || this.keys[key].justPressed)
		{
			this.actions.push(key);
			this.actions.push(Key.KEY_RESET);
			end += 2;
		}
	}
}

//Reset keyboard status
Keyboard.prototype.reset = function()
{
	//Clear actions array
	this.actions = [];

	//Reset all keys
	for(var i = 0; i < this.keys.length; i++)
	{
		this.keys[i].reset();
	}
}

//Check if a key is pressed
Keyboard.prototype.keyPressed = function(key)
{
	return this.keys[key].isPressed;
}

//Check is a key as just pressed
Keyboard.prototype.keyJustPressed = function(key)
{
	return this.keys[key].justPressed;
}

//Check if a key was just released
Keyboard.prototype.keyJustReleased = function(key)
{
	return this.keys[key].justReleased;
}

//Some Keycodes
Keyboard.BACKSPACE = 8;
Keyboard.TAB = 9;
Keyboard.ENTER = 13;
Keyboard.SHIFT = 16;
Keyboard.CTRL = 17;
Keyboard.ALT = 18;
Keyboard.CAPS_LOCK = 20;
Keyboard.ESC = 27;
Keyboard.SPACEBAR = 32;
Keyboard.PAGE_UP = 33;
Keyboard.PAGE_DOWN = 34;
Keyboard.END = 35;
Keyboard.HOME = 36;
Keyboard.INSERT = 45;
Keyboard.DEL = 46;

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard.NUM0 = 48;
Keyboard.NUM1 = 49;
Keyboard.NUM2 = 50;
Keyboard.NUM3 = 51;
Keyboard.NUM4 = 52;
Keyboard.NUM5 = 53;
Keyboard.NUM6 = 54;
Keyboard.NUM7 = 55;
Keyboard.NUM8 = 56;
Keyboard.NUM9 = 57;

Keyboard.A = 65;
Keyboard.B = 66;
Keyboard.C = 67;
Keyboard.D = 68;
Keyboard.E = 69;
Keyboard.F = 70;
Keyboard.G = 71;
Keyboard.H = 72;
Keyboard.I = 73;
Keyboard.J = 74;
Keyboard.K = 75;
Keyboard.L = 76;
Keyboard.M = 77;
Keyboard.N = 78;
Keyboard.O = 79;
Keyboard.P = 80;
Keyboard.Q = 81;
Keyboard.R = 82;
Keyboard.S = 83;
Keyboard.T = 84;
Keyboard.U = 85;
Keyboard.V = 86;
Keyboard.W = 87;
Keyboard.X = 88;
Keyboard.Y = 89;
Keyboard.Z = 90;

Keyboard.F1 = 112;
Keyboard.F2 = 113;
Keyboard.F3 = 114;
Keyboard.F4 = 115;
Keyboard.F5 = 116;
Keyboard.F6 = 117;
Keyboard.F7 = 118;
Keyboard.F8 = 119;
Keyboard.F9 = 120;
Keyboard.F10 = 121;
Keyboard.F11 = 122;
Keyboard.F12 = 123;