import { User } from "Backoffice/Shared/Domain/User/User";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export class Tenant extends User {
  public static build(name: Name, password: Password, email: Email, tenantId: ID, roleId: ID): Tenant {
    const config = Config.build(true, true);

    return new Tenant(ID.generate(), name, password, email, config, tenantId, roleId, true);
  }

  constructor(
    _id: ID,
    protected _name: Name,
    protected _password: Password,
    protected _email: Email,
    protected _config: Config,
    protected _tenantId: ID,
    protected _roleId: ID,
    protected _active: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _active, _createdAt, _updatedAt);
  }
}