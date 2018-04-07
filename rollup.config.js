import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		external: ['ncp','inquirer'],
		output: [
			{ file: pkg.main, format: 'cjs' },
		],
		treeshake: true,
		plugins: [
			resolve(),
			commonjs()
		]
	}
];