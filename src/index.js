import inquirer from "inquirer";
import { resolve } from "path";
import { existsSync } from "fs";
import process from "process";
import TEXT_CONST from "./text";
import { Generator } from "./generator";
import checkForUpdate from "update-check";
import pkg from "../package";

const CURR_DIR = process.cwd();

(async () => {
  let update = null;

  try {
    update = await checkForUpdate(pkg);
  } catch (err) {
    console.error(`Failed to check for updates: ${err}`);
  }

  if (update) {
    console.log(TEXT_CONST.update(pkg.version, update.latest));
  } else {
    console.log(TEXT_CONST.running_latest);
  }

  if (!existsSync(resolve(CURR_DIR, "package.json"))) {
    console.log(TEXT_CONST.package_json_not_found);
    process.exit();
  }

  console.log(TEXT_CONST.welcome);

  const questions_1 = [
    {
      type: "list",
      name: "lang",
      message: "Language?",
      choices: ["Typescript", "Javascript"],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ];

  const answers_1 = await inquirer.prompt(questions_1);

  const bundler_options = {
    javascript: ["Rollup", "Webpack", "Babel"],
    typescript: ["Rollup", "Webpack", "tsc"]
  };

  const linter_options = {
    javascript: ["None", "ESlint"],
    typescript: ["None", "TSlint"]
  };

  const questions_2 = [
    {
      type: "list",
      name: "bundler",
      message: "Bundler?",
      choices: bundler_options[answers_1.lang],
      filter: function(val) {
        return val.toLowerCase();
      }
    },
    {
      type: "list",
      name: "linter",
      message: "Linter?",
      choices: linter_options[answers_1.lang],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ];

  const answers_2 = await inquirer.prompt(questions_2);

  const answers = {
    ...answers_1,
    ...answers_2
  };

  const Scaffolder = new Generator(
    answers.lang,
    answers.bundler,
    answers.linter
  );

  Promise.all([Scaffolder.copyFiles()])
    .then(() => {
      console.log(TEXT_CONST.final);
      process.exit();
    })
    .catch(err => {
      if (err) console.log(err);
    });
})();
