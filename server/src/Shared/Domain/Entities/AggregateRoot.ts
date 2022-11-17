import { AggregateRoot as NestAggregate, IEvent } from "@nestjs/cqrs";
import { TabemanoEventBus } from "Shared/Domain/Entities/TabemanoEventBus";
import { ID } from "Shared/Domain/Vo/Id.vo";

export abstract class AggregateRoot extends NestAggregate {
  protected constructor(
    private _id: ID,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {
    super();
  }

  public id(): ID {
    return this._id;
  }

  public createdAt(): Date {
    return this._createdAt;
  }

  public updatedAt(): Date {
    return this._updatedAt;
  }

  public apply<T extends IEvent = IEvent>(event: T) {
    super.apply(event);
  }

  public commit() {
    const unCommittedEvents = super.getUncommittedEvents();

    for (const event of unCommittedEvents) {
      const eventBus = TabemanoEventBus.instance()!;

      eventBus.publish(event);
    }

    //with this line we flush domain event array on parent
    super.uncommit();
  }
}
