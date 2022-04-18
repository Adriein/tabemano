import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { post } from "Shared/Infrastructure/Decorators/routes";

@Controller()
export class SignInController extends BaseController {
  @post('/signin')
  public async signIn(req: Request, res: Response<any>, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password)
      //const auth = await this.queryBus.ask<Auth>(new SigninQuery(email, password));

      /*const userJwt = jwt.sign(
        {
          id: auth.id().value,
          username: auth.name(),
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJwt,
      };

      res.status(200).send({ id: auth.id().value, username: auth.name() });*/
    } catch (error) {
      next(error);
    }
  }
}