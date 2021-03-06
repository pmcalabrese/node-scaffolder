import colors from "colors";
const CURR_DIR = process.cwd();

let TEXT_CONST = {
  final: `\nDone, you are all set try to run ${colors.cyan(
    "npm install"
  )}\nand right after ${colors.cyan("npm start")}`,
  welcome(current_version) {
    return `\nHi, welcome to node-scaffolder v${current_version}\n`;
  },
  package_json_not_found: `Hey, I can't find package.json file in '${CURR_DIR}'.\nDid you run ${colors.cyan(
    "npm init"
  )}?`,
  update(current_version, latest_version) {
    return `You are using version ${current_version}. The latest version is ${latest_version}, please update by running\n\n\t${colors.cyan(
      "npm i -g node-scaffolder"
    )}\n`;
  },
  running_latest: `You are running the latest version! Nice!`
};

export default TEXT_CONST;
