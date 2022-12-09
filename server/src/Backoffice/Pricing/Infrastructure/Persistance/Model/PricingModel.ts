import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_pricing' })
export class PricingModel {
  @PrimaryColumn({ name: 'pr_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'pr_name', type: 'varchar' })
  name!: string;

  @Column({ name: 'pr_duration', type: 'smallint' })
  duration!: number;

  @Column({
    name: 'pr_price',
    type: 'double precision',
    transformer: new ValueObjectTransformer<number, NumberVo>(NumberVo)
  })
  price!: NumberVo

  @Column({ name: 'pr_currency', type: 'varchar', transformer: new ValueObjectTransformer<string, Currency>(Currency) })
  currency!: Currency;

  @Column({ name: 'pr_tenant_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  tenantId!: ID;

  @Column({ name: 'pr_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'pr_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @ManyToOne(() => TenantModel, (tenant: TenantModel) => tenant.pricing)
  @JoinColumn({
    name: 'pr_tenant_id',
    referencedColumnName: 'id'
  })
  tenant!: TenantModel;
}

