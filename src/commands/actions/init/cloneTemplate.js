const chalk = require('chalk');
const { ensureDir } = require('fs-extra');
const gitClone = require('git-clone');

const cloneTemplate = async ({ debug, template } = {}) => {
	if (!template.includes('/')) template = `${defaultTemplate}${template}`;

	try {
		console.log(`Installing the template ${chalk.cyan(template)}`);
		const moduleDirectory = debug ? `./name-project` : `.`;
		await ensureDir(moduleDirectory);
		const repository = `https://github.com/${template}.git`;
		await gitClone(repository, moduleDirectory);
		return [moduleDirectory, template];
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
