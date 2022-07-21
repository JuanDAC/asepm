#!/usr/bin/env node
"use strict";
// @ts-check
/**
 * asepm
 * Aseprite Package Manager
 *
 * @author JuanDAC <https://www.linkedin.com/in/juandac/>
 */
// TODO: Add support for multiple dependencies in a single command (e.g. `asepm install juandac/foo juandac/bar`)
// TODO: Add gitinore file and ignore the path of the dependency './src/modules'
// TODO: add support for installing a template for initialize aseprite project
// (e.g. `asepm init --template=<template>`)
// (e.g. `asepm init --template=library`)
// (e.g. `asepm init --template=script`)
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



const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const { installAll, installSingle } = require('./commands/install')

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });

	if (input.includes(`help`))
		return cli.showHelp(0);

	if (input.includes(`install`, 0) && input.length === 2)
		return await installSingle({ debug, dependency: input[1] });

	if (input.includes(`install`, 0))
		return await installAll({ debug });

	debug && log(flags);
})();
