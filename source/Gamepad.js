"use strict";

function Gamepad()
{
	var index = Gamepad.gamepads.length;

	this.setGamepad(navigator.getGamepads()[(index !== undefined) ? index : 0]);

	Gamepad.gamepads.push(this);
}

Gamepad.prototype.setGamepad = function(gamepad)
{	
	if(gamepad !== undefined)
	{
		this.index = gamepad.index;
		this.buttons = [];

		for(var i = 0; i < gamepad.buttons.length; i++)
		{
			this.buttons.push(new Key());
		}
	}
	else
	{
		this.index = 0;
		this.buttons = [];
	}
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
		console.log("connected", event);
		var gamepad = event.gamepad;

		for(var i = 0; i < Gamepad.gamepads.length; i++)
		{
			if(Gamepad.gamepads[i].index === gamepad.index)
			{
				Gamepad.gamepads[i].setGamepad(gamepad);

			}
		}
	});

	window.addEventListener("gamepaddisconnected", function(event)
	{
		console.log("disonnected", event);
		//TODO <CHECK IF THE GAMEPAD DISCONNECTED IS IN USE>
	});
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