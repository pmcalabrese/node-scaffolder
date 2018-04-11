var path = require('path');

const serverConfig = {
    mode: 'development',
    target: 'node',
    entry: {
        index: path.resolve(__dirname, 'src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map'
};

module.exports = [serverConfig];