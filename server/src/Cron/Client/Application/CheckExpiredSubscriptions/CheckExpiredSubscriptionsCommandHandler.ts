import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CheckExpiredSubscriptionsCommand } from "./CheckExpiredSubscriptionsCommand";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { BackGroundJob } from "../../../Shared/Domain/Entity/BackGroundJob";
import { IBackGroundJobRepository } from "../../../Shared/Domain/Repository/IBackGroundJobRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { CLIENT_ROLE } from "Shared/Domain/constants";
import { Log } from "Shared/Domain/Decorators/Log";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@CommandHandler(CheckExpiredSubscriptionsCommand)
export class CheckExpiredSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly backgroundJobRepository: IBackGroundJobRepository
  ) {}

  @Log()
  public async execute(command: CheckExpiredSubscriptionsCommand): Promise<void> {
    const backgroundJob = BackGroundJob.expiredSubscription();
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

    const filter = UserFilter.create()
      .withRole(clientRole)
      .isActive(true)
      .withSubscriptionActive(true);

    const result = await this.clientRepository.find(filter);

    return result.unwrap();
  }

  private async getActiveSubscription(client: Client): Promise<Subscription> {
    const subscriptionFilter = SubscriptionFilter.create()
      .withClientId(client.id())
      .isActive(true);

    const result = await this.subscriptionRepository.findOne(subscriptionFilter);

    return result.unwrap();
  }
}