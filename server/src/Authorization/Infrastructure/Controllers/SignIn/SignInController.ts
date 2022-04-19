import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInResponse } from "Authorization/Application/SignIn/SignInResponse";
import { SignInApiResponse } from "Authorization/Infrastructure/Controllers/SignIn/SignInApiResponse";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { post } from "Shared/Infrastructure/Decorators/routes";

@Controller()
export class SignInController extends BaseController {
  @post('/signin')
  public async signIn(req: Request, res: Response<SignInApiResponse>, next: NextFunction): Promise<void> {
    try {
      const query = SignInQuery.fromJson(req.body);

      const response = await this.queryBus.ask<SignInResponse>(query);

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