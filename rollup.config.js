import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		external: [...Object.keys(pkg.dependencies), ...["path", "fs", "process", "util", "child_process"]],
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