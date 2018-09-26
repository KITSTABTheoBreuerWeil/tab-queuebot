import { AxiosResponse } from 'axios';

/* utility types */

export interface RequestHeaders {
  [header: string]: string
};

export interface PullRequestPatchPayload {
  title?: string
};

/* data types */

export interface LabelObject {
  name: string
};

export interface APIPullRequestObject {
  labels: LabelObject[]
  number: number
  title?: string
  head: {
    ref: string
  }
};

export type APIPullRequestsData = APIPullRequestObject[];

/* response types */

export interface APIErrorResponse {
  message: string
}

export type APIGetPullRequestsResponse =
  AxiosResponse<APIPullRequestsData | APIErrorResponse>;

export type APIPatchPullRequestResponse =
  AxiosResponse<void | APIErrorResponse>
