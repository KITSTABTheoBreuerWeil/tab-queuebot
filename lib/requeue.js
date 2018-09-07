const axios = require('axios');

const {
  compose,
  defaultTo,
  filter,
  map,
  sortBy
} = require('lodash/fp')

const { getPullRequests } = require('./githubAPI');

const {
  pullRequestObjectFromAPIData,
  isQueued
} = require('./pullRequest');

/* Helper functions */

const sortedUpdateCandidates = compose(
  sortBy('position'),
  filter(isQueued),
  map(pullRequestObjectFromAPIData),
);

/* The requeue function:
 *
 * Fetch all of the pull requests. Remove those that aren't numbered, sort by
 * numerical order (descending first) and then re-index starting from 1.
 */

const requeue = async () => {
  const response = await getPullRequests();
  const pullRequestsData = response.data || [];

  sortedUpdateCandidates(pullRequestsData).forEach((pullRequest, index) => {
    pullRequest.updatePosition(index + 1);
  });
};

module.exports = { requeue };
