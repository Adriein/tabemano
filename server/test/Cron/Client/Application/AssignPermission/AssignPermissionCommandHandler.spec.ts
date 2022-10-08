import { AssignPermissionDomainEventHandler } from '../../../../../src/Authorization/Permission/Application/AssignPermission/AssignPermissionDomainEventHandler';
import { PgPermissionRepository } from '../../../../../src/Authorization/Permission/Infrastructure/Persistance/Repository/PgPermissionRepository';
import { PgModuleRepository } from '../../../../../src/Backoffice/Module/Infrastructure/Persistance/Repository/PgModuleRepository';
import { Permission } from '../../../../../src/Authorization/Permission/Domain/Entity/Permission';
import { Module } from '../../../../../src/Authorization/Permission/Domain/Entity/Module';

describe('AssignPermissionCommandHandler', () => {
  let handler: AssignPermissionDomainEventHandler;
  let permissionRepository: PgPermissionRepository;
  let moduleRepository: PgModuleRepository;
  let permission: Permission;
  let module: Module;

  beforeEach(async () => {
    jest.resetAllMocks();
  });
});
