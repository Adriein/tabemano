import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Client } from "Cron/Client/Domain/Entity/Client";
import { ClientFilter } from "Cron/Client/Domain/Filter/ClientFilter";
import { IClientRepository } from "Cron/Client/Domain/Repository/IClientRepository";
import { CheckExpiredSubscriptionsCommand } from "./CheckExpiredSubscriptionsCommand";
import { BackGroundJob } from "Cron/Shared/Domain/Entity/BackGroundJob";
import { IBackGroundJobRepository } from "Cron/Shared/Domain/Repository/IBackGroundJobRepository";
import { Log } from "Shared/Domain/Decorators/Log";

@CommandHandler(CheckExpiredSubscriptionsCommand)
export class CheckExpiredSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('IBackGroundJobRepository')
    private readonly backgroundJobRepository: IBackGroundJobRepository,
  ) {}

  @Log()
  public async execute(command: CheckExpiredSubscriptionsCommand): Promise<void> {
    const backgroundJob = BackGroundJob.expiredSubscription();
    backgroundJob.init();

    const clients = await this.getActiveClients();

    for (const client of clients) {
      client.checkIfSubscriptionExpired();
    }

    backgroundJob.end();
    await this.backgroundJobRepository.save(backgroundJob);
  }

  private async getActiveClients(): Promise<Client[]> {
    const filter = ClientFilter.create()
      .isActive(true)
      .withSubscriptionActive(true);

    const result = await this.clientRepository.find(filter);

    return result.unwrap();
  }
}