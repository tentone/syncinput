/**
 * Vector 2 represents pairs of X and Y values. Use to represent all bidimensional variables.
 *
 * Mouse position, acceleration use this object type.
 *
 * @class Vector2
 * @constructor
 * @param {number} x X coordinate.
 * @param {number} x Y coordinate.
 */
function Vector2(x, y)
{
	this.x = (x !== undefined) ? x : 0;
	this.y = (y !== undefined) ? y : 0;
}

/**
 * Set the value of the vector.
 *
 * @method set
 * @param {number} x X coordinate.
 * @param {number} x Y coordinate.
 */
Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
}

export {Vector2};