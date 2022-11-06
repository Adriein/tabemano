import { IEvent } from "@nestjs/cqrs";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "../Vo/Id.vo";

export abstract class DomainEvent implements IEvent {
  //tabemano.tenant.1.event.tenant.created
  //<company>.<bounded-context>.<version>.<message-type>.<domain-entity>.<action>
  protected abstract readonly _type: string;
  protected abstract readonly _aggregateId: ID;

  protected readonly _dateOccurred = DateVo.now();
  protected readonly _id: ID = ID.generate();

  public get id(): ID {
    return this._id;
  }

  public get dateOccurred(): DateVo {
    return this._dateOccurred;
  }
}
