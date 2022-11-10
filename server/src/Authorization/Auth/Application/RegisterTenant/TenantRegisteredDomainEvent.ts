import { Auth } from 'Authorization/Auth/Domain/Entity/Auth';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { Email } from 'Shared/Domain/Vo/Email.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Password } from 'Shared/Domain/Vo/Password.vo';

export class TenantRegisteredDomainEvent extends DomainEvent {
  protected _type = 'tabemano.authorization.1.event.auth.registered';

  public static fromEntity(auth: Auth): TenantRegisteredDomainEvent {
    return new TenantRegisteredDomainEvent(
      auth.id(),
      auth.name(),
      auth.email(),
      auth.password(),
      auth.roleId()
    );
  }

  constructor(
    protected readonly _aggregateId: ID,
    private readonly _name: Name,
    private readonly _email: Email,
    private readonly _password: Password,
    private readonly _roleId: ID
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
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

  public get roleId(): ID {
    return this._roleId;
  }
}
