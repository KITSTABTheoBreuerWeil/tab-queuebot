import { Configuration } from '../lib';

export const developmentConfig: Configuration = {
  LABELS: {
    MERGEABLE: 'Ready to merge',
    PRIORITY: 'High priority',
  },
  REMOTE: {
    API: 'https://api.github.com/',
    OWNER: 'kits',
    REPOSITORY: 'repo',
  },
  SETTINGS: {
    REBASE: false,
  },
};
