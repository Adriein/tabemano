import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CheckPermissionQueryHandler } from "Authorization/Application/CheckPermission/CheckPermissionQueryHandler";
import { GetPermissionsQueryHandler } from "Authorization/Application/GetPermissions/GetPermissionsQueryHandler";
import { RegisterTenantCommandHandler } from "Authorization/Application/RegisterTenant/RegisterTenantCommandHandler";
import { SignInQueryHandler } from "Authorization/Application/SignIn/SignInQueryHandler";
import { RegisterTenantController } from "Authorization/Infrastructure/Controller/RegisterTenant/RegisterTenantController";
import { SignInController } from "Authorization/Infrastructure/Controller/SignIn/SignInController";
import { PgAuthMapper } from "Authorization/Infrastructure/Persistance/Mapper/PgAuthMapper";
import { PgRoleMapper } from "Authorization/Infrastructure/Persistance/Mapper/PgRoleMapper";
import { PgAuthRepository } from "Authorization/Infrastructure/Persistance/Repository/PgAuthRepository";
import { PgRoleRepository } from "Authorization/Infrastructure/Persistance/Repository/PgRoleRepository";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";
import { GetPermissionsController } from "../Controller/GetPermissions/GetPermissionsController";

const Services = [
  CryptoService
];

const Repositories = [
  {
    provide: 'IAuthRepository',
    useClass: PgAuthRepository,
  },
  {
    provide: 'IRoleRepository',
    useClass: PgRoleRepository,
  },
];

const Controllers = [
  SignInController,
  RegisterTenantController,
  GetPermissionsController
];

const Handlers = [
  SignInQueryHandler,
  RegisterTenantCommandHandler,
  GetPermissionsQueryHandler,
  CheckPermissionQueryHandler
];

const Mappers = [
  PgAuthMapper,
  PgRoleMapper
];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [
    ...Controllers
  ],
  providers: [
    ...Repositories,
    ...Handlers,
    ...Services,
    ...Mappers
  ],
  exports: [],
})
export class AuthorizationBoundedContext {}