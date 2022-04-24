import { Prisma } from "@prisma/client";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entities/PricingFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
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

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.prismaFilter;
  }
}