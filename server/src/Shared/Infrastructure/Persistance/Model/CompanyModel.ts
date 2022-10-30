import { Address } from "Shared/Domain/Vo/Address.vo";
import { City } from "Shared/Domain/Vo/City.vo";
import { CompanyType } from "Shared/Domain/Vo/CompanyType.vo";
import { Country } from "Shared/Domain/Vo/Country.vo";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";
import { State } from "Shared/Domain/Vo/State.vo";
import { TenantCompanyModel } from "Shared/Infrastructure/Persistance/Model/TenantCompanyModel";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_company' })
export class CompanyModel {
  @PrimaryColumn({ name: 'co_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'co_name', type: 'varchar', transformer: new ValueObjectTransformer<string, Name>(Name) })
  name!: Name;

  @Column({
    name: 'co_fiscal_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, FiscalId>(FiscalId)
  })
  fiscalId!: FiscalId;

  @Column({
    name: 'co_address',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Address>(Address)
  })
  address!: Address;

  @Column({
    name: 'co_phone',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Phone>(Phone)
  })
  phone!: Phone;

  @Column({
    name: 'co_type',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, CompanyType>(CompanyType)
  })
  type!: CompanyType;

  @Column({
    name: 'co_country',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Country>(Country)
  })
  country!: Country;

  @Column({
    name: 'co_state',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, State>(State)
  })
  state!: State;

  @Column({
    name: 'co_city',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, City>(City)
  })
  city!: City;

  @OneToMany(() => TenantCompanyModel, (tenant: TenantCompanyModel) => tenant.company)
  tenants!: TenantCompanyModel[];

  @Column({ name: 'co_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'co_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}