import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RegisterTenantCommandHandler } from "Authorization/Application/RegisterTenant/RegisterTenantCommandHandler";
import { SignInQueryHandler } from "Authorization/Application/SignIn/SignInQueryHandler";
import { RegisterTenantController } from "Authorization/Infrastructure/Controller/RegisterTenant/RegisterTenantController";
import { SignInController } from "Authorization/Infrastructure/Controller/SignIn/SignInController";
import { PgAuthRepository } from "Authorization/Infrastructure/Persistance/Repository/PgAuthRepository";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Services = [
  CryptoService
];

const Repositories = [
  {
    provide: 'IAuthRepository',
    useClass: PgAuthRepository,
  },
];

const Controllers = [
  SignInController,
  RegisterTenantController
];

const Handlers = [
  SignInQueryHandler,
  RegisterTenantCommandHandler
];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [
    ...Controllers
  ],
  providers: [
    ...Repositories,
    ...Handlers,
    ...Services
  ],
  exports: [],
})
export class AuthorizationBoundedContext {}