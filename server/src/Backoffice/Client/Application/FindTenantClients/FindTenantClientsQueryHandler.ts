import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
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

@QueryHandler(FindTenantClientsQuery)
export class FindTenantClientsQueryHandler implements IQueryHandler {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly factory: IFilterFactory<UserFilter>
  ) {}

  @Log()
  public async execute(query: FindTenantClientsQuery): Promise<FindTenantClientsResponse[]> {
    const filter = this.factory.create(query);

    const clientList = await this.findClients(filter);

    return await this.buildResponse(clientList);
  }

  private async findClients(filter: UserFilter): Promise<Client[]> {
    const result = await this.clientRepository.find(filter);

    return result.unwrap();
  }

  private async getActiveSubscription(client: Client): Promise<Subscription> {
    const filter = SubscriptionFilter.builder()
      .isActive(true)
      .withClientId(client.id);

    const result = await this.subscriptionRepository.findOne(filter);

    return result.unwrap();
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