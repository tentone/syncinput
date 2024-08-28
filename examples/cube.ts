import { GamepadAxis } from '../source/gamepad-button';
import { GamepadHapticEffectType } from '../source/gamepad-haptic-effect';
import {Keys, GamepadButton, MouseButton} from '../source/main';
import {ExampleBase} from './base';
import {Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial, Object3D, Color, Float32BufferAttribute} from 'three';

class CubeExample extends ExampleBase 
{
	/**
	 * Scene object.
	 */
	public scene: Scene = new Scene();

	/**
	 * Camera object.
	 */
	public camera: PerspectiveCamera = new PerspectiveCamera(60, 1, 0.1, 1000);

	/**
	 * WebGL renderer.
	 */
	public renderer: WebGLRenderer;

	/**
	 * Cube object.
	 */
	public cube: Mesh;

	/**
	 * Generate random colors for each vertex of the cube.
	 */
	public cubeColor(): void 
	{
		// Generate random colors for each vertex
		const color = new Color();
		const colors = [];
		const positionAttribute = this.cube.geometry.getAttribute('position');
		for (let i = 0; i < positionAttribute.count; i += 6) 
		{
			color.setHex(0xffffff * Math.random());

			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);

			color.setHex(0xffffff * Math.random());
			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
		} 
		this.cube.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
	}

	public init(): void 
	{
		super.init();

		this.renderer = new WebGLRenderer({canvas: this.canvas});
		
		this.scene.background = new Color(0xFFFFFF);

		this.cube = new Mesh(new BoxGeometry(), new MeshBasicMaterial({vertexColors: true}));
		this.cubeColor();
  

		this.scene.add(this.cube);

		this.camera.position.set(0, 0, 3);

		document.body.onresize = () =>
		{
			const width = window.innerWidth;
			const height = window.innerHeight;

			this.canvas.width = width;
			this.canvas.height = height;

			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(width, height, false);
		};

		document.body.onresize(null);
	}

	public update(delta: number): void 
	{
		delta /= 1e3;

		if (this.keyboard.keyPressed(Keys.LEFT) || this.gamepad.buttonPressed(GamepadButton.LEFT))
		{
			this.cube.position.x -= delta;
		}
		if (this.keyboard.keyPressed(Keys.RIGHT) || this.gamepad.buttonPressed(GamepadButton.RIGHT))
		{
			this.cube.position.x += delta;
		}
		if (this.keyboard.keyPressed(Keys.UP) || this.gamepad.buttonPressed(GamepadButton.UP))
		{
			this.cube.position.y += delta;
		}
		if (this.keyboard.keyPressed(Keys.DOWN) || this.gamepad.buttonPressed(GamepadButton.DOWN))
		{
			this.cube.position.y -= delta;
		}
		

		if (this.mouse.buttonPressed(MouseButton.LEFT))
		{
			this.cube.rotation.y += this.mouse.delta.x / 1e2;
		}


		this.camera.position.z -= this.mouse.wheel / 1e2;

		this.camera.position.z += this.gamepad.getAxis(GamepadAxis.RIGHT_VERT) / 50;
		this.camera.position.x += this.gamepad.getAxis(GamepadAxis.RIGHT_HOR) / 50;

		this.cube.rotation.y += this.gamepad.getAxis(GamepadAxis.LEFT_HOR) / 50;

		if (this.gamepad.buttonJustPressed(GamepadButton.B))
		{
			this.gamepad.startHapticEffect(GamepadHapticEffectType.dualRumble, {
				duration: 1000,
				strongMagnitude: 1,
				weakMagnitude: 1
			});
		}

		if (this.mouse.doubleClicked || this.gamepad.buttonJustPressed(GamepadButton.A))
		{
			this.cubeColor();
		}


		if (this.touch.touchJustPressed(0)) 
		{
			this.cubeColor();
		}
		if (this.touch.touchPressed(0)) 
		{
			this.cube.rotation.y += this.touch.points[0].delta.x / 1e2;
		}
		if (this.touch.touchJustReleased(0)) 
		{
			this.cubeColor();
		}
	
		let tpt = this.touch.pan(2);
		if (tpt) 
		{
			this.cube.position.x += tpt.delta.x / 1e2;
		}

			
		tpt = this.touch.pan(3);
		if (tpt) 
		{
			this.camera.position.y += tpt.delta.y / 1e2;
		}
	
		var pinch = this.touch.pinchZoom();
		if (pinch) 
		{
			this.camera.position.z -= pinch / 1e2;
		}
	}

	public render(): void 
	{
		this.renderer.render(this.scene, this.camera);
	}
}

new CubeExample().start();
