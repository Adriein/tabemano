import { Prisma } from "@prisma/client";
import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { ID } from "Shared/Domain/Vo/Id.vo";

const appFilterModel = Prisma.validator<Prisma.ta_app_filterFindManyArgs>()({});

type AppFilterModel = Prisma.ta_app_filterGetPayload<typeof appFilterModel>

export class AppFilterMapper {
  public toDomain(dataModel: AppFilterModel): AppFilter {
    return new AppFilter(
      new ID(dataModel.af_id),
      new ID(dataModel.af_tenant_id),
      dataModel.af_entity,
      [],
      dataModel.af_created_at,
      dataModel.af_updated_at,
    );
  }
}