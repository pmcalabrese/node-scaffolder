import inquirer from 'inquirer';
import path from 'path';
import { GeneratorRollup } from './rollup';
import { ncpp } from './utils';


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
