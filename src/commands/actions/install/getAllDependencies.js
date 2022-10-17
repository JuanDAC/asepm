const axios = require('axios');
const log = require('../../../utils/log');

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
		log({
			type: `error`,
			name: `ERROR ON DEPENDENCIES`,
			msg: `- ${dependency}`
		});
		log(error);
		return [...(await getAllDependencies(next))];
	}
};

exports.getAllDependencies = getAllDependencies;
