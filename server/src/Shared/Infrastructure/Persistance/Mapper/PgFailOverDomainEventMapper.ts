import { FailOverDomainEvent } from "Shared/Domain/Entities/FailOverDomainEvent";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { DomainEventFailOverModel } from "Shared/Infrastructure/Persistance/Model/DomainEventFailOverModel";

export class PgFailOverDomainEventMapper implements IMapper<FailOverDomainEvent, DomainEventFailOverModel> {
  toDomain(dataModel: DomainEventFailOverModel): FailOverDomainEvent {
    throw new Error();
  }

  public toModel(entity: FailOverDomainEvent): DomainEventFailOverModel {
    const model = new DomainEventFailOverModel();

    model.id = entity.id();
    model.domainEvent = entity.serializeDomainEvent();
    model.error = entity.serializeError();
    model.ack = false;
    model.retry = true;
    model.createdAt = DateVo.now().value;
    model.updatedAt = DateVo.now().value;

    return model;
  }

}