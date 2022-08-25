import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_role' })
export class AuthRoleModel {
  @PrimaryColumn({ name: 'ro_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'ro_type', type: 'varchar', transformer: new ValueObjectTransformer<string, RoleType>(RoleType) })
  type!: RoleType;

  @Column({ name: 'ro_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'ro_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}

