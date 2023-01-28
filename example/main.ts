import { Keyboard, Mouse, Gamepad, Keys } from "../source/main";

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

//Call update loop
update();

var t = performance.now();

//Logic update and render loop
function update()
{
    requestAnimationFrame(update);

    keyboard.update();
    mouse.update();
    gamepad.update(0);

    if(keyboard.keyPressed(Keys.LEFT) || gamepad.buttonPressed(Gamepad.LEFT))
    {
        console.log('derp')
    }
    if(keyboard.keyPressed(Keys.RIGHT) || gamepad.buttonPressed(Gamepad.RIGHT))
    {
    }
    if(keyboard.keyPressed(Keys.UP) || gamepad.buttonPressed(Gamepad.UP))
    {

    }
    if(keyboard.keyPressed(Keys.DOWN) || gamepad.buttonPressed(Gamepad.DOWN))
    {

    }

    if(mouse.buttonPressed(Mouse.LEFT))
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
