import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
import { PricingModel } from "Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { RoleModel } from "Shared/Infrastructure/Persistance/Model/RoleModel";
import { ConfigModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_tenant' })
export class TenantModel {
  @PrimaryColumn({ name: 'te_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'te_name', type: 'varchar', transformer: new ValueObjectTransformer<string, Name>(Name) })
  name!: Name;

  @Column({ name: 'te_email', type: 'varchar', transformer: new ValueObjectTransformer<string, Email>(Email) })
  email!: Email;

  @Column({ name: 'te_password', type: 'varchar', transformer: new ValueObjectTransformer<string, Password>(Password) })
  password!: Password;

  @Column({ name: 'te_role_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  roleId!: ID;

  @Column({ name: 'te_config_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  configId!: ID;

  @Column({ name: 'te_company_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  companyId!: ID;

  @Column({ name: 'te_is_active' })
  isActive!: boolean;

  @Column({ name: 'te_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'te_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @OneToOne(() => ConfigModel, { cascade: true })
  @JoinColumn({ name: 'te_config_id', referencedColumnName: 'id' })
  config!: ConfigModel;

  @OneToOne(() => CompanyModel)
  @JoinColumn({ name: 'te_company_id', referencedColumnName: 'id' })
  company!: CompanyModel;

  @OneToOne(() => RoleModel)
  @JoinColumn({ name: 'te_role_id', referencedColumnName: 'id' })
  role!: RoleModel;

  @OneToMany(() => PricingModel, (pricing: PricingModel) => pricing.tenant)
  pricing!: PricingModel[];

  @OneToMany(() => SubscriptionModel, (subscription: SubscriptionModel) => subscription.tenant)
  subscriptions!: SubscriptionModel[];
}
