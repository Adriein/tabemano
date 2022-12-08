import { ErrorCode, ErrorSerialization } from "Shared/Domain/constants";
import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class FailOverDomainEvent {
  public static build(event: DomainEvent, error: Error) {
    return new FailOverDomainEvent(
      ID.generate(),
      event,
      error
    )
  }

  constructor(
    private readonly _id: ID,
    private readonly _event: DomainEvent,
    private readonly _error: Error
  ) {}

  public id(): ID {
    return this._id;
  }

  public serializeDomainEvent(): string {
    return this._event.serialize();
  }

  public serializeError(): string {
    const error: ErrorSerialization = {
      errorType: 'UnexpectedError',
      errorCode: ErrorCode.UNEXPECTED_ERROR,
      message: this._error.message,
      occurredOn: DateVo.now().value,
      stack: this._error.stack?.split('\n').map((trace: string) => trace.trim())
    };

    return JSON.stringify(error);
  }
}