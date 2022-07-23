const fs = require('fs-extra')
const clone = require('git-clone/promise');
const alert = require('cli-alerts');
const { packageFile, modulesDirectory } = require('../common/constants');

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

const addDependencyPackage = async ({ debug, dependency }) => {
  debug && console.log(`Adding ${dependency}...`);
  const package = await getPackageFile({ debug });
  package.dependencies ??= [];
  package.dependencies.push(dependency);
  await fs.writeJson(packageFile, package)
}

const installDependency = ({ debug, directory }) => async (dependency) => {
  try {
    debug && console.log(`Installing ${dependency}...`);
    const moduleDirectory = `${directory}/${dependency}`;
    await fs.ensureDir(moduleDirectory);
    const repository = `https://github.com/${dependency}.git`;
    await clone(repository, moduleDirectory);
    return true;
  } catch (error) {
    if (error.message.includes('git clone')) {
      alert({
        type: `error`,
        name: `ERROR LOG`,
        msg: `Dependency not exists`
      });
      return false;
    }
    console.error(error);
    return false;
  }
}

/** EXPORTING */

const installAllFromPackage = async ({ debug }) => {
  debug && console.log('Installing all...');
  try {
    const { dependencies } = await getPackageFile({ debug });
    if (Array.isArray(dependencies)) {
      dependencies.forEach(installDependency({ debug, directory: modulesDirectory }));
    }
  } catch (error) {
    console.error(error);
  }
};


const installSpecific = async ({ debug, dependencies }) => {
  debug && console.log('Installing specific...');
  try {
    if (Array.isArray(dependencies))
      dependencies.forEach(async (dependency) => {
        const installed = await installDependency({ debug, directory: modulesDirectory })(dependency);
        installed && await addDependencyPackage({ debug, dependency });
      });
  } catch (error) {
    console.error(error);
  }

};

module.exports = { installSpecific, installAllFromPackage }