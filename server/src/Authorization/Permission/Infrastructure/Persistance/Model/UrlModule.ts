import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ta_url')
export class UrlModel {
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

  @Column({ name: 'ur_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'ur_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}
