import { Configuration } from '../lib';

import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testingConfig } from './testing';

const modeErrorMessage = (mode: string) => {
  return `ENVIRONMENT (currently "${mode}") must be production, ` +
    `development or testing`;
};

export const getConfig = (): Configuration => {
  const mode = process.env.ENVIRONMENT;

  switch (mode && mode.toLowerCase()) {
    case 'production':
      return productionConfig;
    case 'testing':
      return testingConfig;
    case 'development':
      return developmentConfig;
    default:
      throw new Error(modeErrorMessage(mode));
  }
};
