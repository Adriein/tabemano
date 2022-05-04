import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsResponse } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsResponse";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "Shared/Infrastructure/BaseController";
import { Controller } from "Shared/Infrastructure/Decorators/controller";
import { post } from "Shared/Infrastructure/Decorators/routes";
import { use } from "Shared/Infrastructure/Decorators/use";
import { currentUser, requireAuth } from "Shared/Infrastructure/Middlewares/auth";

@Controller()
export class FindTenantClientsController extends BaseController {
  @post('/clients')
  @use(requireAuth)
  @use(currentUser)
  public async findTenantClients(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindTenantClientsQuery.fromJson(req.body);

      const response = await this.queryBus.ask<FindTenantClientsResponse>(query);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }
}