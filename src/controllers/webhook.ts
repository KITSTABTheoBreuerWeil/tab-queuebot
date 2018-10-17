import { Request, Response } from 'express';

import { requeue } from '../lib';

export const webhookController = async (
  request: Request,
  response: Response,
): Promise<void> => {

  let statusCode: number = 201;

  try {
    await requeue(request.services.githubAPIService);
  } catch (error) {
    statusCode = 400;
    console.error(error);
  }

  response.sendStatus(statusCode);
};
