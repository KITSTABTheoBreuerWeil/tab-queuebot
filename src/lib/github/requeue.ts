import {
  compose,
  filter,
  sortBy,
} from 'lodash/fp';

import {
  APIPullRequestObject,
  GetPullRequestsResponse,
  GithubAPIService,
  PullRequest,
} from '../interfaces';

import { pullRequestObjectFromAPIData } from '../pullRequests';

const isQueued = (pr: PullRequest) => pr.isQueued();

/* Convert API responses to pull request objects, remove those that aren't
 * queued and sort the remainder by queue position. */

const pullRequestDataToObjects = (
  api: GithubAPIService,
  pullRequestsData: APIPullRequestObject[],
): PullRequest[] => (
  pullRequestsData.map((data: APIPullRequestObject) => (
    pullRequestObjectFromAPIData({ api, data })
  ))
);

const sortedUpdateCandidates = compose(
  sortBy<PullRequest>('position'),
  filter<PullRequest>(isQueued),
);

/* Pull request titles are 1-indexed. */

const updatePosition = (pullRequest: PullRequest, index: number): void => {
  const position: number = index + 1;

  if (pullRequest.shouldUpdate(position)) {
    try {
      pullRequest.updatePosition(position);
    } catch (error) {
      console.error(error.message);
    }
  }
};

export const requeue = async (api: GithubAPIService): Promise<void> => {
  let response: GetPullRequestsResponse;

  try {
    response = await api.getPullRequests();
  } catch (error) {
    return console.error(error.message);
  }

  /* we cast to inform the compiler that have not got an APIErrorResponse */
  const pullRequestsData = (response.data || []) as APIPullRequestObject[];

  /* this line is innocuous but it is doing all the work! */
  const pullRequestObjects = pullRequestDataToObjects(api, pullRequestsData);
  sortedUpdateCandidates(pullRequestObjects).forEach(updatePosition);
};
