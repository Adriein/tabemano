import { RoleModel } from "Shared/Infrastructure/Persistance/Model/RoleModel";
import { ConfigModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel";
import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_user' })
export class UserModel {
  @PrimaryColumn({ name: 'us_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'us_name', type: 'varchar', transformer: new ValueObjectTransformer<string, Name>(Name) })
  name!: Name;

  @Column({ name: 'us_email', type: 'varchar', transformer: new ValueObjectTransformer<string, Email>(Email) })
  email!: Email;

  @Column({ name: 'us_password', type: 'varchar', transformer: new ValueObjectTransformer<string, Password>(Password) })
  password!: Password;

  @Column({ name: 'us_tenant_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  tenantId!: ID;

  @Column({ name: 'us_role_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  roleId!: ID;

  @Column({ name: 'us_config_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  configId!: ID;

  @Column({ name: 'us_is_active' })
  isActive!: boolean;

  @Column({ name: 'us_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'us_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @OneToOne(() => ConfigModel, { cascade: true })
  @JoinColumn({ name: 'us_config_id', referencedColumnName: 'id' })
  config!: ConfigModel;

  @OneToOne(() => RoleModel)
  @JoinColumn({ name: 'us_role_id', referencedColumnName: 'id' })
  role!: RoleModel;

  @OneToOne(() => TenantModel)
  @JoinColumn({ name: 'us_tenant_id', referencedColumnName: 'id' })
  tenant!: TenantModel;

  @OneToMany(() => SubscriptionModel, (subscription: SubscriptionModel) => subscription.user)
  subscriptions!: SubscriptionModel[];
}
