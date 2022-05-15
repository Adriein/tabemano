import { CheckExpiredSubscriptionsCommand } from "Backoffice/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { get } from "Shared/Infrastructure/Decorators/routes";


@Controller()
export class CheckExpiredSubscriptionsController extends BaseController {
  @get('/subscription/expired')
  public async checkExpiredSubscriptions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const command = new CheckExpiredSubscriptionsCommand();

      await this.commandBus.dispatch(command);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}