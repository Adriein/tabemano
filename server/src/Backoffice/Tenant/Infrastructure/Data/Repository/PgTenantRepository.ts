import { PrismaClient } from "@prisma/client";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { PrismaUserFilterAdapter } from "Backoffice/Shared/Infrastructure/Data/Filters/PrismaUserFilterAdapter";
import { PgTenantMapper } from "Backoffice/Tenant/Infrastructure/Data/Mapper/PgTenantMapper";
import { Left } from "Shared/Domain/Entities/Left";
import { Right } from "Shared/Domain/Entities/Right";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgTenantRepository implements ITenantRepository {
  private database = Database.instance();
  private mapper = new PgTenantMapper();

  delete(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: UserFilter): Promise<Either<Error, Tenant[]>> {
    throw new Error();
  }

  public async findOne(filter: UserFilter): Promise<Either<Error, Tenant>> {
    return await this.database.execute<Tenant>(async (connection: PrismaClient) => {
      const adapter = new PrismaUserFilterAdapter(filter);

      const [ result ]: any = await connection.ta_user.findMany(adapter.apply());

      if (!result) {
        return Left.error(new RecordNotFoundError());
      }

      return Right.success(this.mapper.toDomain(result))
    });
  }

  public async save(entity: Tenant): Promise<void> {
    await this.database.execute<void>(async (connection: PrismaClient) => {
      await connection.ta_user.create({
        data: {
          us_id: entity.id().value,
          us_name: entity.name().value,
          us_email: entity.email().value,
          us_password: entity.password().value,
          us_tenant_id: entity.tenantId().value,
          us_is_active: entity.isActive(),
          us_created_at: entity.createdAt(),
          us_updated_at: entity.updatedAt(),
          us_config: {
            create: {
              co_id: entity.configId().value,
              co_language: entity.language(),
              co_send_notifications: entity.sendNotifications(),
              co_send_warnings: entity.sendWarnings(),
              co_created_at: entity.createdAt(),
              co_updated_at: entity.updatedAt()
            }
          },
          us_role: {
            connect: {
              ro_id: entity.roleId().value,
            }
          },
        }
      });

      return Right.success({});
    })
  }

  update(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

}