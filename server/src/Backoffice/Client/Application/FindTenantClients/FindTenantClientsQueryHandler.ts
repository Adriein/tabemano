import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsResponse } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsResponse";
import { Client } from "Backoffice/Client/Domain/Entities/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repositories/IClientRepository";
import { IFilterFactory } from "Backoffice/Shared/Domain/Services/IFilterFactory";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";

@QueryHandler(FindTenantClientsQuery)
export class FindTenantClientsQueryHandler implements IQueryHandler<FindTenantClientsResponse[]> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly factory: IFilterFactory<UserFilter>
  ) {}

  public async handle(query: FindTenantClientsQuery): Promise<FindTenantClientsResponse[]> {
    const filter = this.factory.create(query);

    const result = await this.clientRepository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    const clientList = result.value;

    return clientList.map((client: Client) => FindTenantClientsResponse.build(client, {} as Subscription))
  }

}