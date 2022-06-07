import { Module } from "@nestjs/common";
import { FindRoleQueryHandler } from "Backoffice/Role/Application/FindRoleQueryHandler";
import { PgRoleRepository } from "Backoffice/Role/Infrastructure/Persistance/Repository/PgRoleRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ FindRoleQueryHandler ];

const Repositories = [
  {
    provide: 'IRoleRepository',
    useClass: PgRoleRepository,
  },
];

@Module({
  imports: [ TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Repositories
  ],
  exports: [],
})
export class RoleModule {}