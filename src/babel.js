import { Generator, readFile, ncpp } from './utils';

export class GeneratorBabel extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        return this._writePackage({
            build: "babel src/ -d dist/ --source-maps",
            watch: "babel -w src/ -d dist/ --source-maps"
        },{
            "babel": "^6.23.0",
            "babel-cli": "^6.26.0",
            "babel-preset-node8": "^1.2.0"
        })
    }

    copyFiles(lang) {
        return this._copyFiles(lang, '.babelrc');
    }
}