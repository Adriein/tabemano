import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { ModuleBookedDomainEvent } from './ModuleBookedDomainEvent';

@EventsHandler(ModuleBookedDomainEvent)
export class AssignPermissionDomainEventHandler implements IEventHandler {
  constructor(
    @Inject('IPermissionRepository') private permissionRepository: IPermissionRepository
  ) {}

  @Log()
  public async handle(event: ModuleBookedDomainEvent) {
    // const permission = Permission.build(event.tenantId, event.moduleId, new Name('moduleName'), moduleUrl[]);
    
    // 1. Check if module exists [Extract to Service]

    // 2. Check if the tenant doesn’t have the module already

    // 4. Save module in permission table → PgPermissionRepository
    throw new Error('Method not implemented.');
  }

  private async checkIfModuleExists(moduleId: string) {}

  private async checkIfTenantHasModuleAlreadyBooked(tenantId: string, moduleId: string) {}
}
