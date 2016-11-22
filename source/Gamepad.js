"use strict";

SyncInput.Gamepad = function()
{
	var index = SyncInput.Gamepad.gamepads.length;

	this.buttons = null;
	this.index = -1;

	this.vendor = -1;
	this.product = -1;
	this.connected = false;

	this.setGamepad(navigator.getGamepads()[(index !== undefined) ? index : 0]);

	SyncInput.Gamepad.gamepads.push(this);
}

//Set gamepad
SyncInput.Gamepad.prototype.setGamepad = function(gamepad)
{	
	if(gamepad !== undefined)
	{
		this.index = gamepad.index;

		//Create and initialize buttons
		this.buttons = [];
		for(var i = 0; i < gamepad.buttons.length; i++)
		{
			this.buttons.push(new SyncInput.Key());
		}

		//Try to get the device vendor and product id
		this.setProductVendor(gamepad);
		this.connected = true;
	}
	else
	{
		console.warn("SyncInput: No Gamepad found");

		this.vendor = -1;
		this.product = -1;
		this.connected = false;

		this.index = -1;
		this.buttons = [];
	}
}

//Set vendor and product id
SyncInput.Gamepad.prototype.setProductVendor = function(gamepad)
{
	//Chrome
	try
	{
		var temp = gamepad.id.split(":");

		this.vendor = temp[1].split(" ")[1];
		this.product = temp[2].replace(" ", "").replace(")", "");

		return;
	}
	catch(e){}

	//Firefox
	try
	{
		var temp = gamepad.id.split("-");

		this.vendor = temp[0];
		this.product = temp[1];

		return;
	}
	catch(e){}

	//Edge
	//TODO <ADD CODE HERE>
}

//Update key flags
SyncInput.Gamepad.prototype.update = function()
{
	var gamepad = navigator.getGamepads()[this.index];

	if(gamepad !== undefined)
	{
		for(var i = 0; i < this.buttons.length; i++)
		{
			this.buttons[i].update(gamepad.buttons[i].pressed ? Key.KEY_DOWN : Key.KEY_UP);
		}
	}
}

//Get analog button value [0...1]
SyncInput.Gamepad.prototype.getAnalogueButton = function(button)
{
	//TODO <ADD CODE HERE>
	return 0;
}

//Get axis value [-1...1]
SyncInput.Gamepad.prototype.getAxis = function(axis)
{
	//TODO <ADD CODE HERE>
	return 0;
}

//Check if a button is pressed
SyncInput.Gamepad.prototype.buttonPressed = function(button)
{
	return (button > this.buttons.length) ? false : this.buttons[button].isPressed;
}

//Check if a button was just pressed
SyncInput.Gamepad.prototype.buttonJustPressed = function(button)
{
	return (button > this.buttons.length) ? false : this.buttons[button].justPressed;
}

//Check if a button was just released
SyncInput.Gamepad.prototype.buttonJustReleased = function(button)
{
	return (button > this.buttons.length) ? false : this.buttons[button].justReleased;
}

//Dispose gamepad
SyncInput.Gamepad.prototype.dispose = function()
{
	var index = SyncInput.Gamepad.gamepads.indexOf(this);
	
	if(index !== -1)
	{
		SyncInput.Gamepad.gamepads.splice(index, 1);
	}
}

//Keep track of every gamepad object to disconnect and reconnect them on the fly
SyncInput.Gamepad.gamepads = [];

//Get all available gamepads
SyncInput.Gamepad.getGamepads = function()
{
	return navigator.getGamepads();
}

//Create and start gamepad listener
SyncInput.Gamepad.startListener = function()
{
	window.addEventListener("gamepadconnected", function(event)
	{
		var gamepad = event.gamepad;

		for(var i = 0; i < SyncInput.Gamepad.gamepads.length; i++)
		{
			if(SyncInput.Gamepad.gamepads[i].index === gamepad.index)
			{
				SyncInput.Gamepad.gamepads[i].setGamepad(gamepad);
			}
		}
	});

	//window.addEventListener("gamepaddisconnected", function(event){});
}

SyncInput.Gamepad.startListener();

//Standart button mapping
SyncInput.Gamepad.LEFT = 14;
SyncInput.Gamepad.RIGHT = 15;
SyncInput.Gamepad.DOWN = 13
SyncInput.Gamepad.UP = 12;

SyncInput.Gamepad.SELECT = 8;
SyncInput.Gamepad.START = 9;
SyncInput.Gamepad.HOME = 16;

SyncInput.Gamepad.LEFT_TRIGGER_A = 4;
SyncInput.Gamepad.LEFT_TRIGGER_B = 6;

SyncInput.Gamepad.RIGHT_TRIGGER_A = 5;
SyncInput.Gamepad.RIGHT_TRIGGER_B = 7;

SyncInput.Gamepad.A = 0;
SyncInput.Gamepad.B = 1;
SyncInput.Gamepad.C = 2;
SyncInput.Gamepad.D = 3;

//Standard axis
SyncInput.Gamepad.LEFT_ANALOGUE_HOR = 0;
SyncInput.Gamepad.LEFT_ANALOGUE_VERT = 1;
SyncInput.Gamepad.RIGHT_ANALOGUE_HOR = 2;
SyncInput.Gamepad.RIGHT_ANALOGUE_VERT = 3;