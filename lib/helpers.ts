import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import YAML from 'yaml';

import { Configuration } from './helpers.interfaces';

const PATH_TO_CONFIG: string = `${__dirname}/../config.yaml`;

export const getConfig = (path: string = PATH_TO_CONFIG): Configuration => {
  return YAML.parse(readFileSync(path).toString()) as Configuration;
};

export const asBase64 = (text: string): string => {
  return Buffer.from(text).toString('base64');
}

export const execSyncWithOutput = (command: string): number => {
  try {
    execSync(command, { stdio: [0, 1, 2] });
    return 0;
  }
  catch (error) {
    return (error.status as number) || 1;
  };
};
