import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Client } from "Cron/Client/Domain/Entity/Client";
import { ClientFilter } from "Cron/Client/Domain/Filter/ClientFilter";
import { IClientRepository } from "Cron/Client/Domain/Repository/IClientRepository";
import { CheckAboutToExpireSubscriptionsCommand } from "./CheckAboutToExpireSubscriptionsCommand";

@CommandHandler(CheckAboutToExpireSubscriptionsCommand)
export class CheckAboutToExpireSubscriptionsCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IClientRepository')
    private readonly repository: IClientRepository,
  ) {}

  public async execute(command: CheckAboutToExpireSubscriptionsCommand): Promise<void> {
    const clientList = await this.findClients();

    for (const client of clientList) {
      const subscription = client.activeSubscription()

      subscription.checkIsAboutToExpire(client.tenantWarningDays());
    }
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