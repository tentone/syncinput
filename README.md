![alt tag](https://raw.githubusercontent.com/tentone/syncinput/master/readme/logo.png)

[![GitHub version](https://badge.fury.io/gh/tentone%2Fsyncinput.svg)](https://badge.fury.io/gh/tentone%2Fsyncinput)[![npm version](https://badge.fury.io/js/syncinput.svg)](https://badge.fury.io/js/syncinput)

- Synchronous keyboard, mouse and gamepad input for fixed step applications.
- Multi-browser support, compatible with mobile devices and and touchscreen events.
- Currently supports input from: Mouse, Keyboard, Gamepad, Touchscreen
- Detailed API docs available on the docs folder of the project.
- [Demo of the library](https://tentone.github.io/syncinput/demo/) running from the examples directory.
- [TSDoc](https://tentone.github.io/syncinput/docs/) documentation available.

### Sync Events

- Browser events fire at a different rate than your application logic/render code.
- This library allow to access input state for variable frame rate scenarios.
- Skip the need to process out of sync browser callbacks.

![alt tag](https://raw.githubusercontent.com/tentone/syncinput/master/readme/timing.png)

### Getting Started
 - Get from NPM using ` npm install syncinput --save-prod`
 - Here is a small code example showing the basic functionality of the library.

```javascript
//Initialization
mouse = new Mouse();
keyboard = new Keyboard();

[...]

//Inside of the logic/rendering loop
mouse.update();
keyboard.update();

console.log("Position X:" mouse.position.x + " Y:" + mouse.position.y);
console.log("Delta X:" mouse.delta.x + " Y:" + mouse.delta.y);
console.log("Scroll wheel:" mouse.wheel);

if(mouse.buttonPressed(mouse.LEFT))
{
	console.log("Mouse left is pressed");
}

if(keyboard.keyPressed(keyboard.W))
{
	console.log("W is pressed");
}
if(keyboard.keyJustPressed(keyboard.W))
{
	console.log("W was just pressed");
}
if(keyboard.keyJustReleased(keyboard.W))
{
	console.log("W was just released");
}
```

#### Mouse

- `position {x, y}` -Actual mouse position
- `delta {x, y}` - Mouse delta since last time update() was called
- `wheel` - Mouse wheel value

- `buttonPressed(button)` - Check if mouse button is pressed (touchscreen tap same as left click)
- `buttonJustPressed(button)` - Check if mouse button was just pressed
- `buttonJustReleased(button)` - Check if mouse button was just released
- `setCanvas(canvas)` - Attach canvas to mouse object for position coordinated to be calculated relatively to the canvas.
- `insideCanvas()` - Check if mouse is inside attached canvas
- `setLock(value)` - Set mouse lock on/off.

#### Keyboard

- `keyPressed(button)` - Check if key is currently pressed
- `keyJustPressed(button)` - Check if key was just pressed
- `keyJustReleased(button)` - Check if key was just released
- `reset()` - Reset all keys

#### Gamepad

- `buttonPressed(button)` - Check if gamepad button is pressed
- `buttonJustPressed(button)` - Check if gamepad button was just pressed
- `buttonJustReleased(button)` - Check if gamepad button was just released


### Touch
- `points[]` - List of touch points and their respective status.
- `pan(points)` - Multi-touch pan
- `touchPressed(point)` - Check if touch point is pressed
- `touchJustPressed(point)` - Check if touch point was just pressed
- `touchJustReleased(point)` - Check if touch point was just released
