import inquirer from 'inquirer';
import path from 'path';
import { GeneratorRollup } from './rollup';
import { GeneratorWebpack } from './webpack';
import { GeneratorBabel } from './babel';
import { ncpp } from './utils';


const CURR_DIR = process.cwd();

const GeneratorRollupService = new GeneratorRollup(CURR_DIR);
const GeneratorWebpackService = new GeneratorWebpack(CURR_DIR);
const GeneratorBabelService = new GeneratorBabel(CURR_DIR);

console.log('Hi, welcome to Node Project Generator', CURR_DIR);

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

inquirer.prompt(questions_1).then((answers_1) => {

    let bundler_options = {
        javascript: ['Rollup', 'Webpack', 'Babel'],
        typescript: ['Rollup', 'Webpack', 'tsc']
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

        console.log('\nAnswers:');
        console.log(JSON.stringify(answers, null, '  '));
        if (answers.bundler === 'rollup') {
            Promise.all([
                GeneratorRollupService.writePackage(answers.lang),
                GeneratorRollupService.copyFiles(answers.lang)]),
                scaffoldFolder(answers.lang)
            .catch((err) => {
                if (err) throw err;
            });
        }
        if (answers.bundler === 'webpack') {
            Promise.all([
                GeneratorWebpackService.writePackage(answers.lang),
                GeneratorWebpackService.copyFiles(answers.lang)]),
                scaffoldFolder(answers.lang)
            .catch((err) => {
                if (err) throw err;
            });
        }
        if (answers.bundler === 'babel') {
            Promise.all([
                GeneratorBabelService.writePackage(answers.lang),
                GeneratorBabelService.copyFiles(answers.lang)]),
                scaffoldFolder(answers.lang)
            .catch((err) => {
                if (err) throw err;
            });
        }
    });

})

