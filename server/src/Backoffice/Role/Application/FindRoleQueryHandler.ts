import { FindRoleQuery } from "Backoffice/Role/Application/FindRoleQuery";
import { FindRoleResponse } from "Backoffice/Role/Application/FindRoleResponse";
import { RoleFilter } from "Backoffice/Role/Domain/Entity/RoleFilter";
import { IRoleRepository } from "Backoffice/Role/Domain/Repository/IRoleRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@QueryHandler(FindRoleQuery)
export class FindRoleQueryHandler implements IQueryHandler<FindRoleResponse> {
  constructor(private readonly repository: IRoleRepository) {}

  @Log()
  public async handle(query: FindRoleQuery): Promise<FindRoleResponse> {
    const type = new RoleType(query.type);

    const filter = new RoleFilter();

    filter.withRoleType(type);

    const result = await this.repository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return FindRoleResponse.fromDomain(result.value);
  }

}