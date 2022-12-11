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

  @Column({ name: 'pr_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'pr_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @OneToMany(() => UrlProductModel, url => url.module, { cascade: true })
  urlList!: UrlProductModel[];
}
