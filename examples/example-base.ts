import { Keyboard, Mouse, Gamepad, Keys, Touch, GamepadButton, MouseButton } from "../source/main";

// Base for example implementation
export class ExampleBase {
    public canvas: HTMLCanvasElement = null;

    public fps: HTMLElement = null;

    // Create keyboard and mouse input objects
    public keyboard = new Keyboard();
    public mouse = new Mouse();
    public gamepad = new Gamepad();
    public touch = new Touch();

    // Frame rate control
    public deviceRefreshRate: boolean = true;
    public refreshRate: number = 60;

    // Time
    public t: number = 0;

    public init(): void {
        // Create canvas element
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.fps = document.getElementById("fps");

        document.body.onresize = () =>
        {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };

        this.t = performance.now();
    }

    //Logic update and render loop
    public loop(): void
    {
        // Update peformance metrics
        const now = performance.now();
        const delta = now - this.t;
        this.t = now;
        
        // Display FPS
        this.fps.innerText =  Math.round(1000 / delta) + ' fps';

        // Update input handlers
        this.keyboard.update();
        this.mouse.update();
        this.gamepad.update();
        this.touch.update();

        // Logic and render
        this.update(delta);
        this.render();

        // Next frame
        if (this.deviceRefreshRate) {
            requestAnimationFrame(this.loop);
        } else {
            setTimeout(this.loop, 1000 / this.refreshRate);
        }
    }

    public update(delta: number): void {

    }

    public render(): void {
        
    }
}
