import { Prisma } from "@prisma/client";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

const userWithRelations = Prisma.validator<Prisma.ta_userFindManyArgs>()({
  include: {
    us_config: true,
  }
});

type UserWithRelations = Prisma.ta_userGetPayload<typeof userWithRelations>

export class PgClientMapper {
  public toDomain(dataModel: UserWithRelations): Client {
    const config = new Config(
      new ID(dataModel.us_config!.co_id),
      dataModel.us_config!.co_language,
      dataModel.us_config!.co_send_notifications,
      dataModel.us_config!.co_send_warnings,
    );
    return new Client(
      new ID(dataModel.us_id),
      new Name(dataModel.us_name),
      new Password(dataModel.us_password),
      new Email(dataModel.us_email),
      config,
      new ID(dataModel.us_tenant_id),
      new ID(dataModel.us_role_id),
      dataModel.us_is_active,
      dataModel.us_created_at,
      dataModel.us_updated_at,
    );
  }
}