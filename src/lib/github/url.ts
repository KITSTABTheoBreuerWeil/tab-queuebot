import { posix } from 'path';

export class URLService {
  constructor(
    public api: string,
    public owner: string,
    public repository: string,
  ) {}

  public pullRequestsURL = (): string => {
    return this.api + posix.join('repos', this.owner, this.repository, 'pulls');
  }

  public pullRequestURLByNumber = (prNumber: number) => {
    return posix.join(this.pullRequestsURL(), prNumber.toString());
  }
}
