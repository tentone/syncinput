"use strict";

function Gamepad()
{
	var index = Gamepad.gamepads.length;

	this.vendor = -1;
	this.product = -1;

	this.connected = true;

	this.setGamepad(navigator.getGamepads()[(index !== undefined) ? index : 0]);

	Gamepad.gamepads.push(this);
}

Gamepad.prototype.setGamepad = function(gamepad)
{	
	console.log(gamepad);

	if(gamepad !== undefined)
	{
		this.index = gamepad.index;

		//Create and initialize buttons
		this.buttons = [];
		for(var i = 0; i < gamepad.buttons.length; i++)
		{
			this.buttons.push(new Key());
		}

		//Try to get the device vendor and product id
		this.setVendorProduct(gamepad);
	}
	else
	{
		this.index = 0;
		this.buttons = [];
	}
}

//Set vendor and product id
Gamepad.prototype.setVendorProduct = function(gamepad)
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

	//Edge (Only Xbox controllers)
	//TODO <ADD CODE HERE>
}

//Update key flags
Gamepad.prototype.update = function()
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
Gamepad.prototype.getAnalogueButton = function(button)
{
	//TODO <ADD CODE HERE>
	return 0;
}

//Get axis value [-1...1]
Gamepad.prototype.getAxis = function(axis)
{
	//TODO <ADD CODE HERE>
	return 0;
}

//Check if a button is pressed
Gamepad.prototype.buttonPressed = function(button)
{
	return (button > this.buttons.length) ? false : this.buttons[button].isPressed;
}

//Check if a button was just pressed
Gamepad.prototype.buttonJustPressed = function(button)
{
	return (button > this.buttons.length) ? false : this.buttons[button].justPressed;
}

//Check if a button was just released
Gamepad.prototype.buttonJustReleased = function(button)
{
	return (button > this.buttons.length) ? false : this.buttons[button].justReleased;
}

//Dispose gamepad
Gamepad.prototype.dispose = function()
{
	var index = Gamepad.gamepads.indexOf(this);
	
	if(index !== -1)
	{
		Gamepad.gamepads.splice(index, 1);
	}
}

//Keep track of every gamepad object to disconnect and reconnect them on the fly
Gamepad.gamepads = [];

//Get all available gamepads
Gamepad.getGamepads = function()
{
	return navigator.getGamepads();
}

//Create and start gamepad listener
Gamepad.startListener = function()
{
	window.addEventListener("gamepadconnected", function(event)
	{
		var gamepad = event.gamepad;

		for(var i = 0; i < Gamepad.gamepads.length; i++)
		{
			if(Gamepad.gamepads[i].index === gamepad.index)
			{
				Gamepad.gamepads[i].setGamepad(gamepad);
			}
		}
	});

	//window.addEventListener("gamepaddisconnected", function(event){});
}

Gamepad.startListener();

//Standart button mapping
Gamepad.LEFT = 14;
Gamepad.RIGHT = 15;
Gamepad.DOWN = 13
Gamepad.UP = 12;

Gamepad.SELECT = 8;
Gamepad.START = 9;
Gamepad.HOME = 16;

Gamepad.LEFT_TRIGGER_A = 4;
Gamepad.LEFT_TRIGGER_B = 6;

Gamepad.RIGHT_TRIGGER_A = 5;
Gamepad.RIGHT_TRIGGER_B = 7;

Gamepad.A = 0;
Gamepad.B = 1;
Gamepad.C = 2;
Gamepad.D = 3;

//Standard axis
Gamepad.LEFT_ANALOGUE_HOR = 0;
Gamepad.LEFT_ANALOGUE_VERT = 1;
Gamepad.RIGHT_ANALOGUE_HOR = 2;
Gamepad.RIGHT_ANALOGUE_VERT = 3;