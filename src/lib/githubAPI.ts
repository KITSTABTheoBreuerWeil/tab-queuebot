import axios from 'axios';
import * as path from 'path';

import { getConfig } from '../config';
import { asBase64 } from './helpers';

// typings

import {
  RequestHeaders,
  PullRequestPatchPayload,
  APIGetPullRequestsResponse,
  APIPatchPullRequestResponse,
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

  const authorisation = asBase64( `${USERNAME}:${ACCESS_TOKEN}`);
  return { 'Authorization': `Basic ${authorisation}` };
};

/* API requests */

export const getPullRequests = (): Promise<APIGetPullRequestsResponse> => (
  axios({
    method: 'get',
    url: createPullRequestsURL(),
    headers: createAuthorisationHeaders(),
  })
);


export const patchPullRequestByNumber = (
  prNumber: number,
  data: PullRequestPatchPayload = {}
): Promise<APIPatchPullRequestResponse> => (

  axios({
    method: 'patch',
    url: createPullRequestURLByNumber(prNumber),
    headers: createAuthorisationHeaders(),
    data
  })
);
