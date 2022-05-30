import { Module } from "@nestjs/common";
import { RegisterTenantController } from "Authorization/Infrastructure/Controller/RegisterTenant/RegisterTenantController";
import { SignInController } from "Authorization/Infrastructure/Controller/SignIn/SignInController";
import { PgAuthMapper } from "Authorization/Infrastructure/Persistance/Mapper/PgAuthMapper";
import { AuthModel } from "Authorization/Infrastructure/Persistance/Model/AuthModel";
import { PgAuthRepository } from "Authorization/Infrastructure/Persistance/Repository/PgAuthRepository";
import { DataSource } from "typeorm";

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

@Module({
  imports: [],
  controllers: [
    ...Controllers
  ],
  providers: [
    ...Mappers,
    ...Repositories,
  ],
  exports: [],
})
export class AuthorizationBoundedContext {}