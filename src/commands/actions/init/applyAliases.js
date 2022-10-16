const { replaceElementsInFile } = require('./replaceElementsInFile');

const applyAliases = async ({ filesToReplace, data, directory }) => {
	if (!Array.isArray(filesToReplace)) return;

	const { length } = filesToReplace;

	if (length === 0) return;

	const [{ file, replace: elementsToReplace }, ...next] = filesToReplace;

	await replaceElementsInFile({ elementsToReplace, file, data, directory });
	await applyAliases({ filesToReplace: next, data, directory });
};

module.exports = { applyAliases };
