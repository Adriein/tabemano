import { Result } from '@badrap/result';
import { Test } from '@nestjs/testing';
import { AssignPermissionDomainEventHandler } from 'Authorization/Permission/Application/AssignPermission/AssignPermissionDomainEventHandler';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PgPermissionRepository } from 'Authorization/Permission/Infrastructure/Persistance/Repository/PgPermissionRepository';
import { PgModuleRepository } from 'Backoffice/Module/Infrastructure/Persistance/Repository/PgModuleRepository';
import { PermissionObjectMother } from 'Test/Cron/Shared/PermissionObjectMother';

describe('AssignPermissionDomainEventHandler', () => {
  let handler: AssignPermissionDomainEventHandler;
  let permissionRepository: PgPermissionRepository;
  let moduleRepository: PgModuleRepository;
  let permission: Permission;

  beforeEach(async () => {
    permission = PermissionObjectMother.create().build();

    jest.resetAllMocks();

    const authorizationModule = await Test.createTestingModule({
      providers: [AssignPermissionDomainEventHandler],
    })
      .useMocker(token => {
        switch (token) {
          case 'IPermissionRepository':
            return { save: jest.fn() };
          case 'IModuleRepository':
            return { findOne: jest.fn().mockReturnValue(Promise.resolve(Result.ok(permission))) };
        }
      })
      .compile();

    handler = authorizationModule.get(AssignPermissionDomainEventHandler);
    permissionRepository = authorizationModule.get<PgPermissionRepository>('IPermissionRepository');
    moduleRepository = authorizationModule.get<PgModuleRepository>('IModuleRepository');
  });

  it('should return a module if it exists', async () => {
    // spyOn checkIfModuleExists
    // checkIfModuleExists has to be called    
    // has to return a module
  });

  it('should return an error if it does not exists', async () => {
    // spyOn checkIfModuleExists
    // checkIfModuleExists has to be called
    // has to throw an error
  });
});
