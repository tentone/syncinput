import { Keyboard, Mouse, Gamepad, Keys, Touch, GamepadButton, MouseButton } from "../source/main";

// Create canvas element
var canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fps = document.getElementById("fps") as HTMLCanvasElement;

document.body.onresize = function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// Create keyboard and mouse input objects
var keyboard = new Keyboard();
var mouse = new Mouse();
var gamepad = new Gamepad();
var touch = new Touch();

//Call update loop
update();

var t = performance.now();

//Logic update and render loop
function update()
{
    requestAnimationFrame(update);

    keyboard.update();
    mouse.update();
    gamepad.update();
    touch.update();

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
    if (touch.touchJustPressed(1)) {
        console.log('Just pressed 1');
    }

    if (touch.touchPressed(0)) {
        console.log('Pressed 0');
    }

    if (touch.touchJustReleased(0)) {
        console.log('Just released 0');
    }

    if (touch.touchJustReleased(1)) {
        console.log('Just released 1');
    }


    if(mouse.buttonPressed(MouseButton.LEFT))
    {

    }

    if(mouse.buttonDoubleClicked())
    {

    }

    // Update peformance metrics
    const now = performance.now();
    const delta = now - t;
    t = now;

    fps.innerText =  Math.round(1000 / delta) + ' fps';
}
