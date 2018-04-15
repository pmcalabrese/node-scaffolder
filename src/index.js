import inquirer from 'inquirer';
import path from 'path';
import colors from 'colors';
import fs from 'fs';
import process from 'process';
import { ncpp, writeFile, Generator, requestP } from './utils';
const pkg = require("../package.json");

const CURR_DIR = process.cwd();

const scaffoldFolder = (lang) => {
    return ncpp(path.resolve(`${__dirname}/../templates/${lang}/src`), `${CURR_DIR}/src`, { clobber: false });
}

const scaffoldReadme = (lang) => {
    const package_json = JSON.parse(fs.readFileSync(path.resolve(CURR_DIR, 'package.json')))
    let text = fs.readFileSync(path.resolve(`${__dirname}/../templates/README.md`));
    text = `# ${package_json.name}\n\n` + text;
    return writeFile(path.resolve(`${CURR_DIR}`, 'README.md'), text, 'utf8');
}

(async () => {

    if (!fs.existsSync(path.resolve(CURR_DIR, 'package.json'))) {
        console.log(`Hey, I can't find package.json file in '${CURR_DIR}'.\nDid you run 'npm init'?`);
        process.exit()
    }
    
    const response = await requestP('https://raw.githubusercontent.com/pmcalabrese/riotjs-webpack/master/package.json')

    const latest_version = JSON.parse(response.body).version;

    if (latest_version !== pkg.version) {
        console.log(`\nUpdate available ${pkg.version} → ${colors.green(latest_version)}\nRun ${colors.cyan('npm i -g npg')} to update`);
    }

    
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
        
    const answers_1 = await inquirer.prompt(questions_1)

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
        // {
        //     type: 'list',
        //     name: 'test',
        //     message: 'Test?',
        //     choices: ['Yes', 'No'],
        //     filter: function (val) {
        //         return val.toLowerCase();
        //     }
        // },
    ]

    const answers_2 = await inquirer.prompt(questions_2)

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
        console.log(`\nDone, you are all set try to run ${colors.cyan('npm install')}\nand right after ${colors.cyan('npm start')}`);
    })
    .catch((err) => {
        if (err) throw err;
    });



})()



