const { ensureDir, pathExists, remove } = require('fs-extra');
const gitClone = require('git-clone/promise');
const alert = require('cli-alerts');
const log = require('../../../utils/log');
const { moduleDirectory, modulesPath } = require('../common/constants');

const installDependency = flags => async dependency => {
	const { debug } = flags;
	try {
		console.log(moduleDirectory(flags));
		const projectDirectory = `${moduleDirectory(
			flags
		)}${modulesPath}/${dependency}`;
		if (await pathExists(projectDirectory)) {
			log({
				type: `info`,
				name: `UPDATE`,
				msg: `> ${dependency}`
			});
			await remove(projectDirectory);
		}
		await ensureDir(projectDirectory);
		const repository = `https://github.com/${dependency}.git`;
		log({
			type: `info`,
			name: `INSTALLING`,
			msg: `+ ${dependency} from ${repository}.`
		});
		await gitClone(repository, projectDirectory);
		await remove(`${projectDirectory}/tsconfig.json`);
		return true;
	} catch (error) {
		if (error.message.includes('git clone')) {
			debug && log(error);
			alert({
				type: `error`,
				name: `ERROR LOG`,
				msg: `Dependency not exists`
			});
			return false;
		}
		console.error(error);
		return false;
	}
};
exports.installDependency = installDependency;
