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
        }
    }
}

const base_script_rollup = {
    build: "rollup --config",
    watch: "rollup --config -w"
}

export const scripts = {
    javascript: {
        rollup: {
            none: base_script_rollup,
            eslint: {
                postinstall: "eslint --init",
                ...base_script_rollup,
            }
        }
    }
}

export const config_files = {
    rollup: "rollup.config.js"
}