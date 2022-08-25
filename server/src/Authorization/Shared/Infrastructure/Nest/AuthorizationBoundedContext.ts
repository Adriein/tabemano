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
];

const Controllers = [SignInController, RegisterTenantController, GetPermissionsController];

const Handlers = [SignInQueryHandler, RegisterTenantCommandHandler, GetPermissionsQueryHandler];

const Mappers = [PgAuthMapper, PgRoleMapper];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [...Controllers],
  providers: [...Repositories, ...Handlers, ...Services, ...Mappers],
  exports: [],
})
export class AuthorizationBoundedContext {}
