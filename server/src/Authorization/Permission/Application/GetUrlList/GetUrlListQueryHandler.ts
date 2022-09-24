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
  public async execute(query: GetUrlListQuery): Promise<GetUrlListResponse> {
    const moduleName = new Name(query.name);

    const permission = await this.findPermission(moduleName);

    return GetUrlListResponse.fromDomain(permission);
  }

  private async findPermission(name: Name): Promise<Permission> {
    const filter = PermissionFilter.create().withModuleName(name);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}
