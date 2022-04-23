import { Auth } from "Authorization/Domain/Entities/Auth";
import { Name } from "Authorization/Domain/Vo/Name.vo";
import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class TenantCreatedDomainEvent extends DomainEvent {
  public static fromEntity(auth: Auth): TenantCreatedDomainEvent {
    return new TenantCreatedDomainEvent(auth.id(), auth.name(), auth.email(), auth.password());
  }

  constructor(
    protected readonly _aggregateId: ID,
    private readonly _name: Name,
    private readonly _email: Email,
    private readonly _password: Password
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get dateOccurred(): DateVo {
    return this._dateOccurred;
  }

  public get name(): Name {
    return this._name;
  }

  public get email(): Email {
    return this._email;
  }

  public get password(): Password {
    return this._password;
  }
}