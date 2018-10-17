import { PatchPullRequestResponse } from './github';

export interface TitleComponentsObject {
  position: number | null;
  title: string;
}

export interface PullRequest {
  isQueued: () => boolean;
  getTitleAtQueuePosition: (a: number) => string;
  shouldUpdate: (a: number) => boolean;
  updatePosition: (a: number) => Promise<PatchPullRequestResponse>;
}
