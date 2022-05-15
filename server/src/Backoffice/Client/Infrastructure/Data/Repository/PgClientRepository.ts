import { PrismaClient } from "@prisma/client";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { PgClientMapper } from "Backoffice/Client/Infrastructure/Data/Mapper/PgClientMapper";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { PrismaUserFilterAdapter } from "Backoffice/Shared/Infrastructure/Data/Filters/PrismaUserFilterAdapter";
import { Left } from "Shared/Domain/Entities/Left";
import { Right } from "Shared/Domain/Entities/Right";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgClientRepository implements IClientRepository {
  private database = Database.instance();
  private mapper = new PgClientMapper();

  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: UserFilter): Promise<Either<Error, Client[]>> {
    return await this.database.execute<Client[]>(async (connection: PrismaClient) => {
      const adapter = new PrismaUserFilterAdapter(filter);

      const results = await connection.ta_user.findMany(adapter.apply());

      return Right.success(results.map((result: any) => this.mapper.toDomain(result)));
    });
  }

  public async findOne(filter: UserFilter): Promise<Either<Error, Client>> {
    return await this.database.execute<Client>(async (connection: PrismaClient) => {
      const adapter = new PrismaUserFilterAdapter(filter);

      const [ result ]: any = await connection.ta_user.findMany(adapter.apply());

      if (!result) {
        return Left.error(new RecordNotFoundError());
      }

      return Right.success(this.mapper.toDomain(result))
    });
  }

  public async save(entity: Client): Promise<void> {
    await this.database.execute<void>(async (connection: PrismaClient) => {
      await connection.ta_user.create({
        data: {
          us_id: entity.id().value,
          us_tenant_id: entity.tenantId().value,
          us_name: entity.name().value,
          us_is_active: entity.isActive(),
          us_role_id: entity.roleId().value,
          us_email: entity.email().value,
          us_password: entity.password().value,
          us_config: {
            create: {
              co_id: entity.configId().value,
              co_language: entity.language(),
              co_send_warnings: entity.sendWarnings(),
              co_send_notifications: entity.sendNotifications(),
              co_created_at: entity.createdAt(),
              co_updated_at: entity.updatedAt()
            }
          },
          us_created_at: entity.createdAt(),
          us_updated_at: entity.updatedAt(),
        }
      });

      return Right.success({})
    });
  }

  update(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async count(): Promise<Either<Error, number>> {
    return await this.database.execute<number>(async (connection: PrismaClient) => {
      const result: any = await connection.ta_user.count();

      if (!result) {
        return Left.error(new RecordNotFoundError());
      }

      return Right.success(result)
    })
      ;
  }

}