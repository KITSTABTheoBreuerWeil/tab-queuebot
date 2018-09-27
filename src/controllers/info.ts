// typings
import { Request, Response } from 'express';

export const infoController = async (
  _: Request,
  response: Response,
): Promise<void> => {

  response.status(200);
  response.json({ version: process.env.VERSION });
};
