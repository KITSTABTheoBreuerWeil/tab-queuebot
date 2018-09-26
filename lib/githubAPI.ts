import axios, { AxiosResponse } from 'axios';
import path from 'path';

import { getConfig, asBase64 } from './helpers';

import {
  RequestHeaders,
  PullRequestPatchPayload
} from './githubAPI.interfaces';

const {
  REMOTE: { API }
} = getConfig();

/* helper methods */

export const createPullRequestsURL = (api: string = API): string => {
  return api + path.posix.join(
    'repos',
    process.env.REPOSITORY_OWNER,
    process.env.REPOSITORY_NAME,
    'pulls'
  );
}

export const createPullRequestURLByNumber = (prNumber: number) => {
  return path.posix.join(createPullRequestsURL(), prNumber.toString());
};

export const createAuthorisationHeaders = (): RequestHeaders => {
  const {
    USERNAME,
    ACCESS_TOKEN
  } = process.env;

  const authorisation = asBase64(
    `${USERNAME as string}:${ACCESS_TOKEN as string}`
  );

  return { 'Authorization': `Basic ${authorisation}` };
};

/* API requests */

export const getPullRequests = (): Promise<AxiosResponse> => (
  axios({
    method: 'get',
    url: createPullRequestsURL(),
    headers: createAuthorisationHeaders(),
  })
);


export const patchPullRequestByNumber = (
  prNumber: number,
  data: PullRequestPatchPayload = {}
) => (
  axios({
    method: 'patch',
    url: createPullRequestURLByNumber(prNumber),
    headers: createAuthorisationHeaders(),
    data
  })
);
