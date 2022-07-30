import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { ClientRegisteredDomainEvent } from "Backoffice/Tenant/Application/RegisterClient/ClientRegisteredDomainEvent";
import { Log } from "Shared/Domain/Decorators/Log";

@EventsHandler(ClientRegisteredDomainEvent)
export class ClientRegisteredDomainEventHandler implements IEventHandler<ClientRegisteredDomainEvent> {
  constructor(private clientRepository: IClientRepository, private subscriptionRepository: ISubscriptionRepository) {}

  @Log()
  public async handle(event: ClientRegisteredDomainEvent): Promise<void> {
    const client = Client.build(event.name, event.email, event.tenantId, event.roleId);

    await this.clientRepository.save(client);

    const subscription = client.createSubscription(event.pricing);

    await this.subscriptionRepository.save(subscription);
  }

}