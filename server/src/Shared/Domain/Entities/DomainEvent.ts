import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "../Vo/Id.vo";

export abstract class DomainEvent {
  protected abstract readonly _aggregateId: ID;

  protected readonly _dateOccurred = DateVo.now();
  
  public get dateOccurred(): DateVo {
    return this._dateOccurred;
  }
}
