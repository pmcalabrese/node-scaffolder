import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import process from 'process';
import { ncpp, writeFile, Generator } from './utils';

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
    const package_json = JSON.parse(fs.readFileSync(path.resolve(CURR_DIR, 'package.json')))
    let text = fs.readFileSync(path.resolve(`${__dirname}/../templates/README.md`));
    text = `# ${package_json.name}\n\n` + text;
    return writeFile(path.resolve(`${CURR_DIR}`, 'README.md'), text, 'utf8');
}

if (!fs.existsSync(path.resolve(CURR_DIR, 'package.json'))) {
    console.log(`Hey, I can't find package.json file in '${CURR_DIR}'.\nDid you run 'npm init'?`);
    process.exit()
}

inquirer.prompt(questions_1).then((answers_1) => {

    const bundler_options = {
        javascript: ['Rollup', 'Webpack', 'Babel'],
        typescript: ['Rollup', 'Webpack', 'tsc']
    }

    const linter_options = {
        javascript: ['None', 'ESlint'],
        typescript: ['None', 'TSlint']
    }

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
    ]

    inquirer.prompt(questions_2)
    .then(answers_2 => {

        const answers = {
            ...answers_1,
            ...answers_2
        }

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

})

