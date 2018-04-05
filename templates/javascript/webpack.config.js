var path = require('path');

const serverConfig = {
    mode: 'development',
    target: 'node',
    entry: {
        index: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: 'source-map'
};

module.exports = [ serverConfig ];