const { createQuestions } = require('./createQuestions');

const obtainGenericData = async questions => {
	if (!Array.isArray(questions)) return {};

	const { length } = questions;

	if (length === 0) return {};

	const [{ question, id, default: fromDafault, type, choices }, ...next] =
		questions;

	return {
		...(await createQuestions({
			question,
			id,
			default: fromDafault,
			type,
			choices
		})),
		...(await obtainGenericData(next))
	};
};

module.exports = { obtainGenericData };
