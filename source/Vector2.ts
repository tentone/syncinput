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
export class Vector2
{
	/**
	 * X component of the vector.
	 */
	public x: number; 

	/**
	 * Y component of the vector.
	 */
	public y: number;

	/**
	 * Constructor for a new Vector2 object.
	 *
	 * @param {number} x X coordinate.
	 * @param {number} x Y coordinate.
	 */
	constructor(x: number = 0, y: number = 0) {
 		this.x = x;
		this.y = y;
	}

	/**
	 * Set the value of the vector.
	 *
	 * @param {number} x X coordinate.
	 * @param {number} x Y coordinate.
	 */
	public set(x: number, y: number): void
	{
		this.x = x;
		this.y = y;
	}
}

