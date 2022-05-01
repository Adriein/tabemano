import { Prisma } from "@prisma/client";
import { RoleFilter } from "Backoffice/Role/Domain/Entities/RoleFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class PrismaRoleFilterAdapter extends PrismaAdapter<Prisma.ta_roleFindManyArgs> {
  constructor(private readonly filter: RoleFilter) {
    super();
  }

  public apply(): Prisma.ta_roleFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has(RoleFilter.ROLE_TYPE_FILTER)) {
      const type = filters.get(RoleFilter.ROLE_TYPE_FILTER) as RoleType;

      this.add({ where: { ro_type: type.value } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.prismaFilter;
  }
}