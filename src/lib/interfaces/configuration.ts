export interface Configuration {
  REMOTE: {
    API: string,
    OWNER: string,
    REPOSITORY: string,
  };
  LABELS: {
    PRIORITY: string,
    MERGEABLE: string,
  };
  SETTINGS: {
    REBASE: boolean,
  };
}
