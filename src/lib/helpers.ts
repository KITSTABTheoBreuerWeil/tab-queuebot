import { execSync } from 'child_process';

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
