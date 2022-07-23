const clone = require('git-clone/promise');
const alert = require('cli-alerts');
const fs = require('fs-extra');
const { templateData } = require('../common/constants');

const defaultTemplate = 'juandac/ase-template-';


const cloneTemplate = async ({ debug, template } = {}) => {
  if (!template.includes('/'))
    template = `${defaultTemplate}${template}`;

  try {
    debug && console.log(`Installing template ${template}...`);
    const moduleDirectory = debug ? `./name-project` : `.`;
    await fs.ensureDir(moduleDirectory);
    const repository = `https://github.com/${template}.git`;
    await clone(repository, moduleDirectory);
    return moduleDirectory;
  } catch (error) {
    if (error.message.includes('git clone')) {
      console.log({
        type: `error`,
        name: `ERROR LOG`,
        msg: `Dependency not exists`
      });
      return '';
    }
    console.error(error);
    return '';
  }
}

const init = async ({ debug, template } = {}) => {
  const directory = await cloneTemplate({ debug, template });
  if (!directory)
    return;
  const templateDateConfig = await fs.readJson(`${directory}/${templateData}`);

  // TODO: Implementar preguntas para el usuario para rellenar el package.json

  const { questions } = templateDateConfig;
  if (Array.isArray(questions)) {
    for (const { question, id, default: fromDafault } of questions) {
      const answer = console.log({ name: id, message: question, default: fromDafault });
      console.log(answer);
    }
  }
  // TODO: Implementar la funcionalidad de guardar la configuración en el package.json
  // TODO: implementar la funcionalidad de guardar la configuración en el data-requets.json
  console.log(templateDateConfig);


}


module.exports = { init }