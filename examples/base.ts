import {Keyboard, Mouse, Gamepad, Touch} from '../source/main';

// Base for example implementation
export abstract class ExampleBase 
{
	/**
	 * Canvas element for rendering.
	 */
	public canvas: HTMLCanvasElement = null;

	/**
	 * Display element for the current frames per second.
	 */
	public fps: HTMLElement = null;

	/**
	 * Keyboard input object.
	 */
	public keyboard = new Keyboard();

	/**
	 * Mouse input object.
	 */
	public mouse = new Mouse();

	/**
	 * Gamepad input object.
	 */
	public gamepad = new Gamepad();

	/**
	 * Touch input object.
	 */
	public touch = new Touch();

	/** 
	 * Frame rate control flag.
	 * 
	 * If set to true the frame rate is controlled by the device refresh rate.
	 */
	public deviceRefreshRate: boolean = true;

	/**
	 * Frame rate of the game loop.
	 */
	public refreshRate: number = 15;

	/**
	 * Time of the last frame.
	 */
	public t: number = 0;

	/**
	 * Running flag.
	 */
	public running: boolean = false;

	public init(): void 
	{
		// Create canvas element
		this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.fps = document.getElementById('fps');

		const vsync = document.getElementById('vsync') as HTMLInputElement;
		vsync.defaultChecked = this.deviceRefreshRate;
		vsync.onchange = (event) => 
		{
			this.deviceRefreshRate = vsync.checked;
		};

		const rate = document.getElementById('rate') as HTMLInputElement;
		rate.value = String(this.refreshRate);
		rate.onchange = (event) => 
		{
			this.refreshRate = Number.parseInt(rate.value);
		};

		document.body.onresize = () =>
		{
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		};
	}

	/**
	 * Start the running loop.
	 */
	public start(): void 
	{
		this.init();

		this.t = performance.now();
		this.running = true;

		this.loop();
	}

	// Logic update and render loop
	public loop(): void
	{
		// Update peformance metrics
		const now = performance.now();
		const delta = now - this.t;
		this.t = now;
        
		// Display FPS
		this.fps.innerText = Math.round(1000 / delta) + ' fps';

		// Update input handlers
		this.keyboard.update();
		this.mouse.update();
		this.gamepad.update();
		this.touch.update();

		// Logic and render
		this.update(delta);
		this.render();

		// Next frame
		if (this.running) 
		{
			if (this.deviceRefreshRate) 
			{
				requestAnimationFrame(() => {this.loop();});
			}
			else 
			{
				setTimeout(() => {this.loop();}, 1000 / this.refreshRate);
			}
		}
	}

	public dispose(): void
	{
		this.running = false;
	}

	public update(delta: number): void {}

	public render(): void {}
}
