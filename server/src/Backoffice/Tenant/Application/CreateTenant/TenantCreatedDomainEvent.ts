import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class TenantCreatedDomainEvent implements DomainEvent {
  readonly aggregateId: ID;
  readonly dateOccurred: string;

}