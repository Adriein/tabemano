import { SubscriptionEventModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionEventModel";
import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_subscription' })
export class SubscriptionModel {
  @PrimaryColumn({
    name: 'su_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID)
  })
  id!: ID;

  @Column({
    name: 'su_payment_date',
    type: 'timestamp',
    precision: 0,
    transformer: new ValueObjectTransformer<string, DateVo>(DateVo)
  })
  paymentDate!: DateVo;

  @Column({
    name: 'su_valid_to',
    type: 'timestamp',
    precision: 0,
    transformer: new ValueObjectTransformer<string, DateVo>(DateVo)
  })
  validTo!: DateVo;

  @Column({ name: 'su_is_active' })
  isActive!: boolean;

  @Column({ name: 'su_is_expired' })
  isExpired!: boolean;

  @Column({ name: 'su_duration', type: 'smallint' })
  duration!: number;

  @Column({ name: 'su_price_name' })
  pricingName!: string;

  @Column({
    name: 'su_price',
    type: 'double precision',
    transformer: new ValueObjectTransformer<string, NumberVo>(NumberVo)
  })
  price!: NumberVo;

  @Column({ name: 'su_currency', type: 'varchar', transformer: new ValueObjectTransformer<string, Currency>(Currency) })
  currency!: Currency;

  @Column({ name: 'su_pricing_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  pricingId!: ID;

  @Column({
    name: 'su_user_id',
    type: 'varchar',
    nullable: true,
    transformer: new ValueObjectTransformer<string, ID>(ID)
  })
  userId!: ID | null;

  @Column({
    name: 'su_tenant_id',
    type: 'varchar',
    nullable: true,
    transformer: new ValueObjectTransformer<string, ID>(ID)
  })
  tenantId!: ID | null;

  @Column({ name: 'su_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'su_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @OneToMany(
    () => SubscriptionEventModel,
    (events: SubscriptionEventModel) => events.subscription,
    { cascade: true }
  )
  events!: SubscriptionEventModel[];

  @ManyToOne(() => UserModel, (user: UserModel) => user.subscriptions)
  @JoinColumn({
    name: 'su_user_id',
    referencedColumnName: 'id'
  })
  user!: UserModel;

  @ManyToOne(() => TenantModel, (tenant: TenantModel) => tenant.subscriptions)
  @JoinColumn({
    name: 'su_tenant_id',
    referencedColumnName: 'id'
  })
  tenant!: TenantModel;
}