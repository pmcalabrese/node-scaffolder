// rollup.config.js

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: process.env.NODE_ENV === 'production' ? false : true
    },
    treeshake: true
};