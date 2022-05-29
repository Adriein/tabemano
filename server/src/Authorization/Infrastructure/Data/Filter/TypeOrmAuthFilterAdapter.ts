import { Prisma } from "@prisma/client";
import { AuthFilter } from "Authorization/Domain/Entity/AuthFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class TypeOrmAuthFilterAdapter extends PrismaAdapter<Prisma.ta_userFindManyArgs> {
  constructor(private readonly filter: AuthFilter) {
    super();
  }

  public apply(): Prisma.ta_userFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has(AuthFilter.EMAIL_FILTER)) {
      const email = filters.get(AuthFilter.EMAIL_FILTER) as Email;

      this.add({ where: { us_email: email.value } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    this.add({ include: { us_config: true, us_app_config: true, us_role: true, us_subscriptions: true } })

    return this.prismaFilter;
  }
}