export const package_json_script = {
    prestart: "npm run build",
    start: "node dist/index.js"
};

export const base_package =  {
    rollup: {
        main: "dist/index.js",
        module: "dist/index.esm.js",
        browser: "dist/index.umd.js",
    }
}

export const devDependencies = {
    javascript: {
        rollup: {
            none: {
                "rollup": "latest",
                "rollup-plugin-terser": "latest",
                "rollup-plugin-commonjs": "^9.1.0",
                "rollup-plugin-node-resolve": "^3.0.0"
            },
            eslint: {
                "rollup": "latest",
                "rollup-plugin-eslint": "^4.0.0",
                "eslint": "4.19.1",
                "rollup-plugin-terser": "latest",
                "rollup-plugin-commonjs": "^9.1.0",
                "rollup-plugin-node-resolve": "^3.0.0"
            }
        },
        webpack: {
            none: {
                "webpack": "latest",
                "webpack-cli": "latest"
            },
            eslint: {
                "webpack": "latest",
                "webpack-cli": "latest",
                "eslint-loader": "2.0.0",
                "eslint": "4.19.1"
            }
        },
        babel: {
            none: {
                "babel-cli": "6.26.0",
                "babel-preset-env": "1.6.1"
            },
            eslint: {
                "babel-cli": "6.26.0",
                "babel-preset-env": "1.6.1",
                "eslint": "4.19.1"
            }
        }
    },
    typescript: {
        rollup: {
            none: {
                "typescript": "latest",
                "rollup-plugin-typescript": "latest",
                "rollup-plugin-terser": "latest",
                "rollup": "latest"
            },
            tslint: {
                "typescript": "latest",
                "rollup-plugin-typescript": "latest",
                "rollup-plugin-terser": "latest",
                "rollup": "latest",
                "rollup-plugin-tslint": "latest"
            }
        },
        webpack: {
            none: {
                "typescript": "latest",
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "ts-loader": "^4.1.0"
            },
            tslint: {
                "typescript": "latest",
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "ts-loader": "^4.1.0",
                "tslint": "5.9.1",
                "tslint-loader": "3.6.0"
            }
        },
        tsc: {
            none: {

            },
            tslint: {

            }
        }
    }
}

const base_scripts_rollup = {
    ...package_json_script,
    build: "rollup --config",
    watch: "rollup --config -w"
}

const base_scripts_webpack = {
    ...package_json_script,
    build: "webpack",
    watch: "webpack -w"
}

const base_scripts_babel = {
    ...package_json_script,
    build: "babel src/ -d dist/ --source-maps",
    watch: "babel -w src/ -d dist/ --source-maps"
}

export const scripts = {
    javascript: {
        rollup: {
            none: base_scripts_rollup,
            eslint: {
                postinstall: "eslint --init",
                ...base_scripts_rollup,
            }
        },
        webpack: {
            none: base_scripts_webpack,
            eslint: {
                postinstall: "eslint --init",
                ...base_scripts_webpack,
            }
        },
        babel: {
            none: base_scripts_babel,
            eslint: {
                postinstall: "eslint --init",
                lint: "eslint src",
                ...base_scripts_babel
            }
        }
    },
    typescript: {
        rollup: {
            none: base_scripts_rollup,
            tslint: {
                postinstall: "tslint --init",
                lint: "tslint -c tslint.json 'src/**/*.ts'",
                ...base_scripts_rollup,
            }
        },
        webpack: {
            none: base_scripts_webpack,
            tslint: {
                postinstall: "tslint --init",
                ...base_scripts_webpack,
            }
        }
    }
}

export const config_files = {
    rollup: "rollup.config.js",
    webpack: "webpack.config.js",
    babel: ".babelrc"
}