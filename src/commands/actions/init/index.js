const clone = require('git-clone/promise');
const alert = require('cli-alerts');
const fs = require('fs-extra');
const { templateData, getPackageFile, packageFile } = require('../common/constants');

const figlet = require('figlet');
const { createSpinner } = require('nanospinner');
const chalk = require("chalk");
const gradient = require('gradient-string');
var Spinner = require('cli-spinner').Spinner;
var inquirer = require('inquirer');
const { questionsDefault } = require('./data');
const replace = require('replace-in-file');




const defaultTemplate = 'juandac/ase-template-';

const figletPromise = (message) => new Promise((resove) => figlet(message, (err, data) =>
  (err)
    ? resove(gradient.pastel(message))
    : resove(gradient.pastel(data))
));

const cloneTemplate = async ({ debug, template } = {}) => {
  if (!template.includes('/'))
    template = `${defaultTemplate}${template}`;

  try {
    console.log(`Installing the template ${chalk.cyan(template)}`);
    const moduleDirectory = debug ? `./name-project` : `.`;
    await fs.ensureDir(moduleDirectory);
    const repository = `https://github.com/${template}.git`;
    await clone(repository, moduleDirectory);
    return [moduleDirectory, template];
  } catch (error) {
    if (error.message.includes('git clone')) {
      console.log({
        type: `error`,
        name: `ERROR LOG`,
        msg: `Dependency not exists`
      });
      return [''];
    }
    console.error(error);
    return [''];
  }
}


const createQuestions = async ({ debug, data, question, id, default: fromDafault, type = 'input', choices } = {}) => {
  const answer = await inquirer.prompt({
    name: id,
    message: question,
    type,
    choices,
    default() {
      if (data[fromDafault])
        return data[fromDafault];
      return fromDafault;
    }
  });
  return answer;
};

const init = async ({ debug, template: templateRaw } = {}) => {
  const [directory, template] = await cloneTemplate({ debug, template: templateRaw });
  if (!directory)
    return;

  /**
   * show the title of the program and description
   */
  const message = `ASEPM`;
  console.log(await figletPromise(message));
  console.log(chalk.magenta(`ASEPM is ASEprite Package Manager`));
  /**
   * obtain the generic data of the project
   */
  let data = {};
  for (const { question, id, default: fromDafault, type, choices } of questionsDefault) {
    data = {
      ...data,
      ...(await createQuestions({ debug, question, id, default: fromDafault, type, choices, data }))
    };
  }
  const templateDateConfig = await fs.readJson(`${directory}/${templateData}`);

  /**
   * Obtain the data for the template specified in the templateData file
   */
  const { questions } = templateDateConfig;
  if (Array.isArray(questions)) {
    for (const { question, id, default: fromDafault, type, choices } of questions) {
      data = {
        ...data,
        ...(await createQuestions({ debug, question, id, default: fromDafault, type, choices, data }))
      };
    }
  }


  /**
   * Replace in file the template data with the new data and save the file in the project directory
   */
  const { filesToReplace } = templateDateConfig;
  if (Array.isArray(questions)) {
    for (const { file, replace: elementsToReplace } of filesToReplace) {
      if (Array.isArray(elementsToReplace)) {
        for (const key of elementsToReplace) {
          const results = await replace({ files: `${directory}/${file}`, from: new RegExp(`\\[\\<${key}\\>\\]`, 'g'), to: data[key], countMatches: true, });
        }
      }
    }
  }



  debug && console.log(`Adding information to JSON...`);
  const package = await getPackageFile({ debug });
  await fs.writeJson(packageFile, { ...package, information: data, template });
}


module.exports = { init }