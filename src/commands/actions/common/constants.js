const fs = require('fs-extra');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const modulesDirectory = '/src/modules';
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

const moduleDirectory = debug => `.`;

const getPackageFile = async ({ debug }) => {
	await fs.ensureDir(moduleDirectory(debug));
	const pathFilePackage = `${moduleDirectory(debug)}${packageFile}`;
	const exists = await fs.pathExists(pathFilePackage);
	if (!exists) {
		debug && console.log('Creating package file...');
		await fs.ensureFile(pathFilePackage);
		await fs.writeJson(pathFilePackage, {});
	}
	const package = await fs.readJson(pathFilePackage);
	return package;
};

const pushPackageFile = async ({ debug, data }) => {
	const pathFilePackage = `${moduleDirectory(debug)}${packageFile}`;
	const package = await getPackageFile({ debug });
	await fs.writeJson(pathFilePackage, { ...package, ...data }, { spaces: 2 });
};
const titleRender = async () => {
	const message = `ASEPM`;
	console.log(await figletPromise(message));
	console.log(chalk.magenta(`ASEPM is ASEprite Package Manager`));
};

module.exports = {
	modulesDirectory,
	packageFile,
	templateData,
	getPackageFile,
	pushPackageFile,
	titleRender
};
