import { CheckExpiredSubscriptionsCommand } from "Backoffice/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { BackgroundJob } from "Backoffice/Shared/Domain/BackgroundJob/BackgroundJob";
import { IBackgroundJobRepository } from "Backoffice/Shared/Domain/BackgroundJob/IBackgroundJobRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { CLIENT_ROLE } from "Shared/Domain/constants";
import { CommandHandler } from "Shared/Domain/Decorators/CommandHandler.decorator";
import { ICommandHandler } from "Shared/Domain/Interfaces/ICommandHandler";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@CommandHandler(CheckExpiredSubscriptionsCommand)
export class CheckExpiredSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly backgroundJobRepository: IBackgroundJobRepository
  ) {}

  public async handle(command: CheckExpiredSubscriptionsCommand): Promise<void> {
    const backgroundJob = BackgroundJob.expiredSubscription();
    backgroundJob.init();

    const clients = await this.getActiveClients();

    for (const client of clients) {
      const subscription = await this.getActiveSubscription(client);

      if (subscription.checkIsExpired()) {
        subscription.makeExpired();

        await this.subscriptionRepository.update(subscription);
      }
    }

    backgroundJob.end();
    await this.backgroundJobRepository.save(backgroundJob);
  }

  private async getActiveClients(): Promise<Client[]> {
    const clientRole = new RoleType(CLIENT_ROLE);

    const filter = UserFilter.builder()
      .withRole(clientRole)
      .isActive(true)
      .withSubscriptionActive(true);

    const result = await this.clientRepository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }

  private async getActiveSubscription(client: Client): Promise<Subscription> {
    const subscriptionFilter = SubscriptionFilter.builder()
      .withClientId(client.id())
      .isActive(true);

    const result = await this.subscriptionRepository.findOne(subscriptionFilter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}