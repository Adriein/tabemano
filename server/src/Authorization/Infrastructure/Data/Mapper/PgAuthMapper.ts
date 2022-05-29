import { Auth } from "Authorization/Domain/Entity/Auth";
import { Role } from "Authorization/Domain/Entity/Role";
import { AuthModel } from "Authorization/Infrastructure/Data/Model/AuthModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";


export class PgAuthMapper implements IMapper<Auth, AuthModel> {
  public toDomain(dataModel: any): Auth {
    const role = new Role(
      new ID(dataModel.us_role.ro_id),
      new RoleType(dataModel.us_role.ro_type),
      dataModel.us_role.ro_created_at,
      dataModel.us_role.ro_updated_at
    );

    return new Auth(
      new ID(dataModel.us_id),
      new Name(dataModel.us_name),
      new Email(dataModel.us_email),
      new Password(dataModel.us_password),
      role
    );
  }

  public toModel(entity: Auth): any {
    return undefined;
  }
}