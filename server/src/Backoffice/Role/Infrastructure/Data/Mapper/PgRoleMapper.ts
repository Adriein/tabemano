import { Prisma } from "@prisma/client";
import { Role } from "Authorization/Domain/Entities/Role";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

const roleModel = Prisma.validator<Prisma.ta_roleFindManyArgs>()({});

type RoleModel = Prisma.ta_roleGetPayload<typeof roleModel>

export class PgRoleMapper {
  public toDomain(dataModel: RoleModel): Role {
    return new Role(
      new ID(dataModel.ro_id),
      new RoleType(dataModel.ro_type),
      new Date(dataModel.ro_created_at),
      new Date(dataModel.ro_updated_at),
    )
  }

  toSaveDataModel(domain: Role): any {
    return undefined;
  }

  toUpdateDataModel(domain: Role): any {
    return undefined;
  }

}