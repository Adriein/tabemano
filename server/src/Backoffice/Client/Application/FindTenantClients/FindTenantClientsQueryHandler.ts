import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { FindTenantClientsResponse } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsResponse";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { IFilterFactory } from "Backoffice/Shared/Domain/Services/IFilterFactory";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { Log } from "Shared/Domain/Decorators/Log";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";

@QueryHandler(FindTenantClientsQuery)
export class FindTenantClientsQueryHandler implements IQueryHandler<FindTenantClientsResponse[]> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly factory: IFilterFactory<UserFilter>
  ) {}

  @Log()
  public async handle(query: FindTenantClientsQuery): Promise<FindTenantClientsResponse[]> {
    const filter = this.factory.create(query);

    const clientList = await this.findClients(filter);

    return await this.buildResponse(clientList);
  }

  private async findClients(filter: UserFilter): Promise<Client[]> {
    const result = await this.clientRepository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }

  private async getActiveSubscription(client: Client): Promise<Subscription> {
    const filter = SubscriptionFilter.builder()
      .isActive(true)
      .withClientId(client.id());

    const result = await this.subscriptionRepository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }

  private async buildResponse(list: Client[]): Promise<FindTenantClientsResponse[]> {
    const response = [];

    for (const client of list) {
      const subscription = await this.getActiveSubscription(client);

      response.push(FindTenantClientsResponse.build(client, subscription))
    }

    return response;
  }
}