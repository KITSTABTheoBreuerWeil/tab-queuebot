const childProcess = require('child_process');
const fs = require('fs');
const yaml = require('yaml-js');

const PATH_TO_CONFIG = `${__dirname}/../config.yaml`;

const getConfig = (path = PATH_TO_CONFIG) => {
  return yaml.load(fs.readFileSync(path));
};

const asBase64 = (string) => {
  return Buffer.from(string).toString('base64');
}

const execSyncWithOutput = (command) => {
  try {
    execSync(command, { stdio: [0, 1, 2] });
    return 0;
  }
  catch (error) {
    return error.status;
  };
};

module.exports = {
  asBase64,
  execSyncWithOutput,
  getConfig
}
