#!/usr/bin/env node
"use strict";
// @ts-check
/**
 * asepm
 * Aseprite Package Manager
 *
 * @author JuanDAC <https://www.linkedin.com/in/juandac/>
 */
// TODO:TEST: Add support for multiple dependencies in a single command (e.g. `asepm install dependency juandac/foo juandac/bar`)
// TODO: Add gitinore file and ignore the path of the dependency './src/modules'
// TODO: add support for installing a template for initialize aseprite project
// (e.g. `asepm init --template=<template>`)
// (e.g. `asepm init --template=library`)
// (e.g. `asepm init --template=script`) by default it will install the template 'script'
// TODO: add support to install luaPlugins (e.g. `asepm install plugin juandac/ase-plugin-name`)
// TODO: add support for initializing aseprite project (e.g. `asepm init`)
// with the following structure:
// aseprite-package.json
// ├── src
// │   └── modules
// │       └── foo
// │       └── bar
// └── lua-plugins
//     └── ase-plugin-name

// aseprite template for script project

const init = require('./src/utils/init');
const cli = require('./src/utils/cli');
const log = require('./src/utils/log');

const { selectorSingle } = require('./src/commands/selectors/single');
const { selectorSubcommand } = require('./src/commands/selectors/subcommand');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });

	const [command, subcommand] = [...input, null, null, null];

	debug && log(flags);

	//** SINGLE COMMANDS */
	if (command === null)
		return log('Information about the command is required');

	if (subcommand === null)
		return selectorSingle({ flags, command, args: input.slice(1), cli });

	return selectorSubcommand({ flags, command, subcommand, args: input.slice(2), cli });
})();
