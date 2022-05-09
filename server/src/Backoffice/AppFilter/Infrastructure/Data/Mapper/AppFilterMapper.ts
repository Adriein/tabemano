import { Prisma } from "@prisma/client";
import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { FilterableField } from "Backoffice/AppFilter/Domain/Entity/FilterableField";
import { ID } from "Shared/Domain/Vo/Id.vo";

const appFilterModel = Prisma.validator<Prisma.ta_app_filterFindManyArgs>()({});

type AppFilterModel = Prisma.ta_app_filterGetPayload<typeof appFilterModel>

export class AppFilterMapper {
  public toDomain(dataModel: AppFilterModel[]): AppFilter[] {
    return dataModel.reduce((filters: AppFilter[], data: AppFilterModel) => {
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
}