"use strict";

function Key()
{
	this.pressed = false;
	this.justPressed = false;
	this.justReleased = false;
}

//Action List
Key.DOWN = -1;
Key.UP = 1;
Key.RESET = 0;

//Update key status based new state
Key.prototype.update = function(action)
{
	this.justPressed = false;
	this.justReleased = false;

	if(action === Key.DOWN)
	{
		if(!this.pressed)
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
}

//Set key status
Key.prototype.set = function(justPressed, pressed, justReleased)
{
	this.pressed = pressed;
	this.justPressed = justPressed;
	this.justReleased = justReleased;
}

//Reset key to default values
Key.prototype.reset = function()
{
	this.pressed = false;
	this.justPressed = false;
	this.justReleased = false;
}
