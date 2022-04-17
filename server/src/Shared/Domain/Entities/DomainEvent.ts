import { ID } from "../Vo/Id.vo";

export abstract class DomainEvent {
  public abstract readonly aggregateId: ID;

  public readonly dateOccurred = new Date().toUTCString();
}
