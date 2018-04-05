import { Generator, readFile, ncpp } from './utils';

const package_json_script = {
    prestart: "npm run build",
    start: "node dist/index.js"
};

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
        const package_json = {
            scripts: {
                ...package_json_orginal.scripts,
                ...package_json_script,
                build: "rollup --config",
                watch: "rollup --config -w"
            },
            devDependencies: {
                ...package_json_orginal.devDependencies,
                rollup: "^0.57.1"
            }
        };
        package_json_orginal.scripts = {...package_json.scripts};
        package_json_orginal.devDependencies = {...package_json.devDependencies};
        return package_json_orginal;
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'rollup.config.js');
    }
}