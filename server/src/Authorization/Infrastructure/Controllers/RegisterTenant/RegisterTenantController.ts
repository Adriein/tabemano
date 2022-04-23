import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantApiRequest } from "Authorization/Infrastructure/Controllers/RegisterTenant/RegisterTenantApiRequest";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { post } from "Shared/Infrastructure/Decorators/routes";

@Controller()
export class RegisterTenantController extends BaseController {
  @post('/register')
  public async register(
    req: Request<{}, {}, RegisterTenantApiRequest>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> {
    try {
      const command = RegisterTenantCommand.fromJson(req.body);

      await this.commandBus.dispatch(command);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}