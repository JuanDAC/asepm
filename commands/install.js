const fs = require('fs-extra')
const clone = require('git-clone/promise');
const alert = require('cli-alerts');
const { packageFile, modulesDirectory } = require('./constants');

const getPackageFile = async ({ debug }) => {
  const exists = await fs.pathExists(packageFile)
  if (!exists) {
    debug && console.log('Creating package file...');
    await fs.ensureFile(packageFile)
    await fs.writeJson(packageFile, {})
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

const installDependency = ({ debug }) => async (dependency) => {
  try {
    debug && console.log(`Installing ${dependency}...`);
    const moduleDirectory = `${modulesDirectory}/${dependency}`;
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

const installAll = async ({ debug }) => {
  debug && console.log('Installing all...');
  try {
    const { dependencies } = await getPackageFile({ debug });
    if (Array.isArray(dependencies)) {
      dependencies.forEach(installDependency({ debug }));
    }
  } catch (error) {
    console.error(error);
  }
};

invalidFormat = (dependency) => {
  return !dependency
    || dependency.length === 0
    || !dependency.includes('/')
    || dependency.includes('\n')
    || dependency.includes('\r')
    || dependency.includes('\t')
    || dependency.includes(' ')
    || dependency.includes('\0');
}

const installSingle = async ({ debug, dependency }) => {
  if (invalidFormat(dependency)) {
    debug && console.log('Invalid dependency...');
    return;
  }
  debug && console.log('Installing single...');
  try {
    const installed = await installDependency({ debug })(dependency);
    installed && await addDependencyPackage({ debug, dependency })
  } catch (error) {
    console.error(error);
  }

};

module.exports = { installAll, installSingle }