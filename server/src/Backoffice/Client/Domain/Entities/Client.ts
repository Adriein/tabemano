import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { User } from "Backoffice/Shared/Domain/User/User";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Client extends User {
  public static build(
    name: Name,
    email: Email,
    tenantId: ID,
    roleId: ID,
  ): Client {
    return new Client(ID.generate(), name, Password.generate(), email, Config.build(), tenantId, roleId, true);
  }

  constructor(
    _id: ID,
    _name: Name,
    _password: Password,
    _email: Email,
    _config: Config,
    _tenantId: ID,
    _roleId: ID,
    _active: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _active, _createdAt, _updatedAt);
  }
}