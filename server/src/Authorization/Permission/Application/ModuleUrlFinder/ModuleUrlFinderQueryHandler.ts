import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { ModuleUrlFinderQuery } from './ModuleUrlFinderQuery';
import { ModuleUrlFinderResponse } from './ModuleUrlFinderResponse';

@QueryHandler(ModuleUrlFinderQuery)
export class ModuleUrlFinderQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IPermissionRepository') private readonly repository: IPermissionRepository
  ) {}

  @Log()
  public async execute(query: ModuleUrlFinderQuery): Promise<ModuleUrlFinderResponse> {
    const moduleName = new Name(query.name);

    const permission = await this.findPermission(moduleName);

    return ModuleUrlFinderResponse.fromDomain(permission);
  }

  private async findPermission(name: Name): Promise<Permission> {
    const filter = PermissionFilter.create().withModuleName(name);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}
