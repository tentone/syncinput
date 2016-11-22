"use strict";

SyncInput.Keyboard = function()
{
	this.keys = [];
	this.actions = [];

	//Initialize Keys
	for(var i = 0; i < 256; i++)
	{
		this.keys.push(new SyncInput.Key());
	}

	//Events
	this.events = [];

	//Actions pointer
	var actions = this.actions;

	//Key down
	this.events.push([window, "keydown", function(event)
	{
		actions.push(event.keyCode);
		actions.push(SyncInput.Key.KEY_DOWN);
	}]);

	//Key up
	this.events.push([window, "keyup", function(event)
	{
		actions.push(event.keyCode);
		actions.push(SyncInput.Key.KEY_UP);
	}]);

	//Initialize events
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].addEventListener(event[1], event[2]);
	}
}

//Update key flags syncronously
SyncInput.Keyboard.prototype.update = function()
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
			this.actions.push(SyncInput.Key.KEY_RESET);
			end += 2;
		}
	}
}

//Reset keyboard status
SyncInput.Keyboard.prototype.reset = function()
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
SyncInput.Keyboard.prototype.keyPressed = function(key)
{
	return this.keys[key].isPressed;
}

//Check is a key as just pressed
SyncInput.Keyboard.prototype.keyJustPressed = function(key)
{
	return this.keys[key].justPressed;
}

//Check if a key was just released
SyncInput.Keyboard.prototype.keyJustReleased = function(key)
{
	return this.keys[key].justReleased;
}

//Dispose keyboard events
SyncInput.Keyboard.prototype.dispose = function()
{
	for(var i = 0; i < this.events.length; i++)
	{
		var event = this.events[i];
		event[0].removeEventListener(event[1], event[2]);
	}
}

//Key codes
SyncInput.Keyboard.TAB = 9;
SyncInput.Keyboard.ENTER = 13;
SyncInput.Keyboard.SHIFT = 16;
SyncInput.Keyboard.CTRL = 17;
SyncInput.Keyboard.ALT = 18;
SyncInput.Keyboard.CAPS_LOCK = 20;
SyncInput.Keyboard.ESC = 27;
SyncInput.Keyboard.SPACEBAR = 32;
SyncInput.Keyboard.PAGE_UP = 33;
SyncInput.Keyboard.PAGE_DOWN = 34;
SyncInput.Keyboard.END = 35;
SyncInput.Keyboard.HOME = 36;
SyncInput.Keyboard.INSERT = 45;
SyncInput.Keyboard.DEL = 46;

SyncInput.Keyboard.LEFT = 37;
SyncInput.Keyboard.RIGHT = 39;
SyncInput.Keyboard.UP = 38;
SyncInput.Keyboard.DOWN = 40;

SyncInput.Keyboard.NUM0 = 48;
SyncInput.Keyboard.NUM1 = 49;
SyncInput.Keyboard.NUM2 = 50;
SyncInput.Keyboard.NUM3 = 51;
SyncInput.Keyboard.NUM4 = 52;
SyncInput.Keyboard.NUM5 = 53;
SyncInput.Keyboard.NUM6 = 54;
SyncInput.Keyboard.NUM7 = 55;
SyncInput.Keyboard.NUM8 = 56;
SyncInput.Keyboard.NUM9 = 57;

SyncInput.Keyboard.A = 65;
SyncInput.Keyboard.B = 66;
SyncInput.Keyboard.C = 67;
SyncInput.Keyboard.D = 68;
SyncInput.Keyboard.E = 69;
SyncInput.Keyboard.F = 70;
SyncInput.Keyboard.G = 71;
SyncInput.Keyboard.H = 72;
SyncInput.Keyboard.I = 73;
SyncInput.Keyboard.J = 74;
SyncInput.Keyboard.K = 75;
SyncInput.Keyboard.L = 76;
SyncInput.Keyboard.M = 77;
SyncInput.Keyboard.N = 78;
SyncInput.Keyboard.O = 79;
SyncInput.Keyboard.P = 80;
SyncInput.Keyboard.Q = 81;
SyncInput.Keyboard.R = 82;
SyncInput.Keyboard.S = 83;
SyncInput.Keyboard.T = 84;
SyncInput.Keyboard.U = 85;
SyncInput.Keyboard.V = 86;
SyncInput.Keyboard.W = 87;
SyncInput.Keyboard.X = 88;
SyncInput.Keyboard.Y = 89;
SyncInput.Keyboard.Z = 90;

SyncInput.Keyboard.F1 = 112;
SyncInput.Keyboard.F2 = 113;
SyncInput.Keyboard.F3 = 114;
SyncInput.Keyboard.F4 = 115;
SyncInput.Keyboard.F5 = 116;
SyncInput.Keyboard.F6 = 117;
SyncInput.Keyboard.F7 = 118;
SyncInput.Keyboard.F8 = 119;
SyncInput.Keyboard.F9 = 120;
SyncInput.Keyboard.F10 = 121;
SyncInput.Keyboard.F11 = 122;
SyncInput.Keyboard.F12 = 123;