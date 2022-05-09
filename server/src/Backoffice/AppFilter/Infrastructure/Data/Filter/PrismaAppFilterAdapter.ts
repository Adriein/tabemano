import { Prisma } from "@prisma/client";
import { AppFilterFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilterFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class PrismaAppFilterAdapter extends PrismaAdapter<Prisma.ta_app_filterFindManyArgs> {
  constructor(private readonly filter: AppFilterFilter) {
    super();
  }

  public apply(): Prisma.ta_app_filterFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has(AppFilterFilter.ENTITIES_FILTER)) {
      const entities = filters.get(AppFilterFilter.ENTITIES_FILTER) as string[];

      this.add({ where: { af_entity: { in: entities } } });
    }

    if (filters.has(AppFilterFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(AppFilterFilter.TENANT_ID_FILTER) as ID;

      this.add({ where: { af_tenant_id: tenantId.value } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.prismaFilter;
  }
}