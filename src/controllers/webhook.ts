import { requeue } from '../lib/requeue';

// typings
import { Request, Response } from 'express';

export const webhookController = async (
  _: Request,
  response: Response,
): Promise<void> => {

  let statusCode: number = 201;

  try {
    await requeue();
  } catch (error) {
    statusCode = 400;
    console.error(error);
  }

  response.sendStatus(statusCode);
};
