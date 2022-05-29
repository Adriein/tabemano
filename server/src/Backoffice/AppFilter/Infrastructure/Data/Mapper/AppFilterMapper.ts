import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { FilterableField } from "Backoffice/AppFilter/Domain/Entity/FilterableField";
import { AppFilterModel } from "Backoffice/AppFilter/Infrastructure/Data/Model/AppFilterModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class AppFilterMapper implements IMapper<AppFilter[], AppFilterModel> {
  public toDomain(dataModel: any): AppFilter[] {
    return dataModel.reduce((filters: AppFilter[], data: any) => {
      const filter = filters.find((filter: AppFilter) => filter.entity() === data.af_entity);

      if (filter) {
        filter.createField(data.af_field, data.af_values);
        return filters;
      }

      const newFilter = new AppFilter(
        new ID(data.af_id),
        new ID(data.af_tenant_id),
        data.af_entity,
        [ FilterableField.build(data.af_field, data.af_values) ],
        data.af_created_at,
        data.af_updated_at,
      );

      return [ ...filters, newFilter ];
    }, [])
  }

  toModel(entity: AppFilter[]): any {
    return undefined;
  }
}