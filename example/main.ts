import { Keyboard, Mouse, Gamepad, Keys } from "../source/main";

// Create canvas element
var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.top = "0px";
canvas.style.left = "0px";
document.body.appendChild(canvas);

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

//Logic update and render loop
function update()
{
    requestAnimationFrame(update);

    keyboard.update();
    mouse.update();
    gamepad.update(0);

    if(keyboard.keyPressed(Keys.LEFT) || gamepad.buttonPressed(Gamepad.LEFT))
    {
        // cube.position.x -= 0.1;
    }
    if(keyboard.keyPressed(Keys.RIGHT) || gamepad.buttonPressed(Gamepad.RIGHT))
    {
        // cube.position.x += 0.1;
    }
    if(keyboard.keyPressed(Keys.UP) || gamepad.buttonPressed(Gamepad.UP))
    {
        // cube.position.y += 0.1;
    }
    if(keyboard.keyPressed(Keys.DOWN) || gamepad.buttonPressed(Gamepad.DOWN))
    {
       //  cube.position.y -= 0.1;
    }

    if(mouse.buttonPressed(Mouse.LEFT))
    {
       //  cube.rotation.y += mouse.delta.x / 200;
    }

    if(mouse.buttonDoubleClicked())
    {
       //  cube.material.color.set(Math.ceil(Math.random()*0xFFFFFF));
    }
}
