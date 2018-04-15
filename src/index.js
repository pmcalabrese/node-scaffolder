import inquirer from 'inquirer';
import path from 'path';
import colors from 'colors';
import fs from 'fs';
import process from 'process';
import { ncpp, writeFile, Generator, requestP, execP } from './utils';

const CURR_DIR = process.cwd();
let final_text = `\nDone, you are all set try to run ${colors.cyan('npm install')}\nand right after ${colors.cyan('npm start')}`;

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

    Promise.all([
        execP('npm list -g node-scaffolder'),
        requestP({
            url: 'https://raw.githubusercontent.com/pmcalabrese/node-scaffolder/master/package.json',
            json: true
        })
    ]).then((data) => {
        const current_version = data[0].stdout.split("node-scaffolder@")[1].split(" ")[0];
        const latest_version = data[1].body.version
        if (latest_version !== current_version) {
            final_text += `\n\nUpdate available ${current_version} → ${colors.green(latest_version)}\nRun ${colors.cyan('npm i -g node-scaffolder')} to update`;
        }
    })
    
    console.log('\nHi, welcome to node-scaffolder\n');
    
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
        console.log(final_text);
        process.exit();
    })
    .catch((err) => {
        if (err) throw err;
    });



})()



