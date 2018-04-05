import { Generator, readFile, ncpp } from './utils';

export class GeneratorRollup extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        return this.readPackage()
        .then((package_json_orginal) => {
            return this.generatePackage(JSON.parse(package_json_orginal));
        }).catch((err) => {
            console.log(err);
        })
    }

    generatePackage(package_json_orginal) {
        return this._generatePackage(package_json_orginal, 
            {
                build: "rollup --config",
                watch: "rollup --config -w"
            },
            {
                rollup: "^0.57.1"
            }
        )
        
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'rollup.config.js');
    }
}