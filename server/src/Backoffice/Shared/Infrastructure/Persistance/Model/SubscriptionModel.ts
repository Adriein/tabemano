import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { User } from "Backoffice/Shared/Domain/User/User";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const SubscriptionModel = new EntitySchema<any>({
  name: 'User',
  tableName: 'ta_user',
  target: User,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      name: 'us_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    name: {
      type: 'varchar',
      name: 'us_name',
      transformer: new ValueObjectTransformer<string, Name>(Name)
    },
    email: {
      type: 'varchar',
      name: 'us_email',
      transformer: new ValueObjectTransformer<string, Email>(Email)
    },
    password: {
      type: 'varchar',
      name: 'us_password',
      transformer: new ValueObjectTransformer<string, Password>(Password)
    },
    tenantId: {
      type: 'varchar',
      name: 'us_tenant_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    roleId: {
      type: 'varchar',
      name: 'us_role_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    isActive: {
      type: 'boolean',
      name: 'us_is_active',
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
})