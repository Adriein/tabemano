import { TenantModel } from "Backoffice/Tenant/Infrastructure/Persistance/Model/TenantModel";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, EntitySchema, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_pricing' })
export class PricingModel {
  @PrimaryColumn({ name: 'pr_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'pr_name', type: 'varchar' })
  name!: string;

  @Column({ name: 'pr_duration', type: 'smallint' })
  duration!: number;

  @Column({ name: 'pr_price', type: 'double precision' })
  price!: number;

  @Column({ name: 'pr_tenant_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  tenantId!: ID;

  @Column({ name: 'pr_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'pr_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @ManyToOne(() => TenantModel, (tenant: TenantModel) => tenant.pricing)
  tenant!: TenantModel;
}

