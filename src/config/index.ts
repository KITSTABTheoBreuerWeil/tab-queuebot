import { developmentConfig } from './development'; import { productionConfig } from './production';
import { testingConfig } from './testing';

// typings
import { Configuration } from './config.interfaces';

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
      throw new Error(`NODE_ENV (currently "${mode}") must` +
        ` be production, development or testing`
      );
  };
};
