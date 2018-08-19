// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";

const Config =  {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'production' ? false : true
    },
    treeshake: true,
    plugins: [
        typescript(),
    ]
};

process.env.NODE_ENV === 'production' ? Config.plugins.push(terser()) : null;

export default Config;