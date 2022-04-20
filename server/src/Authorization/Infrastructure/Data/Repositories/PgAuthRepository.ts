import { Prisma, PrismaClient } from "@prisma/client";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { AuthFilter } from "Authorization/Domain/Entities/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entities/IAuthRepository";
import { PrismaAuthFilterAdapter } from "Authorization/Infrastructure/Data/Filters/PrismaAuthFilterAdapter";
import { PgAuthMapper } from "Authorization/Infrastructure/Data/Mappers/PgAuthMapper";
import { Left } from "Shared/Domain/Entities/Left";
import { Right } from "Shared/Domain/Entities/Right";
import { Either } from "Shared/Domain/types";
import { ID } from "Shared/Domain/Vo/Id.vo";
import Database from "Shared/Infrastructure/Data/Database";

const userWithRelations = Prisma.validator<Prisma.ta_userFindManyArgs>()({
  include: {
    us_config: true,
    us_app_config: true,
    us_role: true,
    us_subscriptions: true
  }
});

type UserWithRelations = Prisma.ta_userGetPayload<typeof userWithRelations>

export class PgAuthRepository implements IAuthRepository {
  private database = Database.instance();
  private mapper = new PgAuthMapper();

  delete(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: AuthFilter): Promise<Either<Error, Auth[]>> {
    return await this.database.execute<Auth[]>(async (connection: PrismaClient) => {
      const adapter = new PrismaAuthFilterAdapter(filter);

      const results = await connection.ta_user.findMany(adapter.apply());

      return Right.success(results.map((result: any) => this.mapper.toDomain(result)))
    })
  }

  findOne(id: ID): Promise<Either<Error, Auth>> {
    throw new Error()
  }

  save(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

}