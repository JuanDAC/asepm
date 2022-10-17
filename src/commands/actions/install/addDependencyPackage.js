const fs = require('fs-extra');
const log = require('../../../utils/log');
const {
	packageFile,
	getPackageFile,
	moduleDirectory
} = require('../common/constants');

const addDependencyPackage = async flags => {
	const { debug, dependency } = flags;
	debug && log(`Adding ${dependency}...`);
	const package = await getPackageFile(flags);
	package.dependencies ??= [];
	package.dependencies.push(dependency);
	await fs.writeJson(`${moduleDirectory(flags)}${packageFile}`, package, {
		spaces: 2
	});
};

module.exports = {
	addDependencyPackage
};
