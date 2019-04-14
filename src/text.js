import colors from "colors";
const CURR_DIR = process.cwd();

let TEXT_CONST = {
  final_text: `\nDone, you are all set try to run ${colors.cyan(
    "npm install"
  )}\nand right after ${colors.cyan("npm start")}`,
  welcome_text: `\nHi, welcome to node-scaffolder\n`,
  package_json_not_found: `Hey, I can't find package.json file in '${CURR_DIR}'.\nDid you run ${colors.cyan(
    "npm init"
  )}?`
};

export default TEXT_CONST;
