import { NotAuthorizedError } from "Authorization/Domain/Error/NotAuthorizedError";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Auth extends AggregateRoot {
  private crypto: CryptoService = new CryptoService();

  public static build(name: Name, email: Email, password: Password, roleId: ID): Auth {
    return new Auth(ID.generate(), name, email, password, roleId);
  }

  constructor(
    readonly id: ID,
    readonly name: Name,
    readonly email: Email,
    readonly password: Password,
    readonly roleId: ID
  ) {
    super(id);
  }

  public async checkIsAValidPassword(supplied: Password): Promise<void> {
    const valid = await this.crypto.compare(this.password.value, supplied.value);

    if (!valid) {
      throw new NotAuthorizedError();
    }
  }
}