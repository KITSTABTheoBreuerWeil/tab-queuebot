import {
  compose,
  filter,
  map,
  sortBy
} from 'lodash/fp';

import { getPullRequests } from './githubAPI';

import {
  isQueued,
  PullRequest,
  pullRequestObjectFromAPIData
} from './pullRequest';

// typings

import {
  APIPullRequestsData,
  APIGetPullRequestsResponse
} from './githubAPI.interfaces';

/* Helper functions */

const sortedUpdateCandidates = compose(
  sortBy<PullRequest>('position'),
  filter(isQueued),
  map(pullRequestObjectFromAPIData),
);

const updatePosition = (
  pullRequest: PullRequest,
  index: number
): void => {

  const position: number = index + 1;

  if (pullRequest.shouldUpdate(position)) {
    try {
      pullRequest.updatePosition(position);
    }
    catch (error) {
      console.error(error.message);
    };
  };
};

/* The requeue function:
 *
 * Fetch all of the pull requests. Remove those that aren't numbered, sort by
 * numerical order (descending first) and then re-index starting from 1.
 */

export const requeue = async (): Promise<void> => {
  let response: APIGetPullRequestsResponse;

  try {
    response = await getPullRequests();
  }
  catch (error) {
    return console.error(error.message);
  };

  // we cast to inform the compiler that we account for an APIErrorResponse
  const pullRequestsData = (response.data || []) as APIPullRequestsData;
  sortedUpdateCandidates(pullRequestsData).forEach(updatePosition);
};
