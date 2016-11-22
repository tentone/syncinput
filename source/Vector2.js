"use strict";

SyncInput.Vector2 = function(x, y)
{
	this.x = (x !== undefined) ? x : 0;
	this.y = (y !== undefined) ? y : 0;
}

SyncInput.Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
}
