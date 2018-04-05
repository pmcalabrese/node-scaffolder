import ncp from 'ncp';
import fs from 'fs';
import path from 'path';
import util from 'util';

export const ncpp = util.promisify(ncp.ncp);
export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);

const package_json_script = {
    prestart: "npm run build",
    start: "node dist/index.js"
};

export class Generator {

    constructor(CURR_DIR) {
        this.CURR_DIR = CURR_DIR
    }

    readPackage() {
        return readFile(`${this.CURR_DIR}/package.json`, 'utf8');
    }

    _writePackage(scripts, devDependencies) {
        return this.readPackage()
        .then((package_json_orginal) => {
            return this._generatePackage(JSON.parse(package_json_orginal), scripts, devDependencies);
        }).catch((err) => {
            console.log(err);
        })
    }

    _generatePackage(package_json_orginal, scripts, devDependencies) {
        const package_json = {
            scripts: {
                ...package_json_orginal.scripts,
                ...package_json_script,
                ...scripts
            },
            devDependencies: {
                ...package_json_orginal.devDependencies,
                ...devDependencies
            }
        };
        package_json_orginal.scripts = {...package_json.scripts};
        package_json_orginal.devDependencies = {...package_json.devDependencies};
        return package_json_orginal;
    }

    _copyFiles(lang, config_file) {
        return ncpp(path.resolve(`${__dirname}/../templates/${lang}/${config_file}`), `${this.CURR_DIR}/${config_file}`)
    }
}