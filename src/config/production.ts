import { Configuration } from '../lib';

export const productionConfig: Configuration = {
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
