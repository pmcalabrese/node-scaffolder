import { Generator, readFile, ncpp } from './utils';

export class GeneratorWebpack extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        return this._writePackage({
            build: "webpack",
            watch: "webpack -w"
        },{
            "webpack": "^4.5.0",
            "webpack-cli": "^2.0.14"
        })
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'webpack.config.js');
    }
}