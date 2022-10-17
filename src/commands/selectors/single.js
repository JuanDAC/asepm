const { init } = require('../actions/init');
const { installAllFromPackage } = require('../actions/install');

const selectorSingle = async ({ flags = {}, command = '', args, cli } = {}) => {
	const { debug } = flags;
	/**
	 * @type {command} help
	 * @description Get help for asepm commands
	 * @see https://www.npmjs.com/package/asepm#help
	 * @example asepm help
	 */
	if (command?.trim() === 'help' && args.length === 0) return cli.showHelp(0);

	/**
	 * @type {command} install
	 * @description Install asepm dependencies plugins and templates from asepm-package.json
	 * @author JuanDAC <https://www.linkedin.com/in/juandac/>
	 * @author JuanDAC <https://github.com/juandac/>
	 * @see https://www.npmjs.com/package/asepm#install
	 * @example asepm install
	 * TODO: Add support for installing asepm dependencies plugins and templates from asepm-package.json
	 */
	if (command?.trim() === 'install' && args.length === 0)
		return await installAllFromPackage(flags);

	/**
	 * @type {command} init [--template=<template>]
	 * @description Initialize aseprite project with a template (e.g. `asepm init --template=<template>`) or with the default template 'script'
	 * @author JuanDAC <https://www.linkedin.com/in/juandac/>
	 * @author JuanDAC <https://github.com/juandac/>
	 * @see https://www.npmjs.com/package/asepm#init
	 * @example asepm init
	 * @example asepm init --template=library
	 * @example asepm init --template=script
	 * @example asepm init --template=<template>
	 */
	if (command?.trim() === 'init' && args.length === 0)
		return await init(flags);
};

module.exports = {
	selectorSingle
};
