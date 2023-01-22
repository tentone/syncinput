/**
 * Vector 2 represents pairs of X and Y values. Use to represent all bidimensional variables.
 *
 * Mouse position, acceleration use this object type.
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
	 * @param x - X coordinate.
	 * @param y - Y coordinate.
	 */
	constructor(x: number = 0, y: number = 0) {
 		this.x = x;
		this.y = y;
	}

	/**
	 * Set the value of the vector.
	 *
	 * @param x - X coordinate.
	 * @param y - Y coordinate.
	 */
	public set(x: number, y: number): void
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * Copy values from another vector to this one.
	 *
	 * @param vec - Vector to copy data from.
	 */
	public copy(vec: Vector2): void
	{
		this.set(vec.x, vec.y);
	}
}

