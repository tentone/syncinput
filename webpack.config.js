import path from 'path';

export default {
	entry: './source/main.ts',
	mode: 'production',
	experiments: {
		outputModule: true,
	},
	output: {
		path: path.resolve('dist'),
		filename: 'index.js',
		library: {
			type: 'module',
		},
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