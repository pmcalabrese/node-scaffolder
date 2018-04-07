import { Generator, readFile, ncpp } from './utils';

export class GeneratorWebpack extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage(lang = 'javascript') {

        const devDependencies = {
            javascript: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14"
            },
            typescript: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "typescript": "2.8.1",
                "ts-loader": "^4.1.0"
            },
        }

        return this._writePackage({
            build: "webpack",
            watch: "webpack -w"
        },devDependencies[lang])
    }

    copyFiles(lang) {
        let files_promises = [this._copyFiles(lang, 'webpack.config.js')];
        if (lang === 'typescript') {
            files_promises.push(this._copyFiles(lang, 'tsconfig.json'))
        }
        return Promise.all(files_promises);
    }

    copyTSConfig(lang) {
        return this._copyFiles(lang, 'tsconfig.json');
    }
}