"use strict";

function Gamepad()
{
	this.index = -1;
	this.id = "";
	this.buttons = [];
	this.axes = [];
}

//Gamepad list
Gamepad.gamepads = [];

Gamepad.startListener = function()
{
	window.addEventListener("gamepadconnected", function(event)
	{
		var gamepad = event.gamepad;

		console.log("Gamepad connected at index " + gamepad.index + " id " + gamepad.id);
		console.log(gamepad.buttons);
		console.log(gamepad.axes);
	});

	window.addEventListener("gamepaddisconnected", function(event)
	{
		var gamepad = event.gamepad;

		console.log("Gamepad disconnected from index " + gamepad.index + " id " + gamepad.id);
	});
}

Gamepad.startListener();

//Get gamepads
Gamepad.getGamepads = function()
{
	return Gamepad.gamepads;
}

//Update key flags
Gamepad.prototype.update = function()
{
	var end = 0;

	while(this.actions.length > end)
	{
		var key = this.actions.shift();
		var action = this.actions.shift();

		//TODO <ADD CODE HERE>
	}
}

//Check if a key is pressed
Gamepad.prototype.buttonPressed = function(key)
{
	//TODO <ADD CODE HERE>
}
