// rollup.config.js
import eslint from 'rollup-plugin-eslint';
import { terser } from "rollup-plugin-terser";

const Config = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'production' ? false : true
    },
    treeshake: true,
    plugins: [
        eslint({ /* your options */ })
    ]
};

process.env.NODE_ENV === 'production' ? Config.plugins.push(terser()) : null;

export default Config;