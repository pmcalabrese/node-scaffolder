import ncp from 'ncp';
import fs from 'fs';
import util from 'util';

export const ncpp = util.promisify(ncp.ncp);
export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);

export class Generator {

    constructor(CURR_DIR) {
        this.getPackage = readFile(`${CURR_DIR}/package.json`, 'utf8');
    }

    generatePackage(package_json_orginal) {

    }

    copyFiles() {

    }
}