const { patchPullRequestByNumber } = require('./githubAPI');
const { getConfig } = require('./helpers');
const { rebase } = require('./git');

const { LABELS } = getConfig();

class PullRequest {
  constructor({ title, position, number, labels, branchName }) {
    this.title = title;
    this.position = position;
    this.number = number;
    this.labels = labels;
    this.branchName = branchName;
  };

  /* labelling */

  _hasLabel(label) {
    return this.labels.includes(label);
  };

  isQueued() {
    return this.position || this._hasLabel(LABELS.MERGEABLE);
  };

  /* title mangling */

  static _createNumberedTitle(position, title) {
    return `[${position}]${title}`;
  };

  _reassignQueuePosition(position) {
    return PullRequest._createNumberedTitle(position, this.title);
  };

  _assignInitialQueuePosition(position) {
    return PullRequest._createNumberedTitle(position, ' ' + this.title);
  };

  getTitleAtQueuePosition(position) {
    return this.position
      ? this._reassignQueuePosition(position)
      : this._assignInitialQueuePosition(position);
  };

  /* API interactions */

  async updatePosition(position) {
    if (position === this.position) {
      return; // no need to update - we are in the correct position
    }

    const title = this.getTitleAtQueuePosition(position);

    try {
      await patchPullRequestByNumber(this.number, { title });
    } catch (error) {
      console.error(`failed update: #${this.number}\n${error.message}`);
    }

    if (position === 1) {
      await rebase(this.branchName);
    }
  };
}

/* Builder for PullRequest object:
 *
 * Create pull request object from Github API pull request data. Parse the
 * queue number from the PR title before creation.
 */

const labelObjectsToLabelNames = (labels) => {
  return labels ? labels.map(label => label.name) : [];
};

const parseTitleComponents = (string) => {
  const queueIndicator = string.match(/^\[(\d+)\]/);

  if (queueIndicator) {
    return {
      position: parseInt(queueIndicator[1]),
      title: string.replace(queueIndicator[0], '')
    }
  }

  return {
    position: null,
    title: string
  };
};

const pullRequestObjectFromAPIData = (data) => {
  if (!data.title) {
    return null;
  }
  const titleComponents = parseTitleComponents(data.title);
  const labels = labelObjectsToLabelNames(data.labels);

  return new PullRequest({
    ...titleComponents,
    number: data.number,
    branchName: data.head.ref,
    labels,
  });
};

const isQueued = pullRequest => pullRequest.isQueued();

module.exports = {
  pullRequestObjectFromAPIData,
  isQueued
};
