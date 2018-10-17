import { GithubAPIService } from './api';
import { URLService } from './url';

interface URLServiceProps {
  api: string;
  owner: string;
  repository: string;
}

export const createURLService = ({
  api,
  owner,
  repository,
}: URLServiceProps) => (
  new URLService(api, owner, repository)
);

interface GithubAPIServiceProps {
  token: string;
  urlService: URLService;
  username: string;
}

export const createGithubAPIService = ({
  username,
  urlService,
  token,
}: GithubAPIServiceProps) => (
  new GithubAPIService(
    username,
    token,
    urlService,
  )
);
