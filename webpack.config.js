import path from 'path';

export default {
    entry: './source/main.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'es2015'
                }
            }
        ]
    }
};