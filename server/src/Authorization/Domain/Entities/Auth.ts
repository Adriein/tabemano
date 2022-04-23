import { NotAuthorizedError } from "Authorization/Domain/Error/NotAuthorizedError";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Auth extends AggregateRoot {
  private crypto: CryptoService = new CryptoService();

  public static build(name: Name, email: Email, password: Password): Auth {
    const auth = new Auth(ID.generate(), name, email, password);
    const event = TenantCreatedDomainEvent.fromEntity(auth);
    auth.addEvent(event);

    return auth;
  }

  constructor(_id: ID, private _name: Name, private _email: Email, private _password: Password) {
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

  public async checkIsAValidPassword(supplied: Password): Promise<void> {
    const valid = await this.crypto.compare(this._password.value, supplied.value);

    if (!valid) {
      throw new NotAuthorizedError();
    }
  }
}