// rollup.config.js
import eslint from 'rollup-plugin-eslint';

export default {
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