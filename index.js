#!/usr/bin/env node
'use strict';
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
// TODO: add support to uninstall a dependency (e.g. `asepm uninstall dependency juandac/foo`)
// TODO: add support to update a dependency (e.g. `asepm update dependency juandac/foo`)
// TODO: add support to uninstall plugin (e.g. `asepm uninstall plugin juandac/foo`)
// TODO: add support to update plugin (e.g. `asepm update plugin juandac/foo`)
// TODO: add support to uninstall template (e.g. `asepm uninstall template juandac/foo`)
// TODO: add support to update template (e.g. `asepm update template juandac/foo`)
// TODO: add support to uninstall all dependencies (e.g. `asepm uninstall all`)
// TODO: add support to update all dependencies (e.g. `asepm update all`)

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
const inputDefault = [null, null, null];
const { clear, debug } = flags;

(async () => {
	init({ clear });

	const [command, subcommand] = [...input, ...inputDefault];

	debug && log(flags);

	if (command === null) {
		log({
			type: `warning`,
			name: `WARNING LOG`,
			msg: 'Information about the command is required'
		});
		selectorSingle({ flags, command: 'help', args: input.slice(1), cli });
	}

	if (subcommand === null)
		return selectorSingle({ flags, command, args: input.slice(1), cli });

	return selectorSubcommand({
		flags,
		command,
		subcommand,
		args: input.slice(2),
		cli
	});
})();
