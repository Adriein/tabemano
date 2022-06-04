import { Controller, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInResponse } from "Authorization/Application/SignIn/SignInResponse";
import { SignInApiRequest } from "Authorization/Infrastructure/Controller/SignIn/SignInApiRequest";
import { SignInApiResponse } from "Authorization/Infrastructure/Controller/SignIn/SignInApiResponse";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

@Controller()
export class SignInController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/signin')
  public async signIn(
    req: Request<{}, {}, SignInApiRequest>,
    res: Response<SignInApiResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = SignInQuery.fromJson(req.body);
      console.log('result1');
      const response = await this.queryBus.execute<SignInQuery, SignInResponse>(query);

      const userJwt = jwt.sign(
        {
          id: response.id,
          username: response.name,
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res.status(200).send({ id: response.id, username: response.name });
    } catch (error) {
      next(error);
    }
  }
}