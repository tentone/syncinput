import {Vector2} from './ceasd';
import {EventManager} from './event-manager';
import {Button, ButtonAction} from './button';
import {InputHandler} from './input-handler';

/**
 * Touch point represents a point in the screen.
 */
export class TouchPoint extends Button 
{
	/**
	 * Position of the touch point.
	 */
	public position: Vector2 = new Vector2();

	/**
	 * Velocity that the point is moving.
	 */
	public delta: Vector2 = new Vector2();

	/**
	 * First point touched when movement begins.
	 */
	public first: Vector2 = new Vector2();

	/**
	 * Radius of the touch point.
	 * 
	 * Defines an approximation of the touch area between the user and screen.
	 * 
	 * The orientation of the ellipse is defined by the "rotation" property.
	 */
	public radius: Vector2 = new Vector2();

	/**
	 * Pressure of the touch point. This value is between 0 and 1.
	 * 
	 * Only available on some devices.
	 */
	public force: number = 0;

	/**
	 * Rotation angle of the touch point in degrees, between 0 and 90.
	 * 
	 * Togheter with the radius of the touch point defines an ellipse that approximates the size and shape of the area of contact between the user and the screen.
	 * 
	 * Only available on some devices.
	 */
	public rotation: number = 0;
}

/**
 * Stores temporary data of the touch point.
 * 
 * Temporary data is accumulated of calls between frames.
 */
class TouchPointTempData 
{
	/**
	 * Indicates if the touch point is currently pressed.
	 */
	public action: number = ButtonAction.UP;

	/**
	 * First point touched when movement begins.
	 */
	public first: Vector2 = new Vector2();

	/**
	 * Current position of the touch point.
	 */
	public position: Vector2 = new Vector2();

	/**
	 * Last position of the point in the previous frame.
	 */
	public last: Vector2 = new Vector2();

	/**
	 * Pressure of the touch point.
	 */
	public force: number = 0;

	/**
	 * Radius of the touch point.
	 */
	public radius: Vector2 = new Vector2();

	/**
	 * Rotation angle of the touch point.
	 */
	public rotation: number = 0;
}

/**
 * Touch handler input is used to handle touch events.
 *
 * Each touch point
 */
export class Touch extends InputHandler 
{
	/**
	 * How many touch inputs to support in the handler.
	 */
	public maxPoints: number = 3;

	/**
	 * Touch points, these are created as required by the touch handler.
	 */
	public points: TouchPoint[] = [];

	/**
	 * Touch point temporary information stored between frames.
	 */
	private temp: TouchPointTempData[] = [];

	/**
	 * DOM element where to attach the touch events.
	 */
	public domElement: HTMLElement | Window = null;

	/**
	 * Event manager used for the touch inputs.
	 */
	public events: EventManager = null;

	/**
	 * Distance delta between two points in adjacent frames. 
	 */
	public pinch: number = null;

	public constructor(maxPoints: number = 3, element?: HTMLElement) 
	{
		super();

		this.domElement = element !== undefined ? element : window;
		this.maxPoints = maxPoints;

		this.points = new Array(this.maxPoints).fill(null).map(() => {return new TouchPoint();});
		this.temp = new Array(this.maxPoints).fill(null).map(() => {return new TouchPointTempData();});
		
		this.events = new EventManager();
		this.initialize();
		this.events.create();
	}

	/**
	 * Create touch handler events.
	 * 
	 * Events created are managed by the event manager instance.
	 */
	public initialize(): void 
	{
		// Touch start event
		this.events.add(this.domElement, 'touchstart', (event: TouchEvent) => 
		{
			for (let i = 0; i < event.changedTouches.length; i++) 
			{
				const touch = event.changedTouches[i];
				if (touch.identifier >= this.maxPoints) 
				{
					continue;
				}

				const point = new Vector2(touch.screenX, touch.screenY);

				this.temp[touch.identifier].first.copy(point);
				this.temp[touch.identifier].last.copy(point);

				this.updatePoint(touch.identifier, ButtonAction.DOWN, touch.force, touch.rotationAngle, point, new Vector2(touch.radiusX, touch.radiusY));
			}
		});

		// Touch end event
		this.events.add(this.domElement, 'touchend', (event: TouchEvent) => 
		{	
			for (let i = 0; i < event.changedTouches.length; i++) 
			{
				const touch = event.changedTouches[i];
				if (touch.identifier >= this.maxPoints) 
				{
					continue;
				}

				this.updatePoint(touch.identifier, ButtonAction.UP, touch.force, touch.rotationAngle, new Vector2(touch.screenX, touch.screenY), new Vector2(touch.radiusX, touch.radiusY));
			}
		});

		// Touch cancel event
		this.events.add(this.domElement, 'touchcancel', (event: TouchEvent) => 
		{
			for (let i = 0; i < event.changedTouches.length; i++) 
			{
				const touch = event.changedTouches[i];
				if (touch.identifier >= this.maxPoints) 
				{
					continue;
				}

				this.updatePoint(touch.identifier, ButtonAction.UP, touch.force, touch.rotationAngle, new Vector2(touch.screenX, touch.screenY), new Vector2(0, 0));
			}
		});

		// Touch move event
		this.events.add(document.body, 'touchmove', (event: TouchEvent) => 
		{
			for (let i = 0; i < event.changedTouches.length; i++) 
			{
				const touch = event.changedTouches[i];
				if (touch.identifier >= this.maxPoints) 
				{
					continue;
				}
				
				this.updatePoint(touch.identifier, ButtonAction.DOWN, touch.force, touch.rotationAngle, new Vector2(touch.screenX, touch.screenY), new Vector2(touch.radiusX, touch.radiusY));
			}
		});
	}

