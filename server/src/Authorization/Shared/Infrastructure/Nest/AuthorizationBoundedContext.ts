import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPermissionsQueryHandler } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsQueryHandler';
import { RegisterTenantCommandHandler } from 'Authorization/Auth/Application/RegisterTenant/RegisterTenantCommandHandler';
import { SignInQueryHandler } from 'Authorization/Auth/Application/SignIn/SignInQueryHandler';
import { RegisterTenantController } from 'Authorization/Auth/Infrastructure/Controller/RegisterTenant/RegisterTenantController';
import { SignInController } from 'Authorization/Auth/Infrastructure/Controller/SignIn/SignInController';
import { PgAuthMapper } from 'Authorization/Auth/Infrastructure/Persistance/Mapper/PgAuthMapper';
import { PgRoleMapper } from 'Authorization/Auth/Infrastructure/Persistance/Mapper/PgRoleMapper';
import { PgAuthRepository } from 'Authorization/Auth/Infrastructure/Persistance/Repository/PgAuthRepository';
import { PgRoleRepository } from 'Authorization/Auth/Infrastructure/Persistance/Repository/PgRoleRepository';
import { CryptoService } from 'Shared/Domain/Services/CryptoService';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';
import { GetPermissionsController } from '../../../Permission/Infrastructure/Controller/GetPermissions/GetPermissionsController';
import { PgPermissionRepository } from 'Authorization/Permission/Infrastructure/Persistance/Repository/PgPermissionRepository';
import { PgPermissionMapper } from 'Authorization/Permission/Infrastructure/Persistance/Mapper/PgPermissionMapper';
import { GetUrlListQueryHandler } from 'Authorization/Permission/Application/GetUrlList/GetUrlListQueryHandler';
import { GetTenantProfileQueryHandler } from 'Authorization/Auth/Application/GetTenantProfile/GetTenantProfileQueryHandler';
import { GetRoleQueryHandler } from 'Authorization/Auth/Application/GetRole/GetRoleQueryHandler';

const Services = [CryptoService];

const Repositories = [
  {
    provide: 'IAuthRepository',
    useClass: PgAuthRepository,
  },
  {
    provide: 'IRoleRepository',
    useClass: PgRoleRepository,
  },
  {
    provide: 'IPermissionRepository',
    useClass: PgPermissionRepository,
  },
];

const Controllers = [SignInController, RegisterTenantController, GetPermissionsController];

const Handlers = [
  SignInQueryHandler,
  RegisterTenantCommandHandler,
  GetTenantProfileQueryHandler,
  GetPermissionsQueryHandler,
  GetUrlListQueryHandler,
  GetRoleQueryHandler,
];

const Mappers = [PgAuthMapper, PgRoleMapper, PgPermissionMapper];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [...Controllers],
  providers: [...Repositories, ...Handlers, ...Services, ...Mappers],
  exports: [],
})
export class AuthorizationBoundedContext {}
