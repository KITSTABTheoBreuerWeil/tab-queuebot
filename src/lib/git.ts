import * as fs from 'fs';
import * as path from 'path';

import { getConfig } from '../config';
import { execSyncWithOutput } from './helpers';

/* TODO is it possible to type variables as they are destructured? Or is this
 * implicit from the typing in the source file? */

const {
  REMOTE: {
    DOMAIN
  },
  SETTINGS: {
    REBASE
  }
} = getConfig();

/* repository helpers */

const createRepositoryURL = (domain: string = DOMAIN): string => {
  return domain + path.posix.join(
    process.env.REPOSITORY_OWNER,
    process.env.REPOSITORY_NAME 
  );
};

const createRepositoryPath = (): string => {
  return `${__dirname}/../${process.env.REPOSITORY_NAME}`;
};

const haveClonedRepository = (): boolean => {
  return fs.existsSync(createRepositoryPath());
};

const cloneRepository = (): number => {
  return execSyncWithOutput(`git clone ${createRepositoryURL()}`);
};

const cloneRepositoryIfAbsent = (): number => {
  if (!haveClonedRepository()) {
    return cloneRepository();
  };

  return 0;
};

const runWithinRepository = (operation: () => void): void => {
  cloneRepositoryIfAbsent();

  const initialDirectory = process.cwd();
  process.chdir(createRepositoryPath());

  operation();

  process.chdir(initialDirectory)
};

/* rebase functions */

const doRebaseOperation = (branchName: string): void => {
  execSyncWithOutput(`git fetch && git checkout ${branchName}`);
  execSyncWithOutput('git rebase origin/develop');
  execSyncWithOutput(`git push --force-with-lease ${branchName}`);
};

export const rebaseBranch = (branchName: string): void => {
  if (REBASE as boolean) {
    return runWithinRepository(() => doRebaseOperation(branchName));
  };
};
