import { Generator, readFile, ncpp } from './utils';

export class GeneratorTsc extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        return this._writePackage({
            build: "tsc",
            watch: "tsc -w"
        },{
            "typescript": "2.8.1"
        })
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'tsconfig.json');
    }
}