import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { Country } from "Invoicing/Company/Domain/Vo/Country";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { City } from "Shared/Domain/Vo/City.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";
import { State } from "Shared/Domain/Vo/State.vo";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

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

  @Column({
    name: 'co_tenant_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID)
  })
  tenantId!: ID;

  @OneToOne(() => UserModel)
  @JoinColumn({ name: 'co_tenant_id', referencedColumnName: 'id' })
  tenant!: UserModel;

  @Column({ name: 'co_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'co_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}