"use strict";

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

	//Canvas (use to calculate coordinates relative to it)
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
		});
	}
	else if(document.addEventListener !== undefined)
	{
		//Firefox
		document.addEventListener("DOMMouseScroll", function(event)
		{
			self._wheel = event.detail * 30;
			self._wheel_updated = true;
		});
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
		window.addEventListener("touchstart", function(event)
		{
			var touch = event.touches[0];
			last_touch.set(touch.clientX, touch.clientY);
			self.updateKey(Mouse.LEFT, Key.KEY_DOWN);
		});

		//Touch screen released event
		window.addEventListener("touchend", function(event)
		{
			self.updateKey(Mouse.LEFT, Key.KEY_UP);
		});

		//Touch screen move event
		window.addEventListener("touchmove", function(event)
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
		window.addEventListener("mousemove", function(event)
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
		});

		//Button pressed event
		window.addEventListener("mousedown", function(event)
		{
			self.updateKey(event.which - 1, Key.KEY_DOWN);
		});

		//Button released event
		window.addEventListener("mouseup", function(event)
		{
			self.updateKey(event.which - 1, Key.KEY_UP);
		});
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
	});

	canvas.addEventListener("mouseleave", function()
	{
		this.mouseInside = false;
	});
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

//Dispose mouse object
Mouse.prototype.dispose = function()
{
	//TODO <DESTROY EVENT HANDLERS>

	/*if(this.canvas !== null)
	{
		//TODO <DESTROY CANVAS EVENT HANDLERS>
	}*/
}
