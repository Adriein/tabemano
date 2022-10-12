import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { FindManyOptions } from "typeorm";

export class TypeOrmTenantFilterAdapter extends TypeOrmAdapter<FindManyOptions<TenantModel>> {
  constructor(private readonly filter: UserFilter) {
    super();
  }

  public apply(): FindManyOptions<TenantModel> {
    const filters = this.filter.apply();

    if (filters.has(UserFilter.ID_FILTER)) {
      const id = filters.get(UserFilter.ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    if (filters.has(UserFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(UserFilter.TENANT_ID_FILTER) as ID;

      this.add({ where: { id: tenantId } });
    }

    if (filters.has(UserFilter.EMAIL_FILTER)) {
      const email = filters.get(UserFilter.EMAIL_FILTER) as Email;

      this.add({ where: { email } });
    }

    if (filters.has(UserFilter.ROLE_FILTER)) {
      const roleType = filters.get(UserFilter.ROLE_FILTER) as RoleType;

      this.add({ where: { role: { type: roleType } } });
    }

    if (filters.has(UserFilter.ACTIVE_FILTER)) {
      const isActive = filters.get(UserFilter.ACTIVE_FILTER) as boolean;

      this.add({ where: { isActive } });
    }

    this.add({ relations: { config: true, pricing: true } })

    return this.typeOrmFilter;
  }
}