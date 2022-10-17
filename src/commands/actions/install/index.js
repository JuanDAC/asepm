const { getPackageFile } = require('../common/constants');
const log = require('../../../utils/log');
const { getAllDependencies } = require('./getAllDependencies');
const { installDependency } = require('./installDependency');
const { addDependencyPackage } = require('./addDependencyPackage');

const installAllFromPackage = async flags => {
	const { debug } = flags;
	debug && log('Installing all...');
	try {
		const { dependencies } = await getPackageFile(flags);
		debug && log(dependencies);
		const allDependencies = await getAllDependencies(dependencies);
		debug && log(allDependencies);

		if (Array.isArray(allDependencies))
			allDependencies.forEach(installDependency(flags));
	} catch (error) {
		console.error(error);
	}
};

const installSpecific = async flags => {
	const { debug, dependencies } = flags;
	debug && log('Installing specific...');
	try {
		const allDependencies = await getAllDependencies(dependencies);
		debug && log(allDependencies);

		if (Array.isArray(dependencies))
			allDependencies.forEach(async dependency => {
				log({
					type: `info`,
					name: `INSTALL`,
					msg: `- ${dependency}`
				});
				const installed = await installDependency(flags)(dependency);

				if (installed)
					await addDependencyPackage({ ...flags, dependency });

				if (!installed)
					log({
						type: `error`,
						name: `ERROR ON INSTALL`,
						msg: `- ${dependency}`
					});
			});
	} catch (error) {
		console.error(error);
	}
};

module.exports = { installSpecific, installAllFromPackage };
