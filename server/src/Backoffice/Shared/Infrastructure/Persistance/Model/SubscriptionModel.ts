import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { User } from "Backoffice/Shared/Domain/User/User";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const SubscriptionModel = new EntitySchema<Subscription>({
  name: 'Subscription',
  tableName: 'ta_subscription',
  target: Subscription,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      name: 'su_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    paymentDate: {
      type: 'timestamp',
      name: 'su_payment_date',
      precision: 0,
      transformer: new ValueObjectTransformer<string, DateVo>(DateVo)
    },
    validTo: {
      type: 'timestamp',
      name: 'su_valid_to',
      precision: 0,
      transformer: new ValueObjectTransformer<string, DateVo>(DateVo)
    },
    isActive: {
      type: 'boolean',
      name: 'su_is_active',
    },
    isExpired: {
      type: 'boolean',
      name: 'su_is_expired',
    },
    duration: {
      type: 'smallint',
      name: 'su_duration',
    },
    pricingName: {
      type: 'varchar',
      name: 'su_price_name',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    createdAt: {
      type: 'timestamp',
      name: 'us_created_at',
      precision: 0,
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      name: 'us_updated_at',
      precision: 0,
      updateDate: true,
    }
  }
});

