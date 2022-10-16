const axios = require('axios');
const fs = require('fs-extra');
const gitClone = require('git-clone/promise');
const alert = require('cli-alerts');
const {
	packageFile,
	modulesDirectory,
	getPackageFile
} = require('../common/constants');
const log = require('../../../utils/log');

// TODO: ge all dependencies from all ase-package.json and install them

const addDependencyPackage = async ({ debug, dependency }) => {
	debug && console.log(`Adding ${dependency}...`);
	const package = await getPackageFile({ debug });
	package.dependencies ??= [];
	package.dependencies.push(dependency);
	await fs.writeJson(packageFile, package);
};

const installDependency =
	({ debug, directory }) =>
	async dependency => {
		try {
			const moduleDirectory = `${directory}/${dependency}`;
			if (await fs.pathExists(moduleDirectory)) {
				log({
					type: `info`,
					name: `UPDATE`,
					msg: `> ${dependency}`
				});
				await fs.remove(moduleDirectory);
			}
			await fs.ensureDir(moduleDirectory);
			const repository = `https://github.com/${dependency}.git`;
			log({
				type: `info`,
				name: `INSTALLING`,
				msg: `+ ${dependency} from ${repository}.`
			});
			await gitClone(repository, moduleDirectory);
			await fs.remove(`${moduleDirectory}/tsconfig.json`);
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

/** EXPORTING */

const getAllDependencies = async dependencies => {
	if (!Array.isArray(dependencies)) return [];

	const { length } = dependencies;

	if (length === 0) return [];

	const [dependency, ...next] = dependencies;

	try {
		const { data } = await axios.get(
			`https://raw.githubusercontent.com/${dependency}/main/asepm-package.json`
		);
		return [
			dependency,
			...(await getAllDependencies(data.dependencies)),
			...(await getAllDependencies(next))
		];
	} catch (error) {
		console.log(error);
		return [...(await getAllDependencies(next))];
	}
};

const installAllFromPackage = async ({ debug }) => {
	debug && log('Installing all...');
	try {
		const { dependencies } = await getPackageFile({ debug });
		debug && log(dependencies);
		const allDependencies = await getAllDependencies(dependencies);
		debug && log(allDependencies);

		if (Array.isArray(dependencies))
			allDependencies.forEach(
				installDependency({ debug, directory: `.${modulesDirectory}` })
			);
	} catch (error) {
		console.error(error);
	}
};

const installSpecific = async ({ debug, dependencies }) => {
	debug && log('Installing specific...');
	try {
		if (Array.isArray(dependencies))
			dependencies.forEach(async dependency => {
				const installed = await installDependency({
					debug,
					directory: modulesDirectory
				})(dependency);
				installed &&
					(await addDependencyPackage({ debug, dependency }));
			});
	} catch (error) {
		console.error(error);
	}
};

module.exports = { installSpecific, installAllFromPackage };
