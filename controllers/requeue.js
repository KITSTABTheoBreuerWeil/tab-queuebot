const axios = require('axios');

const {
  getAuthorisationHeaders,
  getPullRequestsURL,
  getPullRequestTitleObject,
} = require('./helpers');


const fetchPullRequests = async (owner, repository) => axios({
  method: 'get',
  url: getPullRequestsURL(),
  headers: getAuthorisationHeaders(),
});

module.exports = async (request, response) => {
  console.log('received webhook > fetching pull requests...');
  let pullRequests;

  try {
    const response = await fetchPullRequests();
    console.log('received pull requests > parsing titles...');
    pullRequests = response.data;
  } catch (e) {
    console.log('FATAL: failed to fetch pull requests');
    return console.log(e.message);
  }

  const titleObjects = pullRequests.map(({ title, number }) => {
    return getPullRequestTitleObject(title, number);
  });

  titleObjects
    .filter(pr => pr.isQueued())
    .sort((a, b) => a.position - b.position)
    .forEach((pr, index) => pr.update(index + 1));
};
