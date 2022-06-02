import babel from '@rollup/plugin-babel';
import path from 'path';
import {terser} from 'rollup-plugin-terser';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";


export default CLIArgs => {
  const bundle = {
    input: path.join(__dirname, 'tsc/src/index.js'),
    output: [
      {
        dir: 'dist',
        format: 'iife',
        sourcemap: true,
        name:"runtimeRenderer"
      },
    ],
  };
  bundle.plugins = [
    babel({
      babelHelpers: 'inline',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve(),
    terser(),
  ];
  return bundle;
};
