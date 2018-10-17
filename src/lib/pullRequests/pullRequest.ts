import { GithubAPIService, PatchPullRequestResponse } from '../interfaces';

export class PullRequest {
  constructor(
    public api: GithubAPIService,
    public labels: string[],
    public position: number | null,
    public prNumber: number,
    public title: string,
    public mergeLabel: string,
  ) {}

  /* A pull request is queued if it already has a position or if it has the
   * mergeable label indicator. */
  public isQueued = (): boolean => (
    Boolean(this.position) || this.hasLabel(this.mergeLabel)
  )

  /* If a pull request was previously queued, we replace the queue position.
   * If it wasn't queued, we need to append it to the front of the title. */
  public getTitleAtQueuePosition = (position: number): string => (
    this.position
      ? this.reassignQueuePosition(position)
      : this.assignInitialQueuePosition(position)
  )

  /* We only need to send a patch request if the position is different to what
   * it should be. */
  public shouldUpdate = (position: number): boolean => (
    this.position !== position
  )

  /* Work out what the new title should be, given the new position. Send a
   * patch request to update it. */
  public updatePosition = async (
    position: number,
  ): Promise<PatchPullRequestResponse> => {
    try {
      return this.api.patchPullRequest(this.prNumber, {
        title: this.getTitleAtQueuePosition(position),
      });
    } catch (error) {
      return error.response;
    }
  }

  private hasLabel = (label: string): boolean => (
    this.labels.includes(label)
  )

  private createNumberedTitle = (position: number, title: string): string => (
    `[${position.toString()}]${title}`
  )

  private reassignQueuePosition = (position: number): string => (
    this.createNumberedTitle(position, this.title)
  )

  private assignInitialQueuePosition = (position: number): string => (
    this.createNumberedTitle(position, ' ' + this.title)
  )
}
