import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Client } from "Backoffice/Notification/Domain/Entity/Client";
import { Email } from "Backoffice/Notification/Domain/Entity/Email";
import { IClientRepository } from "Backoffice/Notification/Domain/Repository/IClientRepository";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { SubscriptionAboutToExpireDomainEvent } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/SubscriptionAboutToExpireDomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(SubscriptionAboutToExpireDomainEvent)
export class SendAboutToExpireSubscriptionEmailHandler implements IEventHandler {
  constructor(
    @Inject('IClientRepository')
    private readonly repository: IClientRepository,
    @Inject('ISmtpService')
    private readonly smtpService: ISmtpService
  ) {}

  public async handle(event: SubscriptionAboutToExpireDomainEvent): Promise<void> {
    const clientId = event.aggregateId;

    const client = await this.findClient(clientId);

    await this.smtpService.send(new Email());
  }

  private async findClient(id: ID): Promise<Client> {
    const filter = UserFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}