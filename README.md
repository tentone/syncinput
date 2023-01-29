![alt tag](https://raw.githubusercontent.com/tentone/syncinput/master/readme/logo.png)

[![GitHub version](https://badge.fury.io/gh/tentone%2Fsyncinput.svg)](https://badge.fury.io/gh/tentone%2Fsyncinput)[![npm version](https://badge.fury.io/js/syncinput.svg)](https://badge.fury.io/js/syncinput)

- Synchronous keyboard, mouse and gamepad input for fixed step applications.
- Browser events fire at a different rate than your application logic/render code.- This library allow to access input state for variable frame rate scenarios.
- Skip the need to process out of sync browser callbacks.
- Multi-browser support, compatible with mobile devices and and touchscreen events.
- Currently supports input from: Mouse, Keyboard, Gamepad, Touchscreen
- Detailed API docs available on the docs folder of the project.

### Download
 - For direct usage in the browser get the [minified (9kb)](https://raw.githubusercontent.com/tentone/syncinput/master/build/syncinput.min.js) version or as a module [module (28kb)](https://raw.githubusercontent.com/tentone/syncinput/master/build/syncinput.module.js).
 - Get from NPM using ` npm install syncinput --save-prod`



### Example

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

### Mouse

- `position {x, y}` -Actual mouse position
- `delta {x, y}` - Mouse delta since last time update() was called
- `wheel` - Mouse wheel value

- `update()` - Update mouse status (should be called every time after app logic update)
- `buttonPressed(button)` - Check if mouse button is pressed (touchscreen tap same as left click)
- `buttonJustPressed(button)` - Check if mouse button was just pressed
- `buttonJustReleased(button)` - Check if mouse button was just released
- `setCanvas(canvas)` - Attach canvas to mouse object for position coordinated to be calculated relatively to the canvas.
- `insideCanvas()` - Check if mouse is inside attached canvas
- `setLock(value)` - Set mouse lock on/off.

### Keyboard

- `update()` - Update keyboard status (should be called every time after app logic update)
- `keyPressed(button)` - Check if key is currently pressed
- `keyJustPressed(button)` - Check if key was just pressed
- `keyJustReleased(button)` - Check if key was just released
- `reset()` - Reset all keys

### Gamepad

- `update()` - Update gamepad status
- `buttonPressed(button)` - Check if gamepad button is pressed
- `buttonJustPressed(button)` - Check if gamepad button was just pressed
- `buttonJustReleased(button)` - Check if gamepad button was just released
