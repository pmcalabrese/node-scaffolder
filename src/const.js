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
                "babel": "^6.23.0",
                "babel-cli": "^6.26.0",
                "babel-preset-node8": "^1.2.0"
            },
            eslint: {
                "babel": "^6.23.0",
                "babel-cli": "^6.26.0",
                "babel-preset-node8": "^1.2.0",
                "eslint": "4.19.1"
            }
        }
    },
    typescript: {
        rollup: {
            none: {
                "rollup-plugin-typescript": "^0.8.1",
                "rollup": "^0.57.1"
            }
        },
        webpack: {
            none: {
                "webpack": "^4.5.0",
                "webpack-cli": "^2.0.14",
                "typescript": "2.8.1",
                "ts-loader": "^4.1.0"
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
            eslint: {
                postinstall: "eslint --init",
                ...base_scripts_rollup,
            }
        },
        webpack: {
            none: base_scripts_webpack,
            eslint: {
                postinstall: "eslint --init",
                ...base_scripts_rollup,
            }
        }
    }
}

export const config_files = {
    rollup: "rollup.config.js",
    webpack: "webpack.config.js",
    babel: ".babelrc"
}