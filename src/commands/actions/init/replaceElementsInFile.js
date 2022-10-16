const replaceInFile = require('replace-in-file');

const replaceElementsInFile = async ({
	elementsToReplace,
	data,
	file,
	directory
}) => {
	if (!Array.isArray(elementsToReplace)) return;

	const { length } = elementsToReplace;

	if (length === 0) return;

	const [key, ...next] = elementsToReplace;

	await replaceInFile({
		files: `${directory}/${file}`,
		from: new RegExp(`\\[\\<${key}\\>\\]`, 'g'),
		to: data[key],
		countMatches: true
	});
	await replaceElementsInFile({
		elementsToReplace: next,
		data,
		file,
		directory
	});
};

module.exports = { replaceElementsInFile };
