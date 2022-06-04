import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SignInQueryHandler } from "Authorization/Application/SignIn/SignInQueryHandler";
import { RegisterTenantController } from "Authorization/Infrastructure/Controller/RegisterTenant/RegisterTenantController";
import { SignInController } from "Authorization/Infrastructure/Controller/SignIn/SignInController";
import { PgAuthMapper } from "Authorization/Infrastructure/Persistance/Mapper/PgAuthMapper";
import { AuthModel } from "Authorization/Infrastructure/Persistance/Model/AuthModel";
import { PgAuthRepository } from "Authorization/Infrastructure/Persistance/Repository/PgAuthRepository";
import Database from "Shared/Infrastructure/Persistance/Database";
import { DataSource } from "typeorm";

const DatabaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => Database.instance().initialize(),
};

const Mappers = [ PgAuthMapper ];
const Repositories = [
  {
    provide: 'AuthModelRepository',
    useFactory: (connection: DataSource) => connection.getRepository(AuthModel),
    inject: [ 'DATABASE_CONNECTION' ],
  },
  {
    provide: 'IAuthRepository',
    useClass: PgAuthRepository,
  },
];

const Controllers = [
  SignInController,
  RegisterTenantController
];

const Handlers = [ SignInQueryHandler ];

@Module({
  imports: [ CqrsModule ],
  controllers: [
    ...Controllers
  ],
  providers: [
    DatabaseProvider,
    ...Mappers,
    ...Repositories,
    ...Handlers
  ],
  exports: [],
})
export class AuthorizationBoundedContext {}