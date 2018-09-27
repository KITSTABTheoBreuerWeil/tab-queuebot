import { Configuration } from './config.interfaces';

export const developmentConfig: Configuration = {
  LABELS: {
    MERGEABLE: 'Ready to merge',
    PRIORITY: 'High priority',
  },
  REMOTE: {
    API: 'https://api.github.com/',
    DOMAIN: 'https://github.com/',
  },
  SETTINGS: {
    REBASE: false,
  },
};
