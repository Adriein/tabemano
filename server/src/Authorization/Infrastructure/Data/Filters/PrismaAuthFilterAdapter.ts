import { Prisma } from "@prisma/client";
import { AuthFilter } from "Authorization/Domain/Entities/AuthFilter";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class PrismaAuthFilterAdapter extends PrismaAdapter<Prisma.ta_userFindManyArgs> {
  constructor(private readonly filter: AuthFilter) {
    super();
  }

  public apply(): Prisma.ta_userFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has('email')) {
      const email = filters.get('email') as Email;

      this.merge({ where: { us_email: email.value } });
    }

    if (filters.has('page') && filters.has('quantity')) {
      const page = filters.get('page') as number;
      const quantity = filters.get('quantity') as number;

      this.merge(this.pagination(page, quantity))
    }

    this.merge({ include: { us_config: true, us_app_config: true, us_role: true, us_subscriptions: true } })

    return this.prismaFilter;
  }
}