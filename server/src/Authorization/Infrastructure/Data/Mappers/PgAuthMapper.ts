import { Prisma } from "@prisma/client";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { Role } from "Authorization/Domain/Entities/Role";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

const userWithRelations = Prisma.validator<Prisma.ta_userFindManyArgs>()({
  include: {
    us_config: true,
    us_app_config: true,
    us_role: true,
    us_subscriptions: true
  }
});

type UserWithRelations = Prisma.ta_userGetPayload<typeof userWithRelations>

export class PgAuthMapper {
  public toDomain(dataModel: UserWithRelations): Auth {
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
}