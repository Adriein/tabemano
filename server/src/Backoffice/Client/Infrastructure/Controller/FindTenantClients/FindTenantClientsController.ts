import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindTenantClientsQuery } from 'Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery';
import { FindTenantClientsResponse } from 'Backoffice/Client/Application/FindTenantClients/FindTenantClientsResponse';
import { TabemanoMetadata } from 'Shared/Domain/Entities/TabemanoMetadata';
import { TabemanoResponse } from 'Shared/Domain/Entities/TabemanoResponse';
import { AuthGuard } from 'Shared/Infrastructure/Guard/AuthGuard';

@Controller()
export class FindTenantClientsController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(AuthGuard)
  @Post('/clients')
  public async findTenantClients(@Body() body: any): Promise<any> {
    const query = FindTenantClientsQuery.fromJson(body);

    const clients = await this.queryBus.execute(query);

    return this.buildResponse(query, clients).serialize();
  }

  private buildResponse(
    query: FindTenantClientsQuery,
    clients: FindTenantClientsResponse[]
  ): TabemanoResponse<FindTenantClientsResponse> {
    const metadata = TabemanoMetadata.build(true, { page: query.page, quantity: query.quantity });

    return TabemanoResponse.build(clients, metadata);
  }
}
