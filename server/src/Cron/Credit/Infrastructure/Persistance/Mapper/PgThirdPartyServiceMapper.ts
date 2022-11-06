import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { ThirdPartyServiceModel } from '../../../../../Shared/Infrastructure/Persistance/Model/ThirdPartyServiceModel';

export class PgThirdPartyServiceMapper
  implements IMapper<ThirdPartyService, ThirdPartyServiceModel>
{
  toDomain(dataModel: ThirdPartyServiceModel): ThirdPartyService {
    return new ThirdPartyService(
      dataModel.id,
      dataModel.name,
      dataModel.remainingCredit,
      dataModel.minRemainingCreditBeforeNotifying,
      dataModel.notify,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  toModel(entity: ThirdPartyService): ThirdPartyServiceModel {
    const model = new ThirdPartyServiceModel();

    model.id = entity.id();
    model.name = entity.name();
    model.remainingCredit = entity.remainingCredit();
    model.minRemainingCreditBeforeNotifying = entity.minRemainingCreditBeforeNotifying();
    model.notify = entity.hasToBeNotified();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }
}
