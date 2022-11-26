import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Module } from 'Authorization/Permission/Domain/Entity/Module';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { ModuleFilter } from 'Authorization/Permission/Domain/Filter/ModuleFilter';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { ModuleNotFoundError } from 'Shared/Domain/Error/ModuleNotFoundError';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { ModuleBookedDomainEvent } from 'Backoffice/Module/Application/BookModule/ModuleBookedDomainEvent';
import { IModuleRepository } from 'Authorization/Permission/Domain/Repository/IModuleRepository';

@EventsHandler(ModuleBookedDomainEvent)
export class AssignPermissionDomainEventHandler implements IEventHandler {
  constructor(
    @Inject('IPermissionRepository') private permissionRepository: IPermissionRepository,
    @Inject('IModuleRepository') private moduleRepository: IModuleRepository
  ) {}

  @Log()
  public async handle(event: ModuleBookedDomainEvent) {
    await this.checkIfModuleExists(event.moduleId);

    const permissionAssigned = await this.checkIfTenantHasModuleAlreadyAssigned(event);

    if (permissionAssigned) {
      return;
    }

    const module = await this.getModule(event.moduleId);

    const newPermission = Permission.build(
      event.tenantId,
      event.moduleId,
      module.name(),
      module.urlList()
    );

    await this.permissionRepository.save(newPermission);
  }

  private async checkIfModuleExists(moduleId: ID): Promise<Module> {
    try {
      const filter = ModuleFilter.create().withModuleId(moduleId);

      const result = await this.moduleRepository.findOne(filter);

      return result.unwrap();
    } catch (error: any) {
      if (error instanceof RecordNotFoundError) {
        throw new ModuleNotFoundError();
      }

      throw error;
    }
  }

  private async checkIfTenantHasModuleAlreadyAssigned(
    event: ModuleBookedDomainEvent
  ): Promise<Permission | undefined> {
    try {
      const filter = PermissionFilter.create()
        .withTenantId(event.tenantId)
        .withModuleId(event.moduleId);

      const result = await this.permissionRepository.findOne(filter);

      return result.unwrap();
    } catch (error: any) {
      if (error instanceof RecordNotFoundError) {
        return undefined;
      }

      throw error;
    }
  }

  private async getModule(moduleId: ID): Promise<Module> {
    const filter = ModuleFilter.create().withModuleId(moduleId);

    const result = await this.moduleRepository.findOne(filter);

    return result.unwrap();
  }
}
