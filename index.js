#!/usr/bin/env node
"use strict";
// @ts-check
/**
 * asepm
 * Aseprite Package Manager
 *
 * @author JuanDAC <https://www.linkedin.com/in/juandac/>
 */
// TODO:TEST: Add support for multiple dependencies in a single command (e.g. `asepm install juandac/foo juandac/bar`)
// TODO: Add gitinore file and ignore the path of the dependency './src/modules'
// TODO: add support for installing a template for initialize aseprite project
// (e.g. `asepm init --template=<template>`)
// (e.g. `asepm init --template=library`)
// (e.g. `asepm init --template=script`) by default it will install the template 'script'
// TODO: add support to install luaPlugins (e.g. `asepm install plugin juandac/lua-plugin`)
// TODO: add support for initializing aseprite project (e.g. `asepm init`)
// with the following structure:
// aseprite-package.json
// ├── src
// │   └── modules
// │       └── foo
// │       └── bar
// └── src
//     └── luaPlugins
//         └── lua-plugin



const init = require('./src/utils/init');
const cli = require('./src/utils/cli');
const log = require('./src/utils/log');

const { installAllFromPackage, installSpecific } = require('./src/commands/install')

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });

	const [command, ...others] = input;

	//** SINGLE COMMANDS */

	/**
	 * @type {command} help
	 * @description Get help for asepm commands
	 * @see https://www.npmjs.com/package/asepm#help
	 * @example asepm help
	 */
	if (command.includes(`help`) && args.length === 0)
		return cli.showHelp(0);

	/**
	 * @type {command} install
	 * @description Install asepm dependencies plugins and templates from asepm-package.json
	 * @see https://www.npmjs.com/package/asepm#install
	 * @example asepm install
	 * TODO: Add support for installing asepm dependencies plugins and templates from asepm-package.json
	 */
	if (command.includes(`install`) && args.length === 0)
		return await installAllFromPackage({ debug });

	const [subcommand, ...args] = others;

	//** SUBCOMMANDS */

	/**
	 * @type {command} install
	 * @description Install asepm specific plugins
	 * @see https://www.npmjs.com/package/asepm#install
	 * @example asepm install plugin <plugon-author>/<plugin-name>
	 * @example asepm install plugin <plugon-author>/<plugin-name> <plugon-author>/<plugin-name>
	 */
	if (command.includes(`install`) && subcommand.includes('plugin') && args.length >= 1)
		return await installPlugin({ debug, dependencies: args });

	/**
	 * @type {command} install
	 * @description Install asepm specific dependencies
	 * @see https://www.npmjs.com/package/asepm#install
	 * @example asepm install <dependency-author>/<dependency-name>
	 * @example asepm install <dependency-author>/<dependency-name> <dependency-author>/<dependency-name>
	 */
	if (command.includes(`install`) && others.length >= 1)
		return await installSpecific({ debug, dependencies: others });


	debug && log(flags);
})();
