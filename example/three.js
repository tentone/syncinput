"use strict";

//Import modules
var Keyboard = SyncInput.Keyboard;
var Mouse = SyncInput.Mouse;
var Gamepad = SyncInput.Gamepad;

//Create canvas element
var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.top = "0px";
canvas.style.left = "0px";
document.body.appendChild(canvas);

//WebGl renderer
var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(canvas.width, canvas.height);

//Scene
var scene = new THREE.Scene();

//Camera
var camera = new THREE.PerspectiveCamera(60, canvas.width/canvas.height, 0.1, 1000);
camera.position.set(0, 0, 3);
scene.add(camera);

//Material (defines how the object surface in draw)
var material = new THREE.MeshBasicMaterial({color: 0xFF0000});

//Geometry (defines the object form)
var geometry = new THREE.BoxGeometry(1, 1, 1);

//Mesh (combines a geometry and a material)
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Create keyboard and mouse input objects
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
	gamepad.update();

	if(keyboard.keyPressed(Keyboard.LEFT) || gamepad.buttonPressed(Gamepad.LEFT))
	{
		cube.position.x -= 0.1;
	}
	if(keyboard.keyPressed(Keyboard.RIGHT) || gamepad.buttonPressed(Gamepad.RIGHT))
	{
		cube.position.x += 0.1;
	}
	if(keyboard.keyPressed(Keyboard.UP) || gamepad.buttonPressed(Gamepad.UP))
	{
		cube.position.y += 0.1;
	}
	if(keyboard.keyPressed(Keyboard.DOWN) || gamepad.buttonPressed(Gamepad.DOWN))
	{
		cube.position.y -= 0.1;
	}

	if(mouse.buttonPressed(Mouse.LEFT))
	{
		cube.rotation.y += mouse.delta.x / 200;
	}

	cube.position.z += mouse.wheel * 0.01;

	//Render scene to screen
	renderer.render(scene, camera);
}

//Resize
function resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	renderer.setSize(canvas.width, canvas.height);

	camera.aspect = canvas.width / canvas.height;
	camera.updateProjectionMatrix();
}