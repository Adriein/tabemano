import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { Country } from "Invoicing/Company/Domain/Vo/Country";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_company' })
export class CompanyModel {
  @PrimaryColumn({ name: 'co_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({
    name: 'co_name',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, CompanyName>(CompanyName)
  })
  name!: CompanyName;

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
    type: 'int',
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
    name: 'co_tenant_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID)
  })
  tenantId!: ID;
}