import { Module } from "@nestjs/common";
import { FindRoleQueryHandler } from "Backoffice/Role/Application/FindRoleQueryHandler";
import { PgRoleMapper } from "Backoffice/Role/Infrastructure/Persistance/Mapper/PgRoleMapper";
import { PgRoleRepository } from "Backoffice/Role/Infrastructure/Persistance/Repository/PgRoleRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ FindRoleQueryHandler ];

const Repositories = [
  {
    provide: 'IRoleRepository',
    useClass: PgRoleRepository,
  },
];

const Mappers = [ PgRoleMapper ];

@Module({
  imports: [ TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Repositories,
    ...Mappers
  ],
  exports: [],
})
export class RoleModule {}