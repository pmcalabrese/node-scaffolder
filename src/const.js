export const devDependencies = {
    javascript: {
        rollup: {
            none: {
                "rollup": "^0.57.1"
            },
            eslint: {
                "rollup": "^0.57.1",
                "rollup-plugin-eslint": "^4.0.0",
                "eslint": "4.19.1"
            }
        },
        webpack: {
            none: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14"
            },
            eslint: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "eslint-loader": "latest",
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
                "typescript": "2.8.1",
                "rollup-plugin-typescript": "^0.8.1",
                "rollup": "^0.57.1"
            },
            tslint: {
                "typescript": "2.8.1",
                "rollup-plugin-typescript": "^0.8.1",
                "rollup": "^0.57.1",
                "rollup-plugin-tslint": "^0.1.34"
            }
        },
        webpack: {
            none: {
                "typescript": "2.8.1",
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "ts-loader": "^4.1.0"
            },
            tslint: {
                "typescript": "2.8.1",
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
    build: "rollup --config",
    watch: "rollup --config -w"
}

const base_scripts_webpack = {
    build: "webpack",
    watch: "webpack -w"
}

const base_scripts_babel = {
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