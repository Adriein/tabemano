import { Prisma } from "@prisma/client";
import { SUBSCRIPTION_STATUS } from "Backoffice/Shared/constants";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { SubscriptionEventCollection } from "Backoffice/Shared/Domain/Subscription/SubscriptionEventCollection";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

const subscriptionModel = Prisma.validator<Prisma.ta_subscriptionFindManyArgs>()({
  include: {
    su_events: true
  }
});

type SubscriptionModel = Prisma.ta_subscriptionGetPayload<typeof subscriptionModel>

export class PgSubscriptionMapper {
  /*public toDomain(dataModel: SubscriptionModel): Subscription {
   const pricing = new Pricing(
   new ID(dataModel.su_pricing_id),
   dataModel.su_price_name,
   dataModel.su_price,
   dataModel.su_duration,
   );

   const events = new SubscriptionEventCollection(
   dataModel.su_events.map((event) => new SubscriptionEvent(
   new ID(event.se_id),
   event.se_event as SUBSCRIPTION_STATUS,
   event.se_created_at,
   event.se_updated_at
   ))
   );

   return new Subscription(
   new ID(dataModel.su_id),
   new ID(dataModel.su_user_id),
   new DateVo(dataModel.su_payment_date),
   new DateVo(dataModel.su_valid_to),
   dataModel.su_is_active,
   dataModel.su_is_expired,
   pricing,
   events,
   dataModel.su_created_at,
   dataModel.su_updated_at
   );
   }

   public toSaveDataModel(entity: Subscription): Prisma.ta_subscriptionCreateInput {
   return {
   su_id: entity.id().value,
   su_price_name: entity.pricingName(),
   su_duration: entity.duration(),
   su_price: entity.price(),
   su_is_active: entity.isActive(),
   su_is_expired: entity.isExpired(),
   su_payment_date: entity.paymentDate(),
   su_valid_to: entity.validTo(),
   su_created_at: entity.createdAt(),
   su_updated_at: entity.updatedAt(),
   su_pricing: {
   connect: {
   pr_id: entity.pricingId().value
   }
   },
   su_user: {
   connect: {
   us_id: entity.userId().value
   }
   },
   su_events: {
   connectOrCreate: this.subscriptionHistoryCreate(entity)
   }
   }
   }

   public toUpdateDataModel(entity: Subscription): Prisma.ta_subscriptionUpdateInput {
   return {
   su_id: entity.id().value,
   su_price_name: entity.pricingName(),
   su_duration: entity.duration(),
   su_price: entity.price(),
   su_is_active: entity.isActive(),
   su_is_expired: entity.isExpired(),
   su_payment_date: entity.paymentDate(),
   su_valid_to: entity.validTo(),
   su_created_at: entity.createdAt(),
   su_updated_at: entity.updatedAt(),
   su_pricing: {
   connect: {
   pr_id: entity.pricingId().value
   }
   },
   su_user: {
   connect: {
   us_id: entity.userId().value
   }
   },
   su_events: {
   connectOrCreate: this.subscriptionHistoryCreate(entity)
   }
   }
   }

   private subscriptionHistoryCreate(domain: Subscription) {
   return domain.events().data().map((history: SubscriptionEvent) => {
   return {
   create: {
   se_id: history.id().value,
   se_event: history.event(),
   se_created_at: history.createdAt(),
   se_updated_at: history.updatedAt()
   },
   where: {
   se_id: domain.id().value
   }
   }
   });
   }*/
}