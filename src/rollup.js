import { Generator, readFile, ncpp } from './utils';

export class GeneratorRollup extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        return this._writePackage({
            build: "rollup --config",
            watch: "rollup --config -w"
        },{
            rollup: "^0.57.1"
        })
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'rollup.config.js');
    }
}