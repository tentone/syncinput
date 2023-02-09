import {Keyboard, Mouse, Gamepad, Touch} from '../source/main';

// Base for example implementation
export abstract class ExampleBase 
{
	public canvas: HTMLCanvasElement = null;

	public fps: HTMLElement = null;

	// Create keyboard and mouse input objects
	public keyboard = new Keyboard();

	public mouse = new Mouse();

	public gamepad = new Gamepad();

	public touch = new Touch();

	// Frame rate control
	public deviceRefreshRate: boolean = true;

	public refreshRate: number = 15;

	// Time
	public t: number = 0;

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
		vsync.onchange = (event) => {
			console.log(event, vsync);
			this.deviceRefreshRate = vsync.checked;
		};

		const rate = document.getElementById('rate') as HTMLInputElement;
		rate.value = String(this.refreshRate);
		rate.onchange = (event) => {
			console.log(event, rate);
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
	public start(): void {
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
