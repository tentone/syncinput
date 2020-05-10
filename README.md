![alt tag](https://raw.githubusercontent.com/tentone/syncinput/master/readme/logo.png)

[![GitHub version](https://badge.fury.io/gh/tentone%2Fsyncinput.svg)](https://badge.fury.io/gh/tentone%2Fsyncinput)[![npm version](https://badge.fury.io/js/syncinput.svg)](https://badge.fury.io/js/syncinput)

- Synchronous keyboard, mouse and gamepad input for fixed step applications.
  - Browser events fire faster than your application logic/render code.
  - This library prevents usage of complex logic or repeated code execution in these scenarios.
- Access input from devices at the same speed for your application without the need to process out of sync browser callbacks.
- Multi browser support, compatible with mobile devices and and touchscreen events.



### Download
 - For direct usage in the browser get the [minified (9kb)](https://raw.githubusercontent.com/tentone/syncinput/master/build/syncinput.min.js) version or as a module [module (28kb)](https://raw.githubusercontent.com/tentone/syncinput/master/build/syncinput.module.js).
 - Get from NPM using ` npm install syncinput --save-prod`



### Example

- Example of simple app with three.js
  - <https://tentone.github.io/syncinput/example/>
  - Keyboard arrows or d-pad to move the cube, mouse to rotate the cube, double click to change color
- Here is a small code example showing the basic functionality of the library.

```javascript
//Initialization
mouse = new SyncInput.Mouse();
keyboard = new SyncInput.Keyboard();

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



### Documentation

- Detailed API docs available on the docs folder of the project.

  

##### Mouse

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

##### Keyboard

- `update()` - Update keyboard status (should be called every time after app logic update)
- `keyPressed(button)` - Check if key is currently pressed
- `keyJustPressed(button)` - Check if key was just pressed
- `keyJustReleased(button)` - Check if key was just released
- `reset()` - Reset all keys

##### Gamepad

- `update()` - Update gamepad status
- `buttonPressed(button)` - Check if gamepad button is pressed
- `buttonJustPressed(button)` - Check if gamepad button was just pressed
- `buttonJustReleased(button)` - Check if gamepad button was just released



### Changelog

##### V1.2

- Published on NPM.
- Added API documentation.
- Support for double click detection on all mouse buttons.

##### V1.1

- Support for Gamepad (Using the Gamepad API)
- Moved all events to the window object
- Added dispose method

##### V1.0

- First release

