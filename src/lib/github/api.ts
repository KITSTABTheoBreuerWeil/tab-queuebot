import axios from 'axios';

import {
  GetPullRequestsResponse,
  PatchPullRequestResponse,
  PullRequestPatchPayload,
  RequestHeaders,
  URLService,
} from '../interfaces';

export class GithubAPIService {
  constructor(
    public username: string,
    public token: string,
    public url: URLService,
  ) {}

  public getPullRequests = (): Promise<GetPullRequestsResponse> => (
    axios({
      headers: this.createHeaders(),
      method: 'get',
      url: this.url.pullRequestsURL(),
    })
  )

  public patchPullRequest = (
    prNumber: number,
    data: PullRequestPatchPayload,
  ): Promise<PatchPullRequestResponse> => (
    axios({
      data,
      headers: this.createHeaders(),
      method: 'patch',
      url: this.url.pullRequestURLByNumber(prNumber),
    })
  )

  private createHeaders = (): RequestHeaders => ({
    Authorization: this.createAuthorisationString(),
  })

  private createAuthorisationString = (): string => (
    `Basic ${this.createAuthorisationToken()}`
  )

  private createAuthorisationToken = (): string => (
    this.asBase64(`${this.username}:${this.token}`)
  )

  private asBase64 = (text: string): string => (
    Buffer.from(text).toString('base64')
  )
}
