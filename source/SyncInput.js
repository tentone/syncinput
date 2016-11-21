"use strict";

include("Vector2.js");
include("Key.js");
include("Gamepad.js");
include("Mouse.js");
include("Keyboard.js");

function SyncInput(){}

SyncInput.VERSION = "SyncInput V1.1";
SyncInput.TIMESTAMP = "201611210139";

SyncInput.Key = Key;
SyncInput.Gamepad = Gamepad;
SyncInput.Mouse = Mouse;
SyncInput.Keyboard = Keyboard;
SyncInput.Vector2 = Vector2;
