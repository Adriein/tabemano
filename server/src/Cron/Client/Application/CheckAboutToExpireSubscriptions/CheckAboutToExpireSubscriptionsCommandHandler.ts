import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CheckAboutToExpireSubscriptionsCommand } from "./CheckAboutToExpireSubscriptionsCommand";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@CommandHandler(CheckAboutToExpireSubscriptionsCommand)
export class CheckAboutToExpireSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: QueryBus,
  ) {}

  public async execute(command: CheckAboutToExpireSubscriptionsCommand): Promise<void> {
    const clientList = await this.findClients();

    for (const client of clientList) {
      const subscription = await this.getClientCurrentSubscription(client.id());
      const warningDelay = await this.getTenantWarningDelayDays(client.tenantId());

      subscription.checkIsAboutToExpire(warningDelay);
    }
  }

  private async findClients(): Promise<Client[]> {
    const filter = UserFilter.create()
      .withSubscriptionActive(true)
      .isActive(true)
      .withAllowSendWarnings(true)
      .withRole(RoleType.client());

    const result = await this.clientRepository.find(filter);

    return result.unwrap();
  }

  private async getClientCurrentSubscription(clientId: ID): Promise<Subscription> {
    const filter = SubscriptionFilter.create()
      .withClientId(clientId)
      .isActive(true);

    const result = await this.subscriptionRepository.findOne(filter);

    return result.unwrap();
  }

  private async getTenantWarningDelayDays(tenantId: ID): Promise<number> {
    return Promise.resolve(5);
  }
}