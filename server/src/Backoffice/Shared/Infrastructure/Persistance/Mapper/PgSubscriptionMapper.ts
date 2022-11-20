import { SUBSCRIPTION_STATUS } from "Backoffice/Shared/constants";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { SubscriptionEventCollection } from "Backoffice/Shared/Domain/Subscription/SubscriptionEventCollection";
import { SubscriptionEventModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionEventModel";
import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";


export class PgSubscriptionMapper implements IMapper<Subscription, SubscriptionModel> {
  public toDomain(dataModel: SubscriptionModel): Subscription {
    const eventCollection = this.buildEventCollection(dataModel);

    return new Subscription(
      dataModel.id,
      dataModel.pricingId,
      dataModel.paymentDate,
      dataModel.validTo,
      dataModel.isActive,
      dataModel.isExpired,
      dataModel.pricingName,
      dataModel.duration,
      dataModel.price,
      eventCollection,
      dataModel.userId!,
      dataModel.tenantId!,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Subscription): SubscriptionModel {
    const events = this.buildEventModel(entity);

    const model = new SubscriptionModel();

    model.id = entity.id();
    model.userId = entity.userId()!;
    model.tenantId = entity.tenantId()!;
    model.isExpired = entity.isExpired();
    model.isActive = entity.isActive();
    model.paymentDate = entity.paymentDate();
    model.validTo = entity.validTo();
    model.pricingId = entity.pricingId();
    model.pricingName = entity.pricingName();
    model.duration = entity.duration();
    model.price = entity.price();
    model.events = events;
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }

  private buildEventCollection(dataModel: SubscriptionModel): SubscriptionEventCollection {
    return new SubscriptionEventCollection(dataModel.events.map((event: SubscriptionEventModel) => {
      return new SubscriptionEvent(
        event.id,
        event.event as SUBSCRIPTION_STATUS,
        event.subscriptionId,
        event.createdAt,
        event.updatedAt
      )
    }));
  }

  private buildEventModel(entity: Subscription): SubscriptionEventModel[] {
    return entity.events().data().map((event: SubscriptionEvent) => {
      const model = new SubscriptionEventModel();

      model.id = event.id();
      model.event = event.event();
      model.subscriptionId = event.subscriptionId();
      model.createdAt = event.createdAt();
      model.updatedAt = event.updatedAt();

      return model;
    })
  }
}