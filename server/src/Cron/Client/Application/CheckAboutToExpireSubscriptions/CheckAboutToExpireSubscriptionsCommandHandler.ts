import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { SubscriptionAboutToExpireDomainEvent } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/SubscriptionAboutToExpireDomainEvent";
import { Client } from "Cron/Client/Domain/Entity/Client";
import { ClientFilter } from "Cron/Client/Domain/Filter/ClientFilter";
import { IClientRepository } from "Cron/Client/Domain/Repository/IClientRepository";
import { BackGroundJob } from "Cron/Shared/Domain/Entity/BackGroundJob";
import { IBackGroundJobRepository } from "Cron/Shared/Domain/Repository/IBackGroundJobRepository";
import { CheckAboutToExpireSubscriptionsCommand } from "./CheckAboutToExpireSubscriptionsCommand";

@CommandHandler(CheckAboutToExpireSubscriptionsCommand)
export class CheckAboutToExpireSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IClientRepository')
    private readonly repository: IClientRepository,
    @Inject('IBackGroundJobRepository')
    private readonly backgroundJobRepository: IBackGroundJobRepository,
    private readonly eventBus: EventBus
  ) {}

  public async execute(command: CheckAboutToExpireSubscriptionsCommand): Promise<void> {
    const backgroundJob = BackGroundJob.aboutToExpireSubscription();
    backgroundJob.init();

    const clientList = await this.findClients();

    for (const client of clientList) {
      const subscription = client.activeSubscription()

      subscription.checkIsAboutToExpire(client.tenantWarningDays());

      if (client.canSendWarnings()) {
        subscription.commit();
      }
    }

    backgroundJob.end();
    await this.backgroundJobRepository.save(backgroundJob);
  }

  private async findClients(): Promise<Client[]> {
    const filter = ClientFilter.create()
      .withSubscriptionActive(true)
      .isActive(true)
      .withAllowSendWarnings(true)

    const result = await this.repository.find(filter);

    return result.unwrap();
  }
}