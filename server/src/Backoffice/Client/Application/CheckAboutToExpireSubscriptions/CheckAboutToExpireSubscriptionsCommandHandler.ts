import { CheckAboutToExpireSubscriptionsCommand } from "Backoffice/Client/Application/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsCommand";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { IQueryBus } from "Shared/Domain/Bus/IQueryBus";
import { CommandHandler } from "Shared/Domain/Decorators/CommandHandler.decorator";
import { ICommandHandler } from "Shared/Domain/Interfaces/ICommandHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@CommandHandler(CheckAboutToExpireSubscriptionsCommand)
export class CheckAboutToExpireSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly queryBus: IQueryBus,
  ) {}

  public async handle(command: CheckAboutToExpireSubscriptionsCommand): Promise<void> {
    const clientList = await this.findClients();

    for (const client of clientList) {
      const subscription = await this.getClientCurrentSubscription(client.id());
      const warningDelay = await this.getTenantWarningDelayDays(client.tenantId());
      
      subscription.checkIsAboutToExpire(warningDelay);
    }
  }

  private async findClients(): Promise<Client[]> {
    const filter = UserFilter.builder()
      .withSubscriptionActive(true)
      .isActive(true)
      .withAllowSendWarnings(true)
      .withRole(RoleType.client());

    const result = await this.clientRepository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }

  private async getClientCurrentSubscription(clientId: ID): Promise<Subscription> {
    const filter = SubscriptionFilter.builder()
      .withClientId(clientId)
      .isActive(true);

    const result = await this.subscriptionRepository.findOne(filter);

    if (result.isError()) {
      throw result.value
    }

    return result.value;
  }

  private async getTenantWarningDelayDays(tenantId: ID): Promise<number> {
    return Promise.resolve(5);
  }
}