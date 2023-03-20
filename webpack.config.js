import path from 'path';

export default {
	entry: './source/main.ts',
	mode: 'production',
	output: {
		filename: 'syncinput.js',
		path: path.resolve('./build'),
		library: 'syncinput',
    	libraryTarget: 'umd'
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}],
	},
	optimization: {
        minimize: true
    },
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	}
};