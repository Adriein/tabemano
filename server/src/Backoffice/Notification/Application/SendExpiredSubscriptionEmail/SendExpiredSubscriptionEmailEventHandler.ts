import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Client } from "Backoffice/Notification/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Notification/Domain/Repository/IClientRepository";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { SubscriptionExpired } from "Cron/Client/Application/CheckExpiredSubscriptions/SubscriptionExpired";
import { FailOverService } from "Shared/Domain/Services/FailOverService";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(SubscriptionExpired)
export class SendAboutToExpireSubscriptionEmailEventHandler implements IEventHandler {
  constructor(
    @Inject('IClientRepository')
    private readonly repository: IClientRepository,
    @Inject('ISmtpService')
    private readonly smtpService: ISmtpService,
    private readonly failOverService: FailOverService
  ) {}

  public async handle(event: SubscriptionExpired): Promise<void> {
    try {
      const client = await this.findClient(event.clientId());

      //await this.smtpService.send(new Email());
    } catch (error) {
      await this.failOverService.execute(event, error as Error);
    }
  }

  private async findClient(id: ID): Promise<Client> {
    const filter = UserFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}