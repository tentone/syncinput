import {EventManager} from '../../../../utils/event-manager';
import {Button} from './button';

/**
 * Keyboard instance for input in sync with the running 3D application.
 *
 * The keyboard object provided by scripts is automatically updated by the runtime handler.
 */
export class Keyboard {
	/**
	 * Keys pressed.
	 */
	public keys: any[] = [];

	/**
	 * Key press actions. Key actions are stored in pairs.
	 *
	 * The size of the actions array is expected to be even.
	 */
	public actions: any[] = [];

	/**
	 * DOM element where the keyboard events are attached.
	 */
	public domElement: HTMLElement | Window = null;

	/**
	 * Event manager object to create and manage the key press events.
	 */
	public events: EventManager = null;

	public constructor(element?: HTMLElement) {
		this.keys = new Array(256);
		this.actions = [];

		this.domElement = element ? element : window;

		// Initialize Keys
		for (let i = 0; i < 256; i++) {
			this.keys[i] = new Button();
		}

		// Events
		this.events = new EventManager();

		// Actions pointer
		const actions = this.actions;
		const self = this;

		// Key down
		this.events.add(this.domElement, 'keydown', function(event) {
			actions.push(event.keyCode);
			actions.push(Button.DOWN);
		});

		// Key up
		this.events.add(this.domElement, 'keyup', function(event) {
			actions.push(event.keyCode);
			actions.push(Button.UP);
		});

		// Reset
		this.events.add(this.domElement, 'focus', function(event) {
			self.reset();
		});

		// Initialize events
		this.events.create();
	}

	/**
	 * Update key flags synchronously.
	 */
	public update(): void {
		let end = 0;

		while (this.actions.length > end) {
			const key = this.actions.shift();
			const action = this.actions.shift();

			this.keys[key].update(action);

			if (this.keys[key].justReleased || this.keys[key].justPressed) {
				this.actions.push(key);
				this.actions.push(Button.RESET);
				end += 2;
			}
		}
	}

	/**
	 * Reset keyboard status to default.
	 *
	 * Does not clean the action list.
	 */
	public reset(): void {
		// Reset all keys
		for (let i = 0; i < this.keys.length; i++) {
			this.keys[i].reset();
		}
	}

	/**
	 * Check if a key is pressed.
	 */
	public keyPressed(key: number): boolean {
		return this.keys[key].pressed;
	}

	/**
	 * Check is a key as just pressed.
	 */
	public keyJustPressed(key: number): boolean {
		return this.keys[key].justPressed;
	}

	/**
	 * Check if a key was just released.
	 */
	public keyJustReleased(key: number): boolean {
		return this.keys[key].justReleased;
	}

	/**
	 * Dispose keyboard events.
	 */
	public dispose(): void {
		this.events.destroy();
	}
}