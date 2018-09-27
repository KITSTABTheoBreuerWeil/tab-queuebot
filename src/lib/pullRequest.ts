import { getConfig } from '../config';
import { patchPullRequestByNumber } from './githubAPI';

import {
  LabelObject,
  APIPullRequestObject
} from './githubAPI.interfaces';

// typings
import { APIPatchPullRequestResponse } from './githubAPI.interfaces';
import { TitleComponentsObject } from './pullRequest.interfaces';

const { LABELS } = getConfig();

export class PullRequest {
  constructor(
    public branchName: string,
    public labels: string[],
    public position: number | null,
    public prNumber: number,
    public title: string
  ) {};

  /* labelling */

  private _hasLabel(label: string): boolean {
    return this.labels.includes(label);
  };

  public isQueued(): boolean {
    return Boolean(this.position) || this._hasLabel(LABELS.MERGEABLE);
  };

  public isHighPriority(): boolean {
    return this._hasLabel(LABELS.PRIORITY);
  };

  /* title mangling */

  private _createNumberedTitle(position: number, title: string): string {
    return `[${position.toString()}]${title}`;
  };

  private _reassignQueuePosition(position: number): string {
    return this._createNumberedTitle(position, this.title);
  };

  private _assignInitialQueuePosition(position: number): string {
    return this._createNumberedTitle(position, ' ' + this.title);
  };

  public getTitleAtQueuePosition(position: number): string {
    return this.position
      ? this._reassignQueuePosition(position)
      : this._assignInitialQueuePosition(position);
  };

  /* API interactions */

  public shouldUpdate(position: number): boolean {
    return this.position === position;
  };

  public async updatePosition(
    position: number
  ): Promise<APIPatchPullRequestResponse> {

    const title: string = this.getTitleAtQueuePosition(position);
    return patchPullRequestByNumber(this.prNumber, { title });
  };
};

/* Builder for PullRequest object:
 *
 * Create pull request object from Github API pull request data. Parse the
 * queue number from the PR title before creation.
 */

const labelObjectsToLabelNames = (labels: LabelObject[]): string[] => {
  return labels ? labels.map(label => label.name) : [];
};

const parseTitleComponents = (text: string): TitleComponentsObject => {
  const queueIndicator = text.match(/^\[(\d+)\]/);

  if (queueIndicator) {
    return {
      position: parseInt(queueIndicator[1]),
      title: text.replace(queueIndicator[0], '')
    }
  }

  return {
    position: null,
    title: text
  };
};

export const pullRequestObjectFromAPIData = (
  data: APIPullRequestObject
): PullRequest => {

  const titleComponents = parseTitleComponents(data.title || '');
  const labels = labelObjectsToLabelNames(data.labels);

  /* Ideally we would pass these parameters as an object, emulating the React
   * style. However, as the PullRequest constructor is effectively local to 
   * this file, this is the only place that we call it. TypeScript also 
   * prevents us doing silly things here. */

  return new PullRequest(
    data.head.ref,
    labels,
    titleComponents.position,
    data.number,
    titleComponents.title,
  );
};

export const isQueued = (pullRequest: PullRequest): boolean => (
  Boolean(pullRequest) && pullRequest.isQueued()
);
