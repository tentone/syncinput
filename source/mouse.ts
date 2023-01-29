import {Vector2} from './vector2';
import {EventManager} from './event-manager';
import {Button, ButtonAction} from './button';

/**
 * Contains the list of mouse buttons available.
 */
export class MouseButton {
	/**
	 * Left mouse button.
	 */
	public static LEFT = 0;

	/**
	 * Middle mouse button.
	 */
	public static MIDDLE = 1;

	/**
	 * Right mouse button.
	 */
	public static RIGHT = 2;

	/**
	 * Back mouse navigation button.
	 */
	public static BACK = 3;

	/**
	 * Forward mouse navigation button.
	 */
	public static FORWARD = 4;
}

/**
 * Mouse instance for input in sync with the running 3D application.
 *
 * The mouse object provided by scripts is automatically updated by the runtime handler.
 */
export class Mouse {
	/**
	 * Indicates if the mouse position changed mid-frames.
	 */
	public positionUpdated: boolean = false;

	/**
	 * Indicates if the wheel position changed mid-frames.
	 */
	public wheelUpdated: boolean = false;

	/**
	 * Array with mouse buttons status.
	 */
	public keys: Button[] = new Array(5);

	/**
	 * Mouse position inside the window (coordinates in window space).
	 */
	public position: Vector2 = new Vector2(0, 0);

	/**
	 * Mouse scroll wheel movement.
	 */
	public wheel: number = 0;

	/**
	 * Mouse movement (coordinates in window space).
	 */
	public delta: Vector2 = new Vector2(0, 0);

	/**
	 * Indicates if some button of the mouse was just double-clicked.
	 */
	public doubleClicked: boolean = false;

	/**
	 * DOM element where to attach the mouse events.
	 */
	public domElement: HTMLElement | Window = null;

	/**
	 * Canvas attached to this mouse instance used to calculate position and delta in canvas space coordinates.
	 */
	public canvas: HTMLCanvasElement = null;

	/**
	 * Event manager used to manage the mouse events.
	 */
	public events: EventManager = null;

	private tempDoubleClicked: boolean = false;

	private tempWheel: number = 0;

	private tempDelta: Vector2 = new Vector2(0, 0);

	private tempKeys: Button[] = new Array(5);

	private tempPosition: Vector2 = new Vector2(0, 0);

	/**
	 * Constructor for the mouse handler.
	 * 
	 * @param element - Optional HTML element to attach the mouse tracking events. By default the "window" object is used.
	 */
	public constructor(element?: HTMLElement) {

		this.domElement = element !== undefined ? element : window;

		this.events = new EventManager();

		// Initialize key instances
		for (let i = 0; i < 5; i++) {
			this.tempKeys[i] = new Button();
			this.keys[i] = new Button();
		}


	}

	/**
	 * Create mouse handler events.
	 */
	public initialize() {
		// Self pointer
		const self = this;

		// Scroll wheel
		// @ts-ignore
		if (window.onmousewheel !== undefined) {
			// Chrome, edge
			this.events.add(this.domElement, 'mousewheel', function(event: WheelEvent) {
				self.tempWheel = event.deltaY;
				self.wheelUpdated = true;
				event.preventDefault();
			});
		} else if (window.addEventListener !== undefined) {
			// Firefox
			this.events.add(this.domElement, 'DOMMouseScroll', function(event: MouseEvent) {
				self.tempWheel = event.detail * 30;
				self.wheelUpdated = true;
				event.preventDefault();
			});
		} else {
			this.events.add(this.domElement, 'wheel', function(event: WheelEvent) {
				self.tempWheel = event.deltaY;
				self.wheelUpdated = true;
				event.preventDefault();
			});
		}

		// Touchscreen input events
		// @ts-ignore
		if ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) {
			// Auxiliary variables to calculate touch delta
			const lastTouch = new Vector2(0, 0);

			// Touch start event
			this.events.add(this.domElement, 'touchstart', function(event: TouchEvent) {
				const touch = event.touches[0];

				self.updatePosition(touch.screenX, touch.screenY, 0, 0);
				self.updateKey(MouseButton.LEFT, ButtonAction.DOWN);

				lastTouch.set(touch.screenX, touch.screenY);
			});

			// Touch end event
			this.events.add(this.domElement, 'touchend', function(event: TouchEvent) {
				self.updateKey(MouseButton.LEFT, ButtonAction.UP);
			});

			// Touch cancel event
			this.events.add(this.domElement, 'touchcancel', function(event: TouchEvent) {
				self.updateKey(MouseButton.LEFT, ButtonAction.UP);
			});

			// Touch move event
			this.events.add(document.body, 'touchmove', function(event: TouchEvent) {
				const touch = event.touches[0];

				self.updatePosition(touch.screenX, touch.screenY, touch.screenX - lastTouch.x, touch.screenY - lastTouch.y);

				lastTouch.set(touch.screenX, touch.screenY);
			});
		}

		// Move
		this.events.add(this.domElement, 'mousemove', function(event: MouseEvent) {
			self.updatePosition(event.offsetX, event.offsetY, event.movementX, event.movementY);
		});

		// Button pressed
		this.events.add(this.domElement, 'mousedown', function(event: MouseEvent) {
			self.updateKey(event.which - 1, ButtonAction.DOWN);
		});

