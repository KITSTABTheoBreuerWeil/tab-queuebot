const axios = require('axios');

const DOMAIN = 'https://api.github.com';

const getPullRequestsURL = () => {
  const {
    REPOSITORY_OWNER,
    REPOSITORY_NAME
  } = process.env;

  return `${DOMAIN}/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/pulls`;
}

module.exports.getPullRequestsURL = getPullRequestsURL;

const getPullRequestURLById = (id) => `${getPullRequestsURL()}/${id}`;

const getAuthorisationHeaders = () => {
  const authorisation = `${process.env.USERNAME}:${process.env.ACCESS_TOKEN}`;
  const encoded = Buffer.from(authorisation).toString('base64');
  return { 'Authorization': `Basic ${encoded}` };
};

module.exports.getAuthorisationHeaders = getAuthorisationHeaders;

class PullRequestTitle {
  constructor(title, position, id) {
    this.title = title;
    this.position = position;
    this.id = id;
  };

  isQueued() {
    return this.position;
  };

  renumber(position) {
    return `[${position}]${this.title}`;
  };

  async update(position) {
    console.log(`patching ${this.id}`)
    if (position === this.position) {
      return console.log(`patch unneeded for ${this.id}`);
    }

    try {
      await axios({
        method: 'patch',
        url: getPullRequestURLById(this.id),
        headers: getAuthorisationHeaders(),
        data: {
          title: this.renumber(position)
        }
      });
      console.log(`patch successful for ${this.id}!`);
    } catch (e) {
      console.log(`patch failed for ${this.renumber(position)}`)
      console.log(e.message);
    }
  };
};

module.exports.getPullRequestTitleObject = (title, id) => {
  const QUEUE_NUMBER = /^\[\d+\]/;
  const queueIndicator = title.match(QUEUE_NUMBER);

  if (queueIndicator) {
    const position = parseInt(queueIndicator[0].slice(1, -1));
    const newTitle = title.replace(queueIndicator[0], '');
    return new PullRequestTitle(newTitle, position, id);
  } else {
    return new PullRequestTitle(title, null, id);
  };
};
