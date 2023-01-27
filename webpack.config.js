import path from 'path';

export default {
	entry: './source/main.ts',
	mode: 'production',
	devtool: 'inline-source-map',
	output: {
		filename: 'syncinput.js',
		path: path.resolve('./build'),
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	}
};