import { Keyboard, Mouse, Gamepad, Keys, Touch, GamepadButton, MouseButton } from "../source/main";

// Create canvas element
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fps = document.getElementById("fps") as HTMLCanvasElement;

document.body.onresize = function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// Create keyboard and mouse input objects
const keyboard = new Keyboard();
const mouse = new Mouse();
const gamepad = new Gamepad();
const touch = new Touch();

let t = performance.now();

// Frame rate control
let deviceRefreshRate: boolean = true;
let refreshRate: number = 60;

//Logic update and render loop
function loop()
{
    // Update peformance metrics
    const now = performance.now();
    const delta = now - t;
    t = now;
    
    // Display FPS
    fps.innerText =  Math.round(1000 / delta) + ' fps';

    // Update input handlers
    keyboard.update();
    mouse.update();
    gamepad.update();
    touch.update();

    // Logic and render
    update();
    render();

    // Next frame
    if (deviceRefreshRate) {
        requestAnimationFrame(loop);
    } else {
        setTimeout(loop, 1000 / refreshRate);
    }

}

function update() {

    if(keyboard.keyPressed(Keys.LEFT) || gamepad.buttonPressed(GamepadButton.LEFT))
    {
        console.log('derp')
    }
    if(keyboard.keyPressed(Keys.RIGHT) || gamepad.buttonPressed(GamepadButton.RIGHT))
    {
    }
    if(keyboard.keyPressed(Keys.UP) || gamepad.buttonPressed(GamepadButton.UP))
    {

    }
    if(keyboard.keyPressed(Keys.DOWN) || gamepad.buttonPressed(GamepadButton.DOWN))
    {

    }

    if (touch.touchJustPressed(0)) {
        console.log('Just pressed 0');
    }
    if (touch.touchPressed(0)) {
        console.log('Pressed 0');
    }
    if (touch.touchJustReleased(0)) {
        console.log('Just released 0');
    }


    if(mouse.buttonPressed(MouseButton.LEFT))
    {

    }

    if(mouse.buttonDoubleClicked())
    {

    }

    let tpt = touch.pan(2);
    if(tpt) {
        console.log('Touch pan 2', tpt);
    }

    tpt = touch.pan(3);
    if(tpt) {
        console.log('Touch pan 3', tpt);
    }
}

function render() {

}

//Call update loop
loop();