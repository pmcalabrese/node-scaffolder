import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import json from 'rollup-plugin-json';
import { terser } from "rollup-plugin-terser";

const Config = [
	{
		input: 'src/index.js',
		external: [...Object.keys(pkg.dependencies), ...["path", "fs", "process", "util", "child_process"]],
		output: [
			{ file: pkg.main, format: 'cjs' },
		],
		treeshake: true,
		plugins: [
			resolve(),
			commonjs(),
			json()
		]
	}
];

if (process.env.NODE_ENV === 'production') {
	Config[0].plugins.push(terser());
}

export default Config;