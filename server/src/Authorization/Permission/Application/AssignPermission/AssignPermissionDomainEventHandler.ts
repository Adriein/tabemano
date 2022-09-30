import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { Module } from 'Authorization/Module/Domain/Entity/Module';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { GetModuleQuery } from 'Backoffice/Module/Application/ModuleExists/GetModuleQuery';
import { GetModuleResponse } from 'Backoffice/Module/Application/ModuleExists/GetModuleResponse';
import { Log } from 'Shared/Domain/Decorators/Log';
import { ModuleNotFoundError } from 'Shared/Domain/Error/ModuleNotfoundError';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { ModuleBookedDomainEvent } from '../../../Module/Application/ModuleBooked/ModuleBookedDomainEvent';

@EventsHandler(ModuleBookedDomainEvent)
export class AssignPermissionDomainEventHandler implements IEventHandler {
  constructor(
    @Inject('IPermissionRepository') private permissionRepository: IPermissionRepository,
    private readonly queryBus: QueryBus
  ) {}

  @Log()
  public async handle(event: ModuleBookedDomainEvent) {
    // 1. Check if module exists [Extract to Service]
    const module = await this.checkIfModuleExists(event.moduleId);

    if (!module) {
      throw new ModuleNotFoundError();
    }

    // 2. Check if the tenant doesn’t have the module already
    const permissionAssigned = await this.checkIfTenantHasModuleAlreadyAssigned(event);

    if (permissionAssigned) {
      return;
    }

    // 4. Save module in permission table → PgPermissionRepository
    const permission = await this.getPermission(event.moduleId);

    const newPermission = Permission.build(
      event.tenantId,
      event.moduleId,
      permission.moduleName(),
      permission.moduleUrl()
    );

    await this.permissionRepository.save(newPermission);
  }

  private async checkIfModuleExists(moduleId: ID): Promise<Module> {
    const query = GetModuleQuery.fromJson(moduleId);

    const moduleResponse = await this.queryBus.execute<GetModuleQuery, GetModuleResponse>(query);

    return new Module(new ID(moduleResponse.id), new Name(moduleResponse.name));
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

  private async getPermission(moduleId: ID): Promise<Permission> {
    const filter = PermissionFilter.create().withModuleId(moduleId);

    const result = await this.permissionRepository.findOne(filter);

    return result.unwrap();
  }
}
