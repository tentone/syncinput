@echo off
echo ------------------------
echo       sync Input
echo ------------------------
echo Optimizing with google closure (takes a while)
java -jar closure.jar --compilation_level SIMPLE_OPTIMIZATIONS --language_in ECMASCRIPT5_STRICT --language_out ECMASCRIPT5 --js ../../source/SyncInput.js ../../source/Vector2.js ../../source/Key.js ../../source/Mouse.js ../../source/Keyboard.js ../../source/Gamepad.js --js_output_file ../syncinput.min.js

echo Done
pause