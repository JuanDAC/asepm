'use strict';
// @ts-check
const alert = require('cli-alerts');

module.exports = info => {
	if (
		typeof info === 'object' &&
		Object.keys(info).includes('type') &&
		Object.keys(info).includes('name') &&
		Object.keys(info).includes('msg')
	)
		return alert(info);

	alert({
		type: `warning`,
		name: `DEBUG LOG`,
		msg: ``
	});

	console.log(info);
	console.log();
};
