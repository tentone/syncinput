@echo off
echo ------------------------
echo       sync Input
echo ------------------------
echo Joining Javascript files
node join.js ../../source/ ../../source/SyncInput.js ../syncinput.js
echo Optimizing with google closure (takes a while)
java -jar closure.jar --compilation_level SIMPLE_OPTIMIZATIONS --language_in ECMASCRIPT5_STRICT --language_out ECMASCRIPT5_STRICT --js ../syncinput.js --js_output_file ../syncinput.min.js

echo Done
pause