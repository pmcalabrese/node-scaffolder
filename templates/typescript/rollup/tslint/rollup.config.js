// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'production' ? false : true
    },
    treeshake: true,
    plugins: [
        typescript()
    ]
};