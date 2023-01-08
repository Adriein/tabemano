import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { GetPermissionsQuery } from './GetPermissionsQuery';
import { GetPermissionsResponse } from './GetPermissionsResponse';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IPermissionRepository') private readonly repository: IPermissionRepository
  ) {}

  @Log()
  public async execute(query: GetPermissionsQuery): Promise<GetPermissionsResponse[]> {
    const tenantId = new ID(query.tenantId);

    const permissions = await this.findPermissions(tenantId);

    return permissions.map(permission => {
      return GetPermissionsResponse.fromDomain(permission);
    });
  }

  private async findPermissions(tenantId: ID): Promise<Permission[]> {
    const filter = PermissionFilter.create().withTenantId(tenantId);

    const result = await this.repository.find(filter);

    return result.unwrap();
  }
}
