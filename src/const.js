export const package_json_script = {
  prestart: "npm run build",
  start: "node dist/index.js"
};

export const base_package = {
  rollup: {
    main: "dist/index.js",
    module: "dist/index.esm.js",
    browser: "dist/index.umd.js"
  },
  webpack: {
    main: "dist/index.js"
  },
  none: {
    main: "dist/index.js"
  },
  babel: {
    main: "dist/index.js"
  }
};

const baseRollupDevDependencies = {
  rollup: "latest",
  "rollup-plugin-terser": "latest",
  "rollup-plugin-commonjs": "latest",
  "rollup-plugin-node-resolve": "latest",
  "rollup-plugin-json": "latest"
};

export const devDependencies = {
  javascript: {
    rollup: {
      none: baseRollupDevDependencies,
      eslint: {
        ...baseRollupDevDependencies,
        "rollup-plugin-eslint": "latest",
        eslint: "latest"
      }
    },
    webpack: {
      none: {
        webpack: "latest",
        "webpack-cli": "latest"
      },
      eslint: {
        webpack: "latest",
        "webpack-cli": "latest",
        "eslint-loader": "latest",
        eslint: "latest"
      }
    },
    babel: {
      none: {
        "babel-cli": "latest",
        "babel-preset-env": "latest",
        "babel-preset-minify": "latest"
      },
      eslint: {
        "babel-cli": "latest",
        "babel-preset-env": "latest",
        "babel-preset-minify": "latest",
        eslint: "latest"
      }
    }
  },
  typescript: {
    rollup: {
      none: {
        ...baseRollupDevDependencies,
        "rollup-plugin-typescript": "latest",
        typescript: "latest"
      },
      tslint: {
        ...baseRollupDevDependencies,
        "rollup-plugin-typescript": "latest",
        typescript: "latest",
        tslib: "latest",
        "rollup-plugin-tslint": "latest"
      }
    },
    webpack: {
      none: {
        typescript: "latest",
        webpack: "latest",
        "webpack-cli": "latest",
        "ts-loader": "latest"
      },
      tslint: {
        typescript: "latest",
        webpack: "latest",
        "webpack-cli": "latest",
        "ts-loader": "latest",
        tslint: "latest",
        "tslint-loader": "latest"
      }
    },
    tsc: {
      none: {
        typescript: "latest"
      },
      tslint: {
        typescript: "latest",
        tslint: "latest"
      }
    }
  }
};

const base_scripts_rollup = {
  ...package_json_script,
  build: "rollup --config",
  "build-prod": "NODE_ENV=production npm run build",
  watch: "rollup --config -w"
};

const base_scripts_webpack = {
  ...package_json_script,
  build: "webpack",
  "build-prod": "NODE_ENV=production npm run build",
  watch: "webpack -w"
};

const base_scripts_babel = {
  ...package_json_script,
  build: "babel src/ -d dist/ --source-maps",
  "build-prod": "babel src/ -d dist/ --presets minify",
  watch: "babel -w src/ -d dist/ --source-maps"
};

const base_scripts_tsc = {
  ...package_json_script,
  build: "tsc",
  watch: "tsc -w"
};

export const scripts = {
  javascript: {
    rollup: {
      none: base_scripts_rollup,
      eslint: {
        postinstall: "eslint --init",
        ...base_scripts_rollup
      }
    },
    webpack: {
      none: base_scripts_webpack,
      eslint: {
        postinstall: "eslint --init",
        lint: "eslint src",
        ...base_scripts_webpack
      }
    },
    babel: {
      none: base_scripts_babel,
      eslint: {
        postinstall: "eslint --init",
        ...base_scripts_babel
      }
    }
  },
  typescript: {
    rollup: {
      none: base_scripts_rollup,
      tslint: {
        postinstall: "tslint --init",
        ...base_scripts_rollup
      }
    },
    webpack: {
      none: base_scripts_webpack,
      tslint: {
        postinstall: "tslint --init",
        ...base_scripts_webpack
      }
    },
    tsc: {
      none: base_scripts_tsc,
      tslint: {
        postinstall: "tslint --init",
        lint: "tslint -c tslint.json 'src/**/*.ts'",
        ...base_scripts_tsc
      }
    }
  }
};
