import { Module } from "@nestjs/common";
import Database from "Shared/Infrastructure/Persistance/Database";
import { PgFailOverRepository } from "Shared/Infrastructure/Persistance/Repository/PgFailOverRepository";

const DatabaseProvider = {
  provide: Database.DATABASE_CONNECTION,
  useFactory: async () => Database.instance().initialize(),
};

const Repository = [ {
  provide: 'IFailOverRepository',
  useClass: PgFailOverRepository
} ]

@Module({
  providers: [ DatabaseProvider, ...Repository ],
  exports: [ DatabaseProvider, ...Repository ],
})
export class TypeOrmModule {}