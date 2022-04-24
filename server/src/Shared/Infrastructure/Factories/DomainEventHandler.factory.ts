import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { PgTenantRepository } from "Backoffice/Tenant/Infrastructure/Data/Repositories/PgTenantRepository";
import { IDomainEventHandler } from '../../Domain/Interfaces/IDomainEventHandler';
import { ConstructorFunc } from '../../Domain/types';

export default class DomainEventHandlerFactory {
  private handlers: Map<string, IDomainEventHandler> = new Map();

  private readonly tenantRepository = new PgTenantRepository();

  constructor() {
    this.register();
  }

  public create<T>(_handler: ConstructorFunc<T>): IDomainEventHandler {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No domain event handler with this name');
    }

    return handler;
  }

  private register(): void {
    //Backoffice
    this.handlers.set(TenantCreatedDomainEvent.name, new CreateTenantDomainEventHandler(this.tenantRepository))
  }

  public getContainer(): Map<string, IDomainEventHandler> {
    return this.handlers;
  }
}
