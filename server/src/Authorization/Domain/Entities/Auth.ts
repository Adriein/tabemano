import { Role } from "Authorization/Domain/Entities/Role";
import { NotAuthorizedError } from "Authorization/Domain/Error/NotAuthorizedError";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Auth extends Aggregate {
  private crypto: CryptoService = new CryptoService();

  public static build(name: Name, email: Email, password: Password, role: Role): Auth {
    const auth = new Auth(ID.generate(), name, email, password, role);
    const event = TenantCreatedDomainEvent.fromEntity(auth);
    auth.publish(event);

    return auth;
  }

  constructor(
    _id: ID,
    private readonly _name: Name,
    private readonly _email: Email,
    private readonly _password: Password,
    private readonly _role: Role
  ) {
    super(_id);
  }

  public name(): Name {
    return this._name;
  }

  public email(): Email {
    return this._email;
  }

  public password(): Password {
    return this._password;
  }

  public roleId(): ID {
    return this._role.id();
  }

  public async checkIsAValidPassword(supplied: Password): Promise<void> {
    const valid = await this.crypto.compare(this._password.value, supplied.value);

    if (!valid) {
      throw new NotAuthorizedError();
    }
  }
}