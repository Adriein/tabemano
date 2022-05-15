import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { ClientCreatedDomainEvent } from "Backoffice/Tenant/Application/RegisterClient/ClientCreatedDomainEvent";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";

@DomainEventsHandler(ClientCreatedDomainEvent)
export class CreateClientDomainEventHandler implements IDomainEventHandler {
  constructor(private clientRepository: IClientRepository, private subscriptionRepository: ISubscriptionRepository) {}

  public async handle(event: ClientCreatedDomainEvent): Promise<void> {
    const client = Client.build(event.name, event.email, event.tenantId, event.roleId);

    await this.clientRepository.save(client);

    const subscription = client.createSubscription(event.pricing);

    await this.subscriptionRepository.save(subscription);
  }

}