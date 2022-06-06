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

  public static build(name: Name, email: Email, password: Password, roleId: ID): Auth {
    const auth = new Auth(ID.generate(), name, email, password, roleId);
    const event = TenantCreatedDomainEvent.fromEntity(auth);
    auth.publish(event);

    return auth;
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