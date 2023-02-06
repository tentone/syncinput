import { Keys, GamepadButton, MouseButton } from "../source/main";
import { ExampleBase } from "./example-base";

class Example extends ExampleBase {
    public update(delta: number): void {
        if(this.keyboard.keyPressed(Keys.LEFT) || this.gamepad.buttonPressed(GamepadButton.LEFT))
        {
            console.log('derp')
        }
        if(this.keyboard.keyPressed(Keys.RIGHT) || this.gamepad.buttonPressed(GamepadButton.RIGHT))
        {
        }
        if(this.keyboard.keyPressed(Keys.UP) || this.gamepad.buttonPressed(GamepadButton.UP))
        {
    
        }
        if(this.keyboard.keyPressed(Keys.DOWN) || this.gamepad.buttonPressed(GamepadButton.DOWN))
        {
    
        }
    
        if (this.touch.touchJustPressed(0)) {
            console.log('Just pressed 0');
        }
        if (this.touch.touchPressed(0)) {
            console.log('Pressed 0');
        }
        if (this.touch.touchJustReleased(0)) {
            console.log('Just released 0');
        }
    
    
        if(this.mouse.buttonPressed(MouseButton.LEFT))
        {
            console.log('Button pressed left')
        }
    
        if(this.mouse.buttonDoubleClicked())
        {
    
        }
    
        let tpt = this.touch.pan(2);
        if(tpt) {
            console.log('Touch pan 2', tpt);
        }
    
        tpt = this.touch.pan(3);
        if(tpt) {
            console.log('Touch pan 3', tpt);
        }

        var pinch = this.touch.pinchZoom();
        if(pinch) {
            console.log('Pinch to zoom', pinch);
        }
    }
}

new Example().init();