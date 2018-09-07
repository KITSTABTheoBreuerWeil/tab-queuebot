const axios = require('axios');
const path = require('path');

const { getConfig, asBase64 } = require('./helpers');

const {
  REMOTE: { API }
} = getConfig();

/* helper methods */

const createPullRequestsURL = (api = API) => {
  return api + path.posix.join(
    'repos',
    process.env.REPOSITORY_OWNER,
    process.env.REPOSITORY_NAME,
    'pulls'
  );
}

const createPullRequestURLByNumber = (number) => {
  return path.posix.join(createPullRequestsURL(), number);
};

const createAuthorisationHeaders = () => {
  const {
    USERNAME,
    ACCESS_TOKEN
  } = process.env;

  const authorisation = asBase64(`${USERNAME}:${ACCESS_TOKEN}`);
  return { 'Authorization': `Basic ${authorisation}` };
};

/* API requests */

const getPullRequests = async () => axios({
  method: 'get',
  url: createPullRequestsURL(),
  headers: createAuthorisationHeaders(),
});


const patchPullRequestByNumber = (number, data = {}) => {
  return axios({
    method: 'patch',
    url: createPullRequestURLByNumber(number),
    headers: createAuthorisationHeaders(),
    data
  });
};

module.exports = {
  getPullRequests,
  patchPullRequestByNumber
};
