import { Request, Response, NextFunction } from 'express';

import chalk from 'chalk';
import { DomainError } from "../../Domain/Error/DomainError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DomainError) {
    console.log(chalk.red.bold(`> Controlled Application Error: ${err.message}`));
    return res
      .status(err.statusCode)
      .send({ errors: err.serialize() });
  }

  console.log(chalk.red.bold(`> Unexpected Application ${err.stack}`));
  res.status(400).send({
    errors: [ { message: 'Something went wrong', key: 'something_went_wrong_error' } ],
  });
};
