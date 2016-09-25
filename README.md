![alt tag](https://raw.githubusercontent.com/tentone/syncinput/master/example/logo.png)

### Sync Input V1.0

### Download
 - [normal](https://raw.githubusercontent.com/tentone/syncinput/master/build/syncinput.js)
 - [minified](https://raw.githubusercontent.com/tentone/syncinput/master/build/syncinput.min.js)

### Features
 - Syncronous keyboard and mouse input
 - Mouse delta and scroll wheel
 - Multi browser support
 - Compatible with mobile and touchscreen

### To do
 - Gamepad API support
 - WebVR support (Vive controller)

### Documentation
 - Mouse
	- update
		- Update mouse status (should be called every time after app logic update)
	
	Variables
	- position {x, y}
		- Actual mouse position
	- delta {x, y}
		- Mouse delta since last time update() was called
	- wheel
		- Mouse wheel value

	Buttons
	- Mouse.LEFT
	- Mouse.MIDDLE
	- Mouse.RIGHT

	Methods
	- buttonPressed(button)
		- Check if mouse button is pressed (touchscreen tap same as left click)
	- buttonJustPressed(button)
		- Check if mouse button was just pressed
	- buttonJustReleased(button)
		- Check if mouse button was just released
	- setCanvas(canvas)
		- Attach canvas to mouse object for position coordinated to be calculated relatively
	- insideCanvas()
		- Check if mouse is inside attached canvas
	- setLock(value)
		-Set mouse lock

 - Keyboard
	Methods
	- update
		- Update mouse status (should be called every time after app logic update)
	- keyPressed(button)
		- Check if key is currently pressed
	- keyJustPressed(button)
		- Check if key was just pressed
	- keyJustReleased(button)
		- Check if key was just released
	- reset
		- Reset all keys

	Arrow keys
	- Keyboard.LEFT
	- Keyboard.RIGHT
	- Keyboard.UP
	- Keyboard.DOWN

	Numbers
	- Keyboard.NUM0
	- Keyboard.NUM1
	- Keyboard.NUM2
	- Keyboard.NUM3
	- Keyboard.NUM4
	- Keyboard.NUM5
	- Keyboard.NUM6
	- Keyboard.NUM7
	- Keyboard.NUM8
	- Keyboard.NUM9

	Chars
	- Keyboard.A
	- Keyboard.B
	- Keyboard.C
	- Keyboard.D
	- Keyboard.E
	- Keyboard.F
	- Keyboard.G
	- Keyboard.H
	- Keyboard.I
	- Keyboard.J
	- Keyboard.K
	- Keyboard.L
	- Keyboard.M
	- Keyboard.N
	- Keyboard.O
	- Keyboard.P
	- Keyboard.Q
	- Keyboard.R
	- Keyboard.S
	- Keyboard.T
	- Keyboard.U
	- Keyboard.V
	- Keyboard.W
	- Keyboard.X
	- Keyboard.Y
	- Keyboard.Z

	Function keys
	- Keyboard.F1
	- Keyboard.F2
	- Keyboard.F3
	- Keyboard.F4
	- Keyboard.F5
	- Keyboard.F6
	- Keyboard.F7
	- Keyboard.F8
	- Keyboard.F9
	- Keyboard.F10
	- Keyboard.F11
	- Keyboard.F12

	Others
	- Keyboard.BACKSPACE
	- Keyboard.TAB
	- Keyboard.ENTER
	- Keyboard.SHIFT
	- Keyboard.CTRL
	- Keyboard.ALT
	- Keyboard.CAPS_LOCK
	- Keyboard.ESC
	- Keyboard.SPACEBAR
	- Keyboard.PAGE_UP
	- Keyboard.PAGE_DOWN
	- Keyboard.END
	- Keyboard.HOME
	- Keyboard.INSERT
	- Keyboard.DEL

### Example

    //Initialization
    mouse = new Mouse();
    keyboard = new Keyboard();
    
    [...]
    
    //Loop
    mouse.update();
    keyboard.update();
    
    console.log("Position X:" mouse.position.x + " Y:" + mouse.position.y);
    console.log("Delta X:" mouse.delta.x + " Y:" + mouse.delta.y);
    console.log("Scroll wheel:" mouse.wheel);
    
    if(mouse.buttonPressed(Mouse.LEFT))
    {
    	console.log("Mouse left is pressed");
    }
    
    if(keyboard.keyPressed(Keyboard.W))
    {
    	console.log("W is pressed");
    }
    if(keyboard.keyJustPressed(Keyboard.W))
    {
    	console.log("W was just pressed");
    }
    if(keyboard.keyJustReleased(Keyboard.W))
    {
    	console.log("W was just released");
    }

