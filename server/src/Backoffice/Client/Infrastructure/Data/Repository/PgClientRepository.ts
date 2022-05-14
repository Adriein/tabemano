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
      console.log(JSON.stringify(adapter.apply(), null, 2))
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

  save(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
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