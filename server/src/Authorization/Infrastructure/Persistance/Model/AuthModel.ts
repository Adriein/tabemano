import { Auth } from "Authorization/Domain/Entity/Auth";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const AuthModel = new EntitySchema<any>({
  name: 'Auth',
  tableName: 'ta_user',
  target: Auth,
  columns: {
    _id: {
      type: 'varchar',
      primary: true,
      name: 'us_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    _name: {
      type: 'varchar',
      name: 'us_name',
    },
    _email: {
      type: 'varchar',
      name: 'us_email',
      transformer: new ValueObjectTransformer<string, Email>(Email)
    },
    _password: {
      type: 'varchar',
      name: 'us_password',
      transformer: new ValueObjectTransformer<string, Password>(Password)
    },
    _roleId: {
      type: 'varchar',
      name: 'us_role_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    _createdAt: {
      type: 'timestamp',
      name: 'us_created_at',
      precision: 0,
      createDate: true,
    },
    _updatedAt: {
      type: 'timestamp',
      name: 'us_updated_at',
      precision: 0,
      updateDate: true,
    }
  }
});

