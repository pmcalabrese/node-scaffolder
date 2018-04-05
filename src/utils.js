import ncp from 'ncp';
import fs from 'fs';
import path from 'path';
import util from 'util';

export const ncpp = util.promisify(ncp.ncp);
export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);

export class Generator {

    constructor(CURR_DIR) {
        this.CURR_DIR = CURR_DIR
    }

    readPackage() {
        return readFile(`${this.CURR_DIR}/package.json`, 'utf8');
    }

    _copyFiles(lang, config_file) {
        return ncpp(path.resolve(`${__dirname}/../templates/${lang}/${config_file}`), `${this.CURR_DIR}/${config_file}`)
    }
}