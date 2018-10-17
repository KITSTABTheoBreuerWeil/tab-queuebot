import {
  APIPullRequestObject,
  GithubAPIService,
  LabelObject,
  TitleComponentsObject,
} from '../interfaces';

import { PullRequest } from './pullRequest';

const labelObjectsToLabelNames = (labels: LabelObject[]): string[] => {
  return labels
    ? labels.map((label) => label.name)
    : [];
};

const parseTitleComponents = (text: string): TitleComponentsObject => {
  const queueIndicator = text.match(/^\[(\d+)\]/);

  /* If we find a queue marker, remove it and separately save it. The remaining
   * portion of the title is also stored. */

  if (queueIndicator) {
    return {
      position: parseInt(queueIndicator[1], 10),
      title: text.replace(queueIndicator[0], ''),
    };
  }

  /* Else we return the entire title and no queue position. */

  return {
    position: null,
    title: text,
  };
};

interface PullRequestObjectProps {
  api: GithubAPIService;
  data: APIPullRequestObject;
}

export const pullRequestObjectFromAPIData = ({
  api,
  data,
}: PullRequestObjectProps): PullRequest => {
  const titleComponents = parseTitleComponents(data.title || '');
  const labels = labelObjectsToLabelNames(data.labels);

  /* Ideally we would pass these parameters as an object, emulating the React
   * props model. However, this is annoying from a TypeScript perspective.
   * However, this should be the only place we ever need to instantiate a
   * PullRequest directly. */

  return new PullRequest(
    api,
    labels,
    titleComponents.position,
    data.number,
    titleComponents.title,
    'mergeable',
  );
};
