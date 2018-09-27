import { Configuration } from './config.interfaces';

export const productionConfig: Configuration = {
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
}
