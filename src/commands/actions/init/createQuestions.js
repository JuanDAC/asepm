const { prompt } = require('inquirer');

const createQuestions = ({
	question: message,
	id: name,
	default: fromDafault,
	type = 'input',
	choices
} = {}) =>
	prompt({
		name,
		message,
		type,
		choices,
		default: () => fromDafault
	});

module.exports = { createQuestions };
