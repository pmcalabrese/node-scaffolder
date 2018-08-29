import ncp from 'ncp';
import fs from 'fs';
import path from 'path';
import util from 'util';
import request from 'request';
import { exec } from 'child_process';

import { devDependencies, scripts, config_files, base_package } from './const'

export const ncpp = util.promisify(ncp.ncp);
export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);
export const requestP = util.promisify(request);
export const execP = util.promisify(exec);

export class Generator {

    constructor(CURR_DIR, lang, bundler, linter) {
        this.lang = lang;
        this.bundler = bundler;
        this.linter = linter;
        this.CURR_DIR = CURR_DIR;
    }

    readPackage() {
        return readFile(`${this.CURR_DIR}/package.json`, 'utf8');
    }

    savePackage(new_package_json) {
        return writeFile(`${this.CURR_DIR}/package.json`, JSON.stringify(new_package_json, null, 4));
    }

    _writePackage() {
        return this.readPackage()
        .then((package_json_orginal) => {
            const _package = { ...JSON.parse(package_json_orginal), ...base_package[this.bundler] || {} };
            return this._generatePackage(_package, scripts[this.lang][this.bundler][this.linter], devDependencies[this.lang][this.bundler][this.linter]);
        }).then((new_package_json) => {
            this.savePackage(new_package_json);
        })
    }

    _generatePackage(package_json_orginal, scripts, devDependencies) {
        package_json_orginal.scripts = {
            ...package_json_orginal.scripts,
            ...scripts
        };
        package_json_orginal.devDependencies = {
            ...package_json_orginal.devDependencies,
            ...devDependencies
        };
        return package_json_orginal;
    }

    _copyFiles() {
        let files_p = [ncpp(path.resolve(`${__dirname}/../templates/${this.lang}/${this.bundler}/${this.linter}/${config_files[this.bundler]}`), `${this.CURR_DIR}/${config_files[this.bundler]}`)]

        if (this.lang === 'typescript') {
            files_p.push(ncpp(path.resolve(`${__dirname}/../templates/${this.lang}/tsconfig.json`), `${this.CURR_DIR}/tsconfig.json`))
        }

        return Promise.all(files_p)
    }
}