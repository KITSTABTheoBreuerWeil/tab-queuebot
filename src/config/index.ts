import { developmentConfig } from './development'; import { productionConfig } from './production';
import { testingConfig } from './testing';

// typings
import { Configuration } from './config.interfaces';

const modeErrorMessage = (mode: string) => {
  return `NODE_ENV (currently "${mode}") must be production, ` +
    `development or testing`;
};

export const getConfig = (): Configuration => {
  const mode = process.env.NODE_ENV;

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
