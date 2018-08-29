// rollup.config.js
import typescript from 'rollup-plugin-typescript';
import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const Config = [
	// browser-friendly UMD build
	{
		input: 'src/index.ts',
		output: {
			name: 'howLongUntilLunch',
			file: pkg.browser,
			format: 'umd'
        },
        treeshake: true,
		plugins: [
			resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            typescript()
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
        input: 'src/index.ts',
        treeshake: true,
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
        ],
        plugins: [
            typescript(),
        ]
	}
];

if (process.env.NODE_ENV === 'production') {
	Config[0].plugins.push(terser());
	Config[1].plugins.push(terser());
}

export default Config;