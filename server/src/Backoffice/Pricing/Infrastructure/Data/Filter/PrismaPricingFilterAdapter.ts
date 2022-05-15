import { Prisma } from "@prisma/client";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class PrismaPricingFilterAdapter extends PrismaAdapter<Prisma.ta_pricingFindManyArgs> {
  constructor(private readonly filter: PricingFilter) {
    super();
  }

  public apply(): Prisma.ta_pricingFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has(PricingFilter.NAME_FILTER)) {
      const name = filters.get(PricingFilter.NAME_FILTER) as string;

      this.add({ where: { pr_name: name } });
    }

    if (filters.has(PricingFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(PricingFilter.TENANT_ID_FILTER) as ID;

      this.add({ where: { pr_tenant_id: tenantId.value } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.prismaFilter;
  }
}