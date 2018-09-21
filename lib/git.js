const fs = require('fs');
const path = require('path');

const { getConfig, execSyncWithOutput } = require('./helpers');

/* This functionality has not been tested in practice. It is currently disabled
 * by default. */

const {
  REMOTE: { DOMAIN },
  SETTINGS: { REBASE }
} = getConfig();

/* repository helpers */

const createRepositoryURL = (domain = DOMAIN) => {
  return domain + path.posix.join(
    process.env.REPOSITORY_OWNER,
    process.env.REPOSITORY_NAME
  );
};

const createRepositoryPath = () => {
  return `${__dirname}/../${process.env.REPOSITORY_NAME}`;
};

const haveClonedRepository = () => {
  return fs.existsSync(createRepositoryPath());
};

const cloneRepository = () => {
  return execSyncWithOutput(`git clone ${createRepositoryURL()}`);
};

const cloneRepositoryIfAbsent = () => {
  if (!haveClonedRepository()) {
    return cloneRepository();
  }
};

const runWithinRepository = (operation) => {
  cloneRepositoryIfAbsent();

  const initialDirectory = process.cwd();
  process.chdir(createRepositoryPath());

  operation();

  process.chdir(initialDirectory)
};

/* rebase functions */

const performRebase = (branchName) => {
  execSyncWithOutput(`git fetch && git checkout ${branchName}`);
  execSyncWithOutput('git rebase origin/develop');
  execSyncWithOutput(`git push --force-with-lease ${branchName}`);
};

const rebase = (branchName) => {
  if (REBASE) {
    return runWithinRepository(() => performRebase(branchName));
  }
};

module.exports = {
  rebase
}
