import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
	context: path.resolve('./examples'),
	entry: './cube.ts',
	mode: 'production',
	output: {
		filename: 'example.bundle.js',
		path: path.resolve('demo'),
	},
	devtool: 'source-map',
	devServer: {
		compress: true,
		port: 5000,
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
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'index.html'
	})]
};
