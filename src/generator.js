import ncp from "ncp";
import fs from "fs";
import path from "path";
import util from "util";

import { devDependencies, scripts, base_package } from "./const";

export const ncpp = util.promisify(ncp.ncp);
export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);

export class Generator {
  constructor(lang, bundler, linter) {
    this.lang = lang;
    this.bundler = bundler;
    this.linter = linter;
    this.CURR_DIR = process.cwd();
    this.templateLanguageFolder = `${__dirname}/../templates/${this.lang}`;
  }

  /**
   * Returns the JS rapresentation fo the package.json file
   */
  _readPackage() {
    return readFile(`${this.CURR_DIR}/package.json`, "utf8").then(
      package_json_orginal => {
        return JSON.parse(package_json_orginal);
      }
    );
  }

  /**
   * Scaffold package json
   */
  _scaffoldPackage() {
    return this._readPackage()
      .then(package_json => {
        return this._mergeScripts(
          package_json,
          base_package[this.bundler] || {},
          scripts[this.lang][this.bundler][this.linter],
          devDependencies[this.lang][this.bundler][this.linter]
        );
      })
      .then(new_package_json => {
        return writeFile(
          `${this.CURR_DIR}/package.json`,
          JSON.stringify(new_package_json, null, 4)
        );
      });
  }

  /**
   * Given a package.json js object, it returs the package.json js object with
   * merged, base_package(output), scripts and devDependencies
   * @param {Object} package_json_orginal: a json parsed package.json
   * @param {Object} scripts: a js object containing the scripts
   * @param {Object} devDependencies: a js object containing the devDependencies
   */
  _mergeScripts(package_json_orginal, base_package, scripts, devDependencies) {
    package_json_orginal = {
      ...package_json_orginal,
      ...base_package
    };
    package_json_orginal.scripts = {
      ...package_json_orginal.scripts,
      ...scripts
    };
    package_json_orginal.devDependencies = {
      ...package_json_orginal.devDependencies,
      ...devDependencies
    };
    return package_json_orginal;
  }

  _scaffoldReadme() {
    return this._readPackage().then(package_json => {
      let text = fs.readFileSync(
        path.resolve(`${__dirname}/../templates/README.md`)
      );
      text = `# ${package_json.name}\n\n` + text;
      return writeFile(
        path.resolve(`${this.CURR_DIR}`, "README.md"),
        text,
        "utf8"
      );
    });
  }

  /**
   * scaffold the src folder based on the language
   */
  _scaffoldSrc() {
    return ncpp(
      path.resolve(`${this.templateLanguageFolder}/src`),
      `${this.CURR_DIR}/src`,
      { clobber: false }
    );
  }

  /**
   * scaffold config file based on the language, linter and bundler
   */
  _scaffoldConfigFile() {
    const config_files = {
      rollup: "rollup.config.js",
      webpack: "webpack.config.js",
      babel: ".babelrc"
    };
    // copy config file if the bundler exist
    if (config_files[this.bundler]) {
      return ncpp(
        path.resolve(
          `${this.templateLanguageFolder}/${this.bundler}/${this.linter}/${
            config_files[this.bundler]
          }`
        ),
        `${this.CURR_DIR}/${config_files[this.bundler]}`
      );
    }
  }

  /**
   * Scaffold tsconfig file
   */
  _scaffoldTSConfigFile() {
    return ncpp(
      path.resolve(`${this.templateLanguageFolder}/tsconfig.json`),
      `${this.CURR_DIR}/tsconfig.json`
    );
  }

  /**
   * Scaffold gitignore file
   */
  _scaffoldTSGitIgnoreFile() {
    return ncpp(
      path.resolve(`${__dirname}/../templates/.gitignore`),
      `${this.CURR_DIR}/.gitignore`
    );
  }

  copyFiles() {
    let files_p = [
      // scaffold Package
      this._scaffoldPackage(),
      // copy src folder
      this._scaffoldSrc(),
      // copy config files
      this._scaffoldConfigFile(),
      // copy gitignore file
      this._scaffoldTSGitIgnoreFile(),
      // copy readme file
      this._scaffoldReadme()
    ];

    if (this.lang === "typescript") {
      files_p.push(this._scaffoldTSConfigFile());
    }

    return Promise.all(files_p);
  }
}
