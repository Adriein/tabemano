import { Role } from "Backoffice/Role/Domain/Entity/Role";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const RoleModel = new EntitySchema<Role>({
  name: 'Role',
  tableName: 'ta_role',
  target: Role,
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      name: 'ro_id',
      transformer: new ValueObjectTransformer<string, ID>(ID)
    },
    type: {
      type: 'varchar',
      name: 'ro_type',
      transformer: new ValueObjectTransformer<string, RoleType>(RoleType)
    },
    createdAt: {
      type: 'timestamp',
      name: 'ro_created_at',
      precision: 0,
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      name: 'ro_updated_at',
      precision: 0,
      updateDate: true,
    }
  }
});

