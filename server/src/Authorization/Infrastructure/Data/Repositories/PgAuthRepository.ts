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

export class PgAuthRepository implements IAuthRepository {
  private prisma = Database.instance().connection();
  private mapper = new PgAuthMapper();

  delete(entity: Auth): Promise<void> {
    return Promise.resolve(undefined);
  }


  public async find(filter: AuthFilter): Promise<Either<Error, Auth[]>> {
    try {
      const adapter = new PrismaAuthFilterAdapter(filter);

      const results = await this.prisma.ta_user.findMany(adapter.apply());

      this.prisma.$disconnect();

      return Right.success(results.map((result: any) => this.mapper.toDomain(result)))
    } catch (error: any) {

      this.prisma.$disconnect();
      return Left.error(error);
    }
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