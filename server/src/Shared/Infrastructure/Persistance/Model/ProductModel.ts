import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { StringVo } from "Shared/Domain/Vo/String.vo";
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { UrlProductModel } from './UrlProductModel';

@Entity('ta_product')
export class ProductModel {
  @PrimaryColumn({
    name: 'pr_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'pr_name',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Name>(Name),
  })
  name!: Name;

  @Column({
    name: 'pr_price',
    type: 'varchar',
    transformer: new ValueObjectTransformer<number, NumberVo>(NumberVo),
  })
  price!: NumberVo;

  @Column({
    name: 'pr_currency',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Currency>(Currency),
  })
  currency!: Currency;

  @Column({
    name: 'pr_country',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, StringVo>(StringVo),
  })
  country!: StringVo;

  @Column({
    name: 'pr_description',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, StringVo>(StringVo),
  })
  description!: StringVo;

  @Column({
    name: 'pr_is_active',
    type: 'boolean',
  })
  isActive!: boolean;

  @Column({ name: 'pr_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'pr_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @OneToMany(() => UrlProductModel, url => url.module, { cascade: true })
  urlList!: UrlProductModel[];
}
