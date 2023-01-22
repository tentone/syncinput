import {Vector2} from './vector2';
import {EventManager} from './event-manager';

/**
 * The current state of each touch point handler.
 */
export enum TouchPointState {
	NONE = -1,
	PRESSED = 1,
	JUST_PRESSED = 2,
	JUST_RELEASED = 3,
}

/**
 * Touch point represents a point in the screen.
 */
export class TouchPoint {
	/**
	 * State of the point
	 */
	public state: TouchPointState = TouchPointState.NONE;

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
	 * DOM element where to attach the touch events.
	 */
	public domElement: HTMLElement | Window = null;

	/**
	 * Canvas attached to this touch instance used to calculate position and delta in canvas space coordinates.
	 */
	public canvas: HTMLCanvasElement = null;

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
			// Auxiliary variables to calculate touch delta
			const lastTouch = new Vector2(0, 0);

			// Touch start event
			this.events.add(this.domElement, 'touchstart', (event: TouchEvent) => {
				// TODO <REMOVE THIS>
				console.log('EQS: Touch start event', event);
				
				for (let i = 0; i < event.touches.length; i++) {
					const touch = event.touches[i];

					// self.updatePosition(touch.screenX, touch.screenY, 0, 0);
					// self.updateKey(Touch.LEFT, Key.DOWN);

					lastTouch.set(touch.screenX, touch.screenY);
				}
			});

			// Touch end event
			this.events.add(this.domElement, 'touchend', (event: TouchEvent) => {
				// TODO <REMOVE THIS>
				console.log('EQS: Touch end event', event);
				
				// self.updateKey(Touch.LEFT, Key.UP);
			});

			// Touch cancel event
			this.events.add(this.domElement, 'touchcancel', (event: TouchEvent) => {

				// TODO <REMOVE THIS>
				console.log('EQS: Touch cancel event', event);

				// self.updateKey(Touch.LEFT, Key.UP);
			});

			// Touch move event
			this.events.add(document.body, 'touchmove', (event: TouchEvent) => {

				// TODO <REMOVE THIS>
				console.log('EQS: Touch move event', event);

				for (let i = 0; i < event.touches.length; i++) {
					const touch = event.touches[i];

					// self.updatePosition(touch.screenX, touch.screenY, touch.screenX - lastTouch.x, touch.screenY - lastTouch.y);

					lastTouch.set(touch.screenX, touch.screenY);
				}

			});
		}

		this.events.create();
	}

	/**
	 * Check if touch button is currently pressed.
	 */
	public touchPressed(idx: number): boolean {
		return false; // this.keys[idx].pressed;
	}

	/**
	 * Check if a touch button was just pressed.
	 */
	public touchJustPressed(idx: number): boolean {
		return false; // this.keys[idx].justPressed;
	}

	/**
	 * Check if a touch button was just released.
	 */
	public touchJustReleased(idx: number): boolean {
		return false; // this.keys[idx].justReleased;
	}

	/**
	 * Update touch input state, position and delta synchronously.
	 */
	public update(): void {

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

