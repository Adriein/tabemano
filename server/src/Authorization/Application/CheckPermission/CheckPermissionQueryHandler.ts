import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Domain/Repository/IPermissionRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { CheckPermissionQuery } from './CheckPermissionQuery';
import { CheckPermissionResponse } from './CheckPermissionResponse';

@QueryHandler(CheckPermissionQuery)
export class CheckPermissionQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IPermissionRepository') private readonly repository: IPermissionRepository
  ) {}

  @Log()
  public async execute(query: CheckPermissionQuery): Promise<CheckPermissionResponse> {
    const tenantId = new ID(query.tenantId);
    const moduleId = new ID(query.moduleId);

    const permission = await this.findPermission(tenantId, moduleId);

    return CheckPermissionResponse.fromDomain(permission);
  }

  private async findPermission(tenantId: ID, moduleId: ID): Promise<Permission> {
    const filter = PermissionFilter.create().withTenantId(tenantId).withModuleId(moduleId);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}
