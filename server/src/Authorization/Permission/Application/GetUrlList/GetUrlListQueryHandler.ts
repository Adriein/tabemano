import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { GetUrlListQuery } from './GetUrlListQuery';
import { GetUrlListResponse } from './GetUrlListResponse';

@QueryHandler(GetUrlListQuery)
export class GetUrlListQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IPermissionRepository') private readonly repository: IPermissionRepository
  ) {}

  @Log()
  public async execute(query: GetUrlListQuery): Promise<GetUrlListResponse[]> {
    const moduleName = new Name(query.name);

    const permissions = await this.findPermissions(moduleName);

    return permissions.map(permission => {
      return GetUrlListResponse.fromDomain(permission);
    });
  }

  private async findPermissions(name: Name): Promise<Permission[]> {
    const filter = PermissionFilter.create().withModuleName(name);

    const result = await this.repository.find(filter);

    return result.unwrap();
  }
}
