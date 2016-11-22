"use strict";

SyncInput.Key = function()
{
	this.isPressed = false;
	this.justPressed = false;
	this.justReleased = false;
}

//Action List
SyncInput.Key.KEY_DOWN = -1;
SyncInput.Key.KEY_UP = 1;
SyncInput.Key.KEY_RESET = 0;

//Update key status based new state
SyncInput.Key.prototype.update = function(action)
{
	this.justPressed = false;
	this.justReleased = false;

	if(action === SyncInput.Key.KEY_DOWN)
	{
		if(!this.isPressed)
		{
			this.justPressed = true;
		}
		this.isPressed = true;
	}
	else if(action === SyncInput.Key.KEY_UP)
	{
		if(this.isPressed)
		{
			this.justReleased = true;
		}
		this.isPressed = false;
	}
	else if(action === SyncInput.Key.KEY_RESET)
	{
		this.justReleased = false;
		this.justPressed = false;
	}
}

//Set key status
SyncInput.Key.prototype.set = function(just_pressed, is_pressed, just_released)
{
	this.justPressed = just_pressed;
	this.isPressed = is_pressed;
	this.justReleased = just_released;
}

//Reset key to default values
SyncInput.Key.prototype.reset = function()
{
	this.justPressed = false;
	this.isPressed = false;
	this.justReleased = false;
}
