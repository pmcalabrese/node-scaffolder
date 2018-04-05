'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ncp = _interopDefault(require('ncp'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var util = _interopDefault(require('util'));
var inquirer = _interopDefault(require('inquirer'));

const ncpp = util.promisify(ncp.ncp);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const package_json_script = {
    prestart: "npm run build",
    start: "node dist/index.js"
};

class Generator {

    constructor(CURR_DIR) {
        this.CURR_DIR = CURR_DIR;
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

class GeneratorRollup extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        return this._writePackage({
            build: "rollup --config",
            watch: "rollup --config -w"
        },{
            rollup: "^0.57.1"
        })
    }

    copyFiles(lang) {
        return this._copyFiles(lang, 'rollup.config.js');
    }
}

const CURR_DIR = process.cwd();

const GeneratorRollupService = new GeneratorRollup(CURR_DIR);

console.log('Hi, welcome to Node Project Generator', CURR_DIR);

const questions = [
    {
        type: 'list',
        name: 'lang',
        message: 'Language?',
        choices: ['Typescript', 'Javascript',],
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'list',
        name: 'bundler',
        message: 'Bundler',
        choices: ['Rollup', 'Webpack', 'Babel'],
        filter: function (val) {
            return val.toLowerCase();
        }
    },
    {
        type: 'list',
        name: 'test',
        message: 'Test?',
        choices: ['Yes', 'No'],
        filter: function (val) {
            return val.toLowerCase();
        }
    },
];

function scaffoldFolder(lang) {
    ncpp(path.resolve(`${__dirname}/../templates/${lang}/src`), `${CURR_DIR}/src`, { clobber: false });
}

inquirer.prompt(questions)
.then(answers => {
    console.log('\nAnswers:');
    console.log(JSON.stringify(answers, null, '  '));
    scaffoldFolder(answers.lang);
    if (answers.bundler === 'rollup') {
        Promise.all([
            GeneratorRollupService.writePackage(),
            GeneratorRollupService.copyFiles(answers.lang)])
        .catch((err) => {
            if (err) throw err;
        });
    }
});
