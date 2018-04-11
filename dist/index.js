'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ncp = _interopDefault(require('ncp'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var util = _interopDefault(require('util'));
var inquirer = _interopDefault(require('inquirer'));
var process = _interopDefault(require('process'));

const devDependencies = {
    javascript: {
        rollup: {
            none: {
                "rollup": "^0.57.1"
            },
            eslint: {
                "rollup": "^0.57.1",
                "rollup-plugin-eslint": "^4.0.0",
                "eslint": "4.19.1"
            }
        },
        webpack: {
            none: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14"
            },
            eslint: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "eslint-loader": "latest",
                "eslint": "4.19.1"
            }
        },
        babel: {
            none: {
                "babel-cli": "6.26.0",
                "babel-preset-env": "1.6.1"
            },
            eslint: {
                "babel-cli": "6.26.0",
                "babel-preset-env": "1.6.1",
                "eslint": "4.19.1"
            }
        }
    },
    typescript: {
        rollup: {
            none: {
                "typescript": "2.8.1",
                "rollup-plugin-typescript": "^0.8.1",
                "rollup": "^0.57.1"
            },
            tslint: {
                "typescript": "2.8.1",
                "rollup-plugin-typescript": "^0.8.1",
                "rollup": "^0.57.1",
                "rollup-plugin-tslint": "^0.1.34"
            }
        },
        webpack: {
            none: {
                "typescript": "2.8.1",
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "ts-loader": "^4.1.0"
            },
            tslint: {
                "typescript": "2.8.1",
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "ts-loader": "^4.1.0",
                "tslint": "5.9.1",
                "tslint-loader": "3.6.0"
            }
        },
        tsc: {
            none: {

            },
            tslint: {

            }
        }
    }
};

const base_scripts_rollup = {
    build: "rollup --config",
    watch: "rollup --config -w"
};

const base_scripts_webpack = {
    build: "webpack",
    watch: "webpack -w"
};

const base_scripts_babel = {
    build: "babel src/ -d dist/ --source-maps",
    watch: "babel -w src/ -d dist/ --source-maps"
};

const scripts = {
    javascript: {
        rollup: {
            none: base_scripts_rollup,
            eslint: {
                postinstall: "eslint --init",
                ...base_scripts_rollup,
            }
        },
        webpack: {
            none: base_scripts_webpack,
            eslint: {
                postinstall: "eslint --init",
                ...base_scripts_webpack,
            }
        },
        babel: {
            none: base_scripts_babel,
            eslint: {
                postinstall: "eslint --init",
                lint: "eslint src",
                ...base_scripts_babel
            }
        }
    },
    typescript: {
        rollup: {
            none: base_scripts_rollup,
            tslint: {
                postinstall: "tslint --init",
                lint: "tslint -c tslint.json 'src/**/*.ts'",
                ...base_scripts_rollup,
            }
        },
        webpack: {
            none: base_scripts_webpack,
            tslint: {
                postinstall: "tslint --init",
                ...base_scripts_webpack,
            }
        }
    }
};

const config_files = {
    rollup: "rollup.config.js",
    webpack: "webpack.config.js",
    babel: ".babelrc"
};

const ncpp = util.promisify(ncp.ncp);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const package_json_script = {
    prestart: "npm run build",
    start: "node dist/index.js"
};

class Generator {

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
            return this._generatePackage(JSON.parse(package_json_orginal), scripts[this.lang][this.bundler][this.linter], devDependencies[this.lang][this.bundler][this.linter]);
        }).then((new_package_json) => {
            this.savePackage(new_package_json);
        })
    }

    _generatePackage(package_json_orginal, scripts$$1, devDependencies$$1) {
        const package_json = {
            scripts: {
                ...package_json_orginal.scripts,
                ...package_json_script,
                ...scripts$$1
            },
            devDependencies: {
                ...package_json_orginal.devDependencies,
                ...devDependencies$$1
            }
        };
        package_json_orginal.scripts = {...package_json.scripts};
        package_json_orginal.devDependencies = {...package_json.devDependencies};
        return package_json_orginal;
    }

    _copyFiles() {
        let files_p = [ncpp(path.resolve(`${__dirname}/../templates/${this.lang}/${this.bundler}/${this.linter}/${config_files[this.bundler]}`), `${this.CURR_DIR}/${config_files[this.bundler]}`)];

        if (this.lang === 'typescript') {
            files_p.push(ncpp(path.resolve(`${__dirname}/../templates/${this.lang}/tsconfig.json`), `${this.CURR_DIR}/tsconfig.json`));
        }

        return Promise.all(files_p)
    }
}

const CURR_DIR = process.cwd();

console.log('\nHi, welcome to Node Project Generator\n');

const questions_1 = [
    {
        type: 'list',
        name: 'lang',
        message: 'Language?',
        choices: ['Typescript', 'Javascript',],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
];

function scaffoldFolder(lang) {
    return ncpp(path.resolve(`${__dirname}/../templates/${lang}/src`), `${CURR_DIR}/src`, { clobber: false });
}

function scaffoldReadme(lang) {
    const package_json = JSON.parse(fs.readFileSync(path.resolve(CURR_DIR, 'package.json')));
    let text = fs.readFileSync(path.resolve(`${__dirname}/../templates/README.md`));
    text = `# ${package_json.name}\n\n` + text;
    return writeFile(path.resolve(`${CURR_DIR}`, 'README.md'), text, 'utf8');
}

if (!fs.existsSync(path.resolve(CURR_DIR, 'package.json'))) {
    console.log(`Hey, I can't find package.json file in '${CURR_DIR}'.\nDid you run 'npm init'?`);
    process.exit();
}

inquirer.prompt(questions_1).then((answers_1) => {

    const bundler_options = {
        javascript: ['Rollup', 'Webpack', 'Babel'],
        typescript: ['Rollup', 'Webpack', 'tsc']
    };

    const linter_options = {
        javascript: ['None', 'ESlint'],
        typescript: ['None', 'TSlint']
    };

    const questions_2 = [
        {
            type: 'list',
            name: 'bundler',
            message: 'Bundler?',
            choices: bundler_options[answers_1.lang],
            filter: function (val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'list',
            name: 'linter',
            message: 'Linter?',
            choices: linter_options[answers_1.lang],
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

    inquirer.prompt(questions_2)
    .then(answers_2 => {

        const answers = {
            ...answers_1,
            ...answers_2
        };

        const Scaffolder = new Generator(CURR_DIR, answers.lang, answers.bundler, answers.linter );

        Promise.all([
            scaffoldFolder(answers.lang),
            scaffoldReadme(),
            Scaffolder._writePackage(),
            Scaffolder._copyFiles()
        ])
        .then(() => {
            console.log(`\nDone, you are all set try to run:\n\n\tnpm install\n\nand right after:\n\n\tnpm start`);
        })
        .catch((err) => {
            if (err) throw err;
        });

    });

});
