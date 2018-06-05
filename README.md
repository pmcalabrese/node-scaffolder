# node-scaffolder

Node-scaffolder is an interactive command line tool to create Node.js project quickly. With it, with just 3 questions (which takes 10 seconds) you can scaffold a project with your favorite language (JS or TS) bundler (Babel, Webpack 4, Rollup, TSC) and test setup.

[![asciicast](https://asciinema.org/a/185638.png)](https://asciinema.org/a/185638)

## Install

    npm install node-scaffolder -g

## How it works

create a folder

    mkdir my_new_project

move in to that folder

    cd my_new_project

create a package.json file with

    npm init

now you can run npg

    node-scaffolder

follow the questions... and you are set, now you can run

    npm install

and finally

    npm start