		// Button released
		this.events.add(this.domElement, 'mouseup', function(event: MouseEvent) {
			self.updateKey(event.which - 1, ButtonAction.UP);
		});

		this.events.add(this.domElement, 'mouseleave', function(event: MouseEvent) {
			self.updateKey(event.which - 1, ButtonAction.UP);
		});

		// Drag start
		this.events.add(this.domElement, 'dragstart', function(event: MouseEvent) {
			self.updateKey(event.which - 1, ButtonAction.UP);
		});

		// Mouse double click
		this.events.add(this.domElement, 'dblclick', function(event: Event) {
			self.tempDoubleClicked = true;
		});

		this.events.create();
	}


	/**
	 * Canvas to be used for coordinates calculation relative to that canvas.
	 */
	public setCanvas(canvas: HTMLCanvasElement): void {
		this.canvas = canvas;

		// @ts-ignore
		canvas.mouseInside = false;

		canvas.addEventListener('mouseenter', function(event: MouseEvent) {
			// @ts-ignore
			this.mouseInside = true;
		});

		canvas.addEventListener('mouseleave', function(event: MouseEvent) {
			// @ts-ignore
			this.mouseInside = false;
		});
	}

	/**
	 * Check if mouse is inside attached canvas (updated async).
	 */
	public insideCanvas(): boolean {
		if (this.canvas === null) {
			return false;
		}
		
		// @ts-ignore
		return this.canvas.mouseInside;
	}

	/**
	 * Set mouse lock state.
	 * 
	 * When the mouse gets locked into a element is can no longer move around.
	 * 
	 * Usefull for games and application that require delta mouse movement (e.g. FPS camera)
	 * 
	 * @param value - Define if the lock should be active or disable.
	 */
	public setLock(value: boolean): void {
		if (this.canvas !== null) {
			if (value) {
				if (this.canvas.requestPointerLock) {
					this.canvas.requestPointerLock();
					// @ts-ignore
				} else if (this.canvas.mozRequestPointerLock) {
					// @ts-ignore
					this.canvas.mozRequestPointerLock();
					// @ts-ignore
				} else if (this.canvas.webkitRequestPointerLock) {
					// @ts-ignore
					this.canvas.webkitRequestPointerLock();
				}
			} else {
				if (document.exitPointerLock) {
					document.exitPointerLock();
					// @ts-ignore
				} else if (document.mozExitPointerLock) {
					// @ts-ignore
					document.mozExitPointerLock();
					// @ts-ignore
				} else if (document.webkitExitPointerLock) {
					// @ts-ignore
					document.webkitExitPointerLock();
				}
			}
		}
	}

	/**
	 * Check if mouse button is currently pressed.
	 */
	public buttonPressed(button: number): boolean {
		return this.keys[button].pressed;
	}

	/**
	 * Check if Mouse button was double-clicked.
	 */
	public buttonDoubleClicked(): boolean {
		return this.doubleClicked;
	}

	/**
	 * Check if a mouse button was just pressed.
	 * 
	 * @param button - Button to check the state of.
	 */
	public buttonJustPressed(button: number): boolean {
		return this.keys[button].justPressed;
	}

	/**
	 * Check if a mouse button was just released.
	 * 
	 * @param button - Button to check the state of.
	 */
	public buttonJustReleased(button: number): boolean {
		return this.keys[button].justReleased;
	}

	/**
	 * Update mouse position.
	 */
	public updatePosition(x: number, y: number, xDiff: number, yDiff: number): void {
		this.tempPosition.set(x, y);
		this.tempDelta.x += xDiff;
		this.tempDelta.y += yDiff;
		this.positionUpdated = true;
	}

	/**
	 * Update a mouse button.
	 */
	public updateKey(button: number, action: number): void {
		if (button > -1) {
			this.tempKeys[button].update(action);
		}
	}

	/**
	 * Update mouse buttons state, position, wheel and delta synchronously.
	 * 
	 * Should be called every frame before reading values from the mouse.
	 */
	public update(): void {
		// Update mouse keys state
		for (let i = 0; i < this.tempKeys.length; i++) {
			if (this.tempKeys[i].justPressed && this.keys[i].justPressed) {
				this.tempKeys[i].justPressed = false;
			}
			if (this.tempKeys[i].justReleased && this.keys[i].justReleased) {
				this.tempKeys[i].justReleased = false;
			}
			this.keys[i].set(this.tempKeys[i].justPressed, this.tempKeys[i].pressed, this.tempKeys[i].justReleased);
		}

		// Update mouse wheel
		if (this.wheelUpdated) {
			this.wheel = this.tempWheel;
			this.wheelUpdated = false;
		} else {
			this.wheel = 0;
		}

		// Update mouse double click
		if (this.tempDoubleClicked) {
			this.doubleClicked = true;
			this.tempDoubleClicked = false;
		} else {
			this.doubleClicked = false;
		}

		// Update mouse Position if needed
		if (this.positionUpdated) {
			this.delta.copy(this.tempDelta);
			this.position.copy(this.tempPosition);

			this.tempDelta.set(0, 0);
			this.positionUpdated = false;
		} else {
			this.delta.x = 0;
			this.delta.y = 0;
		}
	}

	/**
	 * Dispose mouse events.
	 */
	public dispose(): void {
		this.events.destroy();
	}
}
