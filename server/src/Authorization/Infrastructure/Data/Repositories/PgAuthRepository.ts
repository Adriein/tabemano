import { PrismaClient } from "@prisma/client";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { AuthFilter } from "Authorization/Domain/Entities/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entities/IAuthRepository";
import { PrismaAuthFilterAdapter } from "Authorization/Infrastructure/Data/Filters/PrismaAuthFilterAdapter";
import { PgAuthMapper } from "Authorization/Infrastructure/Data/Mappers/PgAuthMapper";
import { Right } from "Shared/Domain/Entities/Right";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

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

  public async findOne(filter: AuthFilter): Promise<Either<Error, Auth>> {
    return await this.database.execute<Auth>(async (connection: PrismaClient) => {
      const adapter = new PrismaAuthFilterAdapter(filter);

      const [ result ]: any = await connection.ta_user.findMany(adapter.apply());

      return Right.success(this.mapper.toDomain(result))
    })
  }

  save(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }

}