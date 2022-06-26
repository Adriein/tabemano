import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const SubscriptionEventModel = new EntitySchema<SubscriptionEvent>({
  name: 'SubscriptionEvent',
  tableName: 'ta_subscription_events',
  target: SubscriptionEvent,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      name: 'se_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    event: {
      type: 'varchar',
      name: 'se_event',
    },
    subscriptionId: {
      type: 'varchar',
      name: 'se_subscription_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    createdAt: {
      type: 'timestamp',
      name: 'se_created_at',
      precision: 0,
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      name: 'se_updated_at',
      precision: 0,
      updateDate: true,
    }
  }
});

