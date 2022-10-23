import { ID } from "Shared/Domain/Vo/Id.vo";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_tenant_company' })
export class TenantCompanyModel {
  @PrimaryColumn({ name: 'teco_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'teco_tenant_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  tenantId!: ID;

  @Column({ name: 'teco_company_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  companyId!: ID;

  @ManyToOne(() => TenantModel, (tenant: TenantModel) => tenant.companies)
  @JoinColumn({ name: 'teco_tenant_id', referencedColumnName: 'id' })
  tenant!: TenantModel;

  @ManyToOne(() => CompanyModel, (company: CompanyModel) => company.tenants)
  @JoinColumn({ name: 'teco_company_id', referencedColumnName: 'id' })
  company!: CompanyModel;

  @Column({ name: 'teco_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'teco_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}
