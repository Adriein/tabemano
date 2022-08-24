import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Domain/Repository/IPermissionRepository';
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

    const permissionsResponse = permissions.map(permission => {
      return GetPermissionsResponse.fromDomain(permission);
    });

    return permissionsResponse;
  }

  private async findPermissions(tenantId: ID): Promise<Permission[]> {
    const filter = PermissionFilter.create().withTenantId(tenantId);

    const result = await this.repository.find(filter);

    return result.unwrap();
  }
}
