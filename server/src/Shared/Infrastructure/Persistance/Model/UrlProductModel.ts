import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductModel } from './ProductModel';

@Entity('ta_url')
export class UrlProductModel {
  @PrimaryColumn({
    name: 'ur_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'ur_url',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Url>(Url),
  })
  url!: Url;

  @Column({
    name: 'ur_product_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  moduleId!: ID;

  @Column({ name: 'ur_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'ur_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @ManyToOne(() => ProductModel, product => product.urlList)
  @JoinColumn({ name: 'ur_product_id', referencedColumnName: 'id' })
  module!: ProductModel;
}
