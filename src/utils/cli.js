"use strict";
// @ts-check
const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	template: {
		type: `string`,
		default: `juandac/ase-template-script`,
		alias: `t`,
		desc: `Define a template to use`
	}
};

const commands = {
	help: { desc: `Print help info` },
	install: { desc: `Install all the dependencies in your project` },
	['install <foo>']: { desc: `Add the <foo> dependency to your project` },
	init: { desc: `Create a aseprite-package.json file and base of aseprite project` }
};

const helpText = meowHelp({
	name: `asepm`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
