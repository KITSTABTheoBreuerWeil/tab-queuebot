import { AxiosResponse } from 'axios';

/* utility types */

export interface RequestHeaders {
  [header: string]: string;
}

export interface PullRequestPatchPayload {
  title?: string;
}

/* data types */

export interface LabelObject {
  name: string;
}

export interface APIPullRequestObject {
  labels: LabelObject[];
  number: number;
  title?: string;
  head: {
    ref: string,
  };
}

/* response types */

export interface APIErrorResponse {
  message: string;
}

type GetPullRequests = APIPullRequestObject[] | APIErrorResponse;
export type GetPullRequestsResponse = AxiosResponse<GetPullRequests>;

type PatchPullRequests = void | APIErrorResponse;
export type PatchPullRequestResponse = AxiosResponse<PatchPullRequests>;

/* services */

export interface GithubAPIService {
  getPullRequests: () => Promise<GetPullRequestsResponse>;
    patchPullRequest: (
      prNumber: number,
      data: PullRequestPatchPayload,
    ) => Promise<PatchPullRequestResponse>;
}

export interface URLService {
  api: string;
  owner: string;
  repository: string;
  pullRequestsURL: () => string;
  pullRequestURLByNumber: (n: number) => string;
}
