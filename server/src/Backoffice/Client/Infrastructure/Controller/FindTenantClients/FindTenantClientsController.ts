import { Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsResponse } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsResponse";
import { TabemanoMetadata } from "Backoffice/Shared/Domain/TabemanoMetadata";
import { TabemanoResponse } from "Backoffice/Shared/Domain/TabemanoResponse";
import { NextFunction, Request, Response } from "express";
import { AuthGuard } from "Shared/Infrastructure/Guard/AuthGuard";
import { UserInterceptor } from "Shared/Infrastructure/Interceptor/UserInterceptor";

@Controller()
export class FindTenantClientsController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseInterceptors(UserInterceptor)
  @UseGuards(AuthGuard)
  @Post('/clients')
  public async findTenantClients(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = FindTenantClientsQuery.fromJson(req);

      const clients = await this.queryBus.execute(query);

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