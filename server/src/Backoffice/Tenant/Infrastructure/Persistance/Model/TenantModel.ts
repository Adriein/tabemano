import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { User } from "Backoffice/Shared/Domain/User/User";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema, OneToOne, Column, ValueTransformer } from "typeorm";

export const TenantModel = new EntitySchema<Tenant>({
  name: 'Tenant',
  tableName: 'ta_user',
  target: Tenant,
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
    config: {
      type: 'varchar',
      name: 'us_config_id',
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
  },
  relations: {
    config: {
      type: 'one-to-one',
      target: 'Config',
      joinColumn: {
        name: 'us_config_id',
        referencedColumnName: 'id'
      }
    }
  }
});

