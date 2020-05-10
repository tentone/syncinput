import strip from "rollup-plugin-strip";

export default {
	input: "source/SyncInput.js",
	plugins: [
		strip(
		{
			functions: ["assert.*", "debug", "alert"],
			debugger: false,
			sourceMap: false
		})
	],
	output: [
		{
			format: "umd",
			name: "SyncInput",
			sourceMap: true,
			file: "build/syncinput.js",
			indent: "\t"
		},
		{
			format: "es",
			sourcemap: true,
			file: "build/syncinput.module.js",
			indent: "\t"
		}
	]
};