	/**
	 * Update touch input state, position and delta synchronously.
	 * 
	 * @param id - Identifier of the point to be updated.
	 * @param action - Action applied to the point.
	 * @param pressure - Touch pressure of the point.
	 * @param rotation - Rotation of the point.
	 */
	public updatePoint(id: number, action: number, pressure: number, rotation: number, position: Vector2, radius: Vector2): void 
	{
		this.temp[id].force = pressure;
		this.temp[id].rotation = rotation;
		this.temp[id].position.copy(position);
		this.temp[id].radius.copy(radius);
		this.temp[id].action = action;
	}

	/**
	 * Update the touch handler, should be called every frame before reading values.
	 */
	public update(): void 
	{
		let pinchDistance = null;
		if (this.points[0].pressed && this.points[1].pressed) 
		{
			pinchDistance = this.points[0].position.dist(this.points[1].position);
		}

		for (let i = 0; i < this.temp.length; i++) 
		{
			// Update touch point
			this.points[i].force = this.temp[i].force;
			this.points[i].rotation = this.temp[i].rotation;
			this.points[i].radius.copy(this.temp[i].radius);
			this.points[i].position.copy(this.temp[i].position);
			this.points[i].delta.set(this.temp[i].position.x - this.temp[i].last.x, this.temp[i].position.y - this.temp[i].last.y);
			this.points[i].update(this.temp[i].action);

			if (this.points[i].justPressed) 
			{
				this.points[i].first.copy(this.temp[i].first);
			}

			// Update temp
			this.temp[i].last.copy(this.temp[i].position);
		}
		
		// Calculate pinch to zoom action
		if (pinchDistance && this.points[0].pressed && this.points[1].pressed) 
		{
			this.pinch = this.points[0].position.dist(this.points[1].position) - pinchDistance;
		}
		else 
		{
			this.pinch = null;
		}
		
	}

	/**
	 * Check for multi touch pan movement.
	 * 
	 * Return null if there are no point available to calculate the movement.
	 * 
	 * @param points - Number of points to check for pan.
	 * @returns the position and delta of the pan group.
	 */
	public pan(fingers: number): {position: Vector2, delta: Vector2} 
	{
		let position = new Vector2();
		let delta = new Vector2();

		// How many touch points found
		let found = 0;

		for (let i = 0; i < this.points.length; i++) 
		{
			if (this.points[i].pressed) 
			{
				position.add(this.points[i].position);
				delta.add(this.points[i].delta);
				found++;
			}
		}

		if (found === fingers) 
		{
			position.divScalar(fingers);
			delta.divScalar(fingers);
			return {position: position, delta: delta};
		}

		return null;
	}

	/**
	 * Pinch to zoom actions.
	 * 
	 * @returns The two finger pinch values.
	 */
	public pinchZoom(): number 
	{
		return this.pinch;
	}

	/**
	 * Check if touch button is currently pressed.
	 * 
	 * @param idx - Index of the touch point.
	 * @returns True if the point is currently pressed. 
	 */
	public touchPressed(idx: number): boolean 
	{
		return this.points[idx].pressed;
	}

	/**
	 * Check if a touch button was just pressed.
	 * 
	 * @param idx - Index of the touch point.
	 * @returns True if the point has just been pressed. 
	 */
	public touchJustPressed(idx: number): boolean 
	{
		return this.points[idx].justPressed;
	}

	/**
	 * Check if a touch button was just released.
	 * 
	 * @param idx - Index of the touch point.
	 * @returns True if the point has just released. 
	 */
	public touchJustReleased(idx: number): boolean 
	{
		return this.points[idx].justReleased;
	}

	/**
	 * Dispose touch events.
	 *
	 * Should be called after the touch handler is no longer required.
	 */
	public dispose(): void 
	{
		this.events.destroy();
	}
}
