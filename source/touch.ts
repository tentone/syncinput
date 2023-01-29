import {Vector2} from './vector2';
import {EventManager} from './event-manager';
import { Button } from './button';

/**
 * Touch point represents a point in the screen.
 */
export class TouchPoint extends Button {
	/**
	 * Position of the touch point.
	 */
	public position: Vector2 = new Vector2();

	/**
	 * Velocity that the point is moving.
	 */
	public delta: Vector2 = new Vector2();

	/**
	 * Pressure of the touch point.
	 */
	public pressure: number = null;
}

/**
 * Stores temporary data of the touch point.
 * 
 * Temporary data is accumlated of calls between frames.
 */
class TouchPointTempData {
	/**
	 * Indicates if the touch point is currently pressed.
	 */
	public pressed: boolean = false;

	/**
	 * Current position of the touch point.
	 */
	public position: Vector2 = new Vector2();

	/**
	 * Last position of the point in the previous frame.
	 */
	public lastPosition: Vector2 = new Vector2();

	/**
	 * Pressure of the touch point.
	 */
	public pressure: number = null;
}

/**
 * Touch handler input is used to handle touch events.
 *
 * Each touch point
 */
export class Touch {
	/**
	 * Touch points, these are created as required by the touch handler.
	 */
	public touch: TouchPoint[] = [];

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

	public constructor(element?: HTMLElement) {

		this.domElement = element !== undefined ? element : window;

		this.events = new EventManager();

		// Touchscreen input events
		// @ts-ignore
		if ('ontouchstart' in window) {

			// Touch start event
			this.events.add(this.domElement, 'touchstart', (event: TouchEvent) => {
				// TODO <REMOVE THIS>
				console.log('SyncInput: Touch start event', event);
				
				for (let i = 0; i < event.touches.length; i++) {
					const touch = event.touches[i];
					
					// self.updatePosition(touch.screenX, touch.screenY, 0, 0);
					// self.updateKey(Touch.LEFT, Key.DOWN);
				}
			});

			// Touch end event
			this.events.add(this.domElement, 'touchend', (event: TouchEvent) => {
				// TODO <REMOVE THIS>
				console.log('SyncInput: Touch end event', event);
				
				// self.updateKey(Touch.LEFT, Key.UP);
			});

			// Touch cancel event
			this.events.add(this.domElement, 'touchcancel', (event: TouchEvent) => {

				// TODO <REMOVE THIS>
				console.log('SyncInput: Touch cancel event', event);

				// self.updateKey(Touch.LEFT, Key.UP);
			});

			// Touch move event
			this.events.add(document.body, 'touchmove', (event: TouchEvent) => {

				// TODO <REMOVE THIS>
				console.log('SyncInput: Touch move event', event);

				for (let i = 0; i < event.touches.length; i++) {
					const touch = event.touches[i];

					// self.updatePosition(touch.screenX, touch.screenY, touch.screenX - lastTouch.x, touch.screenY - lastTouch.y);

					
				}

			});
		}

		this.events.create();
	}

	/**
	 * Update touch input state, position and delta synchronously.
	 */
	public updatePoint(idx: number, action: number, pressure: number = 0): void {
		if(!this.temp[idx]) {
			this.temp[idx] = new TouchPointTempData();
		}

		this.touch[idx].update(action);
		this.touch[idx].pressure = pressure;
		// TODO <ADD CODE HERE>
	}

	/**
	 * Update the touch handler, should be called every frame before reading values.
	 */
	public update() {
		for (let i = 0; i < this.temp.length; i++) {
			if(!this.touch[i]) {
				this.touch[i] = new TouchPoint();
			}
			
			
		}
	}

	/**
	 * Check if touch button is currently pressed.
	 */
	public touchPressed(idx: number): boolean {
		return this.touch[idx].pressed
	}

	/**
	 * Check if a touch button was just pressed.
	 */
	public touchJustPressed(idx: number): boolean {
		return this.touch[idx].justPressed;
	}

	/**
	 * Check if a touch button was just released.
	 */
	public touchJustReleased(idx: number): boolean {
		return this.touch[idx].justReleased;
	}



	/**
	 * Dispose touch events.
	 *
	 * Should be called after the touch handler is no longer required.
	 */
	public dispose(): void {
		this.events.destroy();
	}
}

