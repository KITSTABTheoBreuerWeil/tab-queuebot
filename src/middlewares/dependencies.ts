import { Request, Response } from 'express';

import {
  getConfig,
} from '../config';

import {
  Configuration,
  createGithubAPIService,
  createURLService,
  GithubAPIService,
  URLService,
} from '../lib';

interface Services {
  githubAPIService: GithubAPIService;
  urlService: URLService;
}

declare global {
  namespace Express {
    interface Request {
      services: Services;
    }
  }
}

const buildURLService = (config: Configuration) => (
  createURLService({
    api: config.REMOTE.API,
    owner: config.REMOTE.OWNER,
    repository: config.REMOTE.REPOSITORY,
  })
);

const buildGithubAPIService = (urlService: URLService) => (
  createGithubAPIService({
    token: process.env.ACCESS_TOKEN,
    urlService,
    username: process.env.USERNAME,
  })
);

export const dependencyInjector = (
  request: Request,
  _: Response,
  next: () => void,
): void => {
  const config = getConfig();
  const url = buildURLService(config);
  const github = buildGithubAPIService(url);

  request.services = {
    githubAPIService: github,
    urlService: url,
  };

  next();
};
