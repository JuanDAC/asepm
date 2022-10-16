const fs = require('fs-extra');
const {
	templateData,
	pushPackageFile,
	titleRender
} = require('../common/constants');
const { questionsDefault } = require('./data');
const log = require('../../../utils/log');
const { cloneTemplate } = require('./cloneTemplate');
const { obtainGenericData } = require('./obtainGenericData');
const { applyAliases } = require('./applyAliases');

const init = async ({ debug, template: templateRaw } = {}) => {
	const [directory, template] = await cloneTemplate({
		debug,
		template: templateRaw
	});
	if (!directory) return;

	/**
	 * show the title of the program and description
	 */
	await titleRender();

	/**
	 * obtain the generic data of the project
	 */
	const dataDefault = await obtainGenericData(questionsDefault);

	debug && log(dataDefault);

	const templateDateConfig =
		(await fs.readJson(`${directory}${templateData}`)) ?? {};
	!debug && (await fs.remove(`${directory}${templateData}`));

	/**
	 * Obtain the data for the template specified in the templateData file
	 */
	const { questions } = templateDateConfig;
	const dataFromTemplate = await obtainGenericData(questions);

	debug && log(dataFromTemplate);

	const data = { ...dataFromTemplate, ...dataDefault };
	/**
	 * Replace in file the template data with the new data and save the file in the project directory
	 */
	const { filesToReplace } = templateDateConfig;
	applyAliases({ filesToReplace, data, directory });

	debug && log(`Adding information to JSON...`);

	await pushPackageFile({
		debug,
		data: { information: data, template, dependencies: [] }
	});
};

module.exports = { init };
