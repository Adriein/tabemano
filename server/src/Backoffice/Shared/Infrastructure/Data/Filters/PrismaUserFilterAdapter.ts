import { Prisma } from "@prisma/client";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class PrismaUserFilterAdapter extends PrismaAdapter<Prisma.ta_userFindManyArgs> {
  constructor(private readonly filter: UserFilter) {
    super();
  }

  public apply(): Prisma.ta_userFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has(UserFilter.EMAIL_FILTER)) {
      const email = filters.get(UserFilter.EMAIL_FILTER) as Email;

      this.add({ where: { us_email: email.value } });
    }

    if (filters.has(UserFilter.ROLE_FILTER)) {
      const roleType = filters.get(UserFilter.ROLE_FILTER) as RoleType;

      this.add({ where: { us_role: { ro_type: roleType.value } } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    this.add({
      include: {
        us_config: true,
        us_app_config: true,
        us_role: true,
        us_subscriptions: true,
        us_pricing: true
      }
    })

    return this.prismaFilter;
  }
}