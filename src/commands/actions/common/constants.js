const fs = require('fs-extra');

const modulesDirectory = './src/module';
const templateData = 'data-requets.json'
const packageFile = './asepm-package.json';

const getPackageFile = async ({ debug }) => {
  const exists = await fs.pathExists(packageFile)
  if (!exists) {
    debug && console.log('Creating package file...');
    await fs.ensureFile(packageFile);
    await fs.writeJson(packageFile, {});
  }
  const package = await fs.readJson(packageFile);
  return package;
}

module.exports = { modulesDirectory, packageFile, templateData, getPackageFile };