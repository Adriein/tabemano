import { Module } from "@nestjs/common";
import { FailOverService } from "Shared/Domain/Services/FailOverService";
import Database from "Shared/Infrastructure/Persistance/Database";
import { PgFailOverDomainEventMapper } from "Shared/Infrastructure/Persistance/Mapper/PgFailOverDomainEventMapper";
import { PgFailOverRepository } from "Shared/Infrastructure/Persistance/Repository/PgFailOverRepository";

const DatabaseProvider = {
  provide: Database.DATABASE_CONNECTION,
  useFactory: async () => Database.instance().initialize(),
};

const Repository = [ {
  provide: 'IFailOverRepository',
  useClass: PgFailOverRepository
} ];

const Mapper = [
  PgFailOverDomainEventMapper
]

@Module({
  providers: [ DatabaseProvider, ...Repository, ...Mapper, FailOverService ],
  exports: [ DatabaseProvider, ...Repository, ...Mapper, FailOverService ],
})
export class TypeOrmModule {}