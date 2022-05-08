import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsResponse } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsResponse";
import { TabemanoMetadata } from "Backoffice/Shared/Domain/TabemanoMetadata";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
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
      const query = FindTenantClientsQuery.fromJson(req);

      const clients = await this.queryBus.ask<FindTenantClientsResponse[]>(query);

      const response = this.buildResponse(query, clients);

      res.status(200).send(response.serialize());
    } catch (error) {
      next(error);
    }
  }

  private buildResponse(
    query: FindTenantClientsQuery,
    clients: FindTenantClientsResponse[]
  ): TabemanoResponse<FindTenantClientsResponse> {
    const metadata = TabemanoMetadata.build(query.page, query.quantity);

    return TabemanoResponse.build(clients, metadata);
  }
}