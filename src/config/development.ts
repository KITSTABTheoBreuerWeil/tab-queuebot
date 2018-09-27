import { Configuration } from './config.interfaces';

export const developmentConfig: Configuration = {
  REMOTE: {
    DOMAIN: 'https://github.com/',
    API: 'https://api.github.com/'
  },
  LABELS: {
    PRIORITY: 'High priority',
    MERGEABLE: 'Ready to merge'
  },
  SETTINGS: {
    REBASE: false
  }
};
