const fs = require('fs-extra');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const modulesPath = '/src/modules';
const templateData = '/data-requets.json';
const packageFile = '/asepm-package.json';

const figletPromise = message =>
	new Promise(resove =>
		figlet(message, (err, data) =>
			err
				? resove(gradient.pastel(message))
				: resove(gradient.pastel(data))
		)
	);

// TODO: add get debug from flags object and get dorectory from flasg object
const moduleDirectory = ({ directory }) =>
	typeof directory === 'string' ? directory : '.';

const getPackageFile = async flags => {
	const { debug } = flags;
	await fs.ensureDir(moduleDirectory(flags));
	const pathFilePackage = `${moduleDirectory(flags)}${packageFile}`;
	const exists = await fs.pathExists(pathFilePackage);
	if (!exists) {
		debug && console.log('Creating package file...');
		await fs.ensureFile(pathFilePackage);
		await fs.writeJson(pathFilePackage, {});
	}
	const package = await fs.readJson(pathFilePackage);
	return package;
};

const pushPackageFile = async flags => {
	const { data } = flags;
	const pathFilePackage = `${moduleDirectory(flags)}${packageFile}`;
	const package = await getPackageFile(flags);
	await fs.writeJson(pathFilePackage, { ...package, ...data }, { spaces: 2 });
};
const titleRender = async () => {
	const message = `ASEPM`;
	console.log(await figletPromise(message));
	console.log(chalk.magenta(`ASEPM is ASEprite Package Manager`));
};

module.exports = {
	moduleDirectory,
	packageFile,
	templateData,
	getPackageFile,
	pushPackageFile,
	titleRender,
	modulesPath
};
