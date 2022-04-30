import { Prisma } from "@prisma/client";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgSubscriptionMapper implements IMapper<Subscription, any> {
  public toDomain(): Subscription {
    throw new Error();
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

  public toUpdateDataModel(domain: any): any {
    return undefined;
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
          se_id: history.id().value
        }
      }
    });
  }
}