import { NotAuthorizedError } from "Authorization/Domain/Error/NotAuthorizedError";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Auth extends Aggregate {
  private crypto: CryptoService = new CryptoService();

  public static build(name: Name, email: Email, password: Password, roleId: ID): Auth {
    return new Auth(ID.generate(), name, email, password, roleId);
  }

  constructor(
    _id: ID,
    private _name: Name,
    private _email: Email,
    private _password: Password,
    private _roleId: ID,
    _createdAt?: Date,
    _updatedAt?: Date,
  ) {
    super(_id, _createdAt, _updatedAt);
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

  protected set name(value: Name) {
    this._name = value;
  }

  protected set email(value: Email) {
    this._email = value;
  }

  protected set password(value: Password) {
    this._password = value;
  }

  protected set roleId(value: ID) {
    this._roleId = value;
  }

  public async checkIsAValidPassword(supplied: Password): Promise<void> {
    const valid = await this.crypto.compare(this._password.value, supplied.value);

    if (!valid) {
      throw new NotAuthorizedError();
    }
  }
}