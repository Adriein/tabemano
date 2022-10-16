import { Client } from "Cron/Client/Domain/Entity/Client";
import { Config } from "Cron/Client/Domain/Entity/Config";
import { Subscription } from "Cron/Client/Domain/Entity/Subscription";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";

export class PgClientMapper implements IMapper<Client, UserModel> {
  public toDomain(dataModel: UserModel): Client {
    const config = new Config(
      dataModel.config.id,
      dataModel.config.sendNotifications,
      dataModel.config.sendWarnings,
    );

    const subscription = dataModel!.subscriptions[0];

    const userId = subscription.userId ? subscription.userId : subscription.tenantId;

    const activeSubscription = new Subscription(
      subscription.id,
      userId!,
      subscription.pricingId,
      subscription.paymentDate,
      subscription.validTo,
      subscription.isActive,
      subscription.isExpired,
      subscription.pricingName,
      subscription.duration,
      subscription.createdAt,
      subscription.updatedAt,
    );

    return new Client(
      dataModel!.id,
      dataModel!.name,
      dataModel!.email,
      config,
      activeSubscription,
      5,
      dataModel!.isActive,
      dataModel!.createdAt,
      dataModel!.updatedAt,
    );
  }

  public toModel(entity: Client): UserModel {
    throw new Error('Not implemented')
  }

}