'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ncp = _interopDefault(require('ncp'));
var fs = _interopDefault(require('fs'));
var util = _interopDefault(require('util'));
var inquirer = _interopDefault(require('inquirer'));
var path$1 = _interopDefault(require('path'));

const ncpp = util.promisify(ncp.ncp);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Generator {

    constructor(CURR_DIR) {
        this.getPackage = readFile(`${CURR_DIR}/package.json`, 'utf8');
    }

    generatePackage(package_json_orginal) {

    }

    copyFiles() {

    }
}

const package_json_script = {
    prestart: "npm run build",
    start: "node dist/index.js"
};

class GeneratorRollup extends Generator {

    constructor(CURR_DIR) {
        super(CURR_DIR);
    } 

    writePackage() {
        this.getPackage()
        .then((package_json_orginal) => {
            return this.generatePackage(JSON.parse(package_json_orginal));
        }).catch((err) => {
            console.log(err);
        });
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
        return ncpp(path.resolve(`${__dirname}/../templates/${lang}/rollup.config.js`), `${CURR_DIR}/rollup.config.js`)
    }
}

const CURR_DIR$1 = process.cwd();

const GeneratorRollupService = new GeneratorRollup(CURR_DIR$1);

console.log('Hi, welcome to Node Project Generator', CURR_DIR$1);

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
    ncpp(path$1.resolve(`${__dirname}/../templates/${lang}/src`), `${CURR_DIR$1}/src`, { clobber: false });
}

inquirer.prompt(questions)
.then(answers => {
    console.log('\nAnswers:');
    console.log(JSON.stringify(answers, null, '  '));
    scaffoldFolder(answers.lang);
    if (answers.bundler === 'rollup') {
        GeneratorRollupService.writePackage().then((new_package) => {
            console.log('new_package',new_package);
        });
        GeneratorRollupService.copyFiles(answers.lang)
        .then(() => {

        }).catch((err) => {
            if (err) throw err;
        });
        setTimeout(() => {
            
        }, 100);
    }
});
