const chalk = require('chalk');
const { ensureDir } = require('fs-extra');
const gitClone = require('git-clone');
const log = require('../../../utils/log');
const { moduleDirectory } = require('../common/constants');
const { defaultTemplate } = require('./data');

const cloneTemplate = async flags => {
	const { template } = flags;

	if (!template.includes('/')) template = `${defaultTemplate}${template}`;
	try {
		log({
			type: `info`,
			name: `LOG`,
			msg: `Installing the template ${chalk.cyan(template)}`
		});
		await ensureDir(moduleDirectory(flags));
		const repository = `https://github.com/${template}.git`;
		await gitClone(repository, moduleDirectory(flags));
		return [moduleDirectory(flags), template];
	} catch (error) {
		if (error.message.includes('git clone')) {
			log({
				type: `error`,
				name: `ERROR LOG`,
				msg: `Dependency not exists`
			});
			return [''];
		}
		console.error(error);
		return [''];
	}
};

module.exports = {
	cloneTemplate
};
