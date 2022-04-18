import { NotAuthorizedError } from "Authorization/Domain/Error/NotAuthorizedError";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Auth extends AggregateRoot {
  private crypto: CryptoService = new CryptoService();

  public static build(name: string, email: Email, password: Password) {
    return new Auth(ID.generate(), name, email, password)
  }

  constructor(_id: ID, private _name: string, private _email: Email, private _password: Password) {
    super(_id);
  }

  public name(): string {
    return this._name;
  }

  public email(): string {
    return this._email.value;
  }

  public password(): string {
    return this._password.value;
  }

  public async suppliedValidPassword(supplied: Password): Promise<void> {
    const valid = await this.crypto.compare(this._password.value, supplied.value);

    if(!valid) {
      throw new NotAuthorizedError();
    }
  }
}