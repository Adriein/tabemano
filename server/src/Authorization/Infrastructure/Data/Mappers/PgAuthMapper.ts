import { Prisma } from "@prisma/client";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

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
    return new Auth(
      new ID(dataModel.us_id),
      dataModel.us_name,
      new Email(dataModel.us_email),
      new Password(dataModel.us_password)
    );
  }
}