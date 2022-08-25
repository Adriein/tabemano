import { RoleModel } from "Backoffice/Role/Infrastructure/Persistance/Model/RoleModel";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('ta_user')
export class AuthModel {
  @PrimaryColumn({ name: 'us_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'us_name', type: 'varchar', transformer: new ValueObjectTransformer<string, Name>(Name) })
  name!: Name;

  @Column({ name: 'us_email', type: 'varchar', transformer: new ValueObjectTransformer<string, Email>(Email) })
  email!: Email;

  @Column({ name: 'us_password', type: 'varchar', transformer: new ValueObjectTransformer<string, Password>(Password) })
  password!: Password;

  @Column({ name: 'us_role_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  roleId!: ID;

  @OneToOne(() => RoleModel)
  @JoinColumn({ name: 'us_role_id', referencedColumnName: 'id' })
  role!: RoleModel;

  @Column({ name: 'us_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'us_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}
