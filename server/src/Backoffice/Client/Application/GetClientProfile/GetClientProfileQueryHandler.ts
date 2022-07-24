import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { GetClientProfileResponse } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileResponse";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { Log } from "Shared/Domain/Decorators/Log";
import { ID } from "Shared/Domain/Vo/Id.vo";

@QueryHandler(GetClientProfileQuery)
export class GetClientProfileQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IClientRepository') private readonly clientRepository: IClientRepository,
    @Inject('ISubscriptionRepository') private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  @Log()
  public async execute(query: GetClientProfileQuery): Promise<GetClientProfileResponse> {
    const id = new ID(query.clientId);

    const client = await this.getClient(id);

    const subscriptions = await this.getSubscriptions(id)

    return GetClientProfileResponse.fromDomain(client, subscriptions);
  }

  private async getClient(id: ID): Promise<Client> {
    const filter = new UserFilter();
    filter.withId(id);

    const result = await this.clientRepository.findOne(filter);

    return result.unwrap();
  }

  private async getSubscriptions(clientId: ID): Promise<Subscription[]> {
    const filter = new SubscriptionFilter();
    filter.withClientId(clientId)
      .orderByCreationDate()
      .desc();

    const result = await this.subscriptionRepository.find(filter);

    return result.unwrap();
  }

}