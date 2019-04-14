import colors from "colors";
const CURR_DIR = process.cwd();

let TEXT_CONST = {
  final: `\nDone, you are all set try to run ${colors.cyan(
    "npm install"
  )}\nand right after ${colors.cyan("npm start")}`,
  welcome: `\nHi, welcome to node-scaffolder\n`,
  package_json_not_found: `Hey, I can't find package.json file in '${CURR_DIR}'.\nDid you run ${colors.cyan(
    "npm init"
  )}?`,
  update(current_version, latest_version) {
    return `You are using ${current_version}. The latest version is ${latest_version}. Please update!`;
  },
  running_latest: `You are running the latest version! Nice!`
};

export default TEXT_CONST;
