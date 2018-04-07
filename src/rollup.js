import { Generator, readFile, ncpp } from './utils';

export class GeneratorRollup extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage(lang = 'javascript') {

        const devDependencies = {
            javascript: {
                "rollup": "^0.57.1"
            },
            typescript: {
                "rollup-plugin-typescript": "^0.8.1",
                "rollup": "^0.57.1"
            },
        }
        

        return this._writePackage({
            build: "rollup --config",
            watch: "rollup --config -w"
        },devDependencies[lang]);
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'rollup.config.js');
    }
}