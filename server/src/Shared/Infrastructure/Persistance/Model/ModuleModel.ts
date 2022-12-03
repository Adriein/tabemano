import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { UrlModuleModel } from './UrlModuleModel';

@Entity('ta_module')
export class ModuleModel {
  @PrimaryColumn({
    name: 'mo_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'mo_name',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Name>(Name),
  })
  name!: Name;

  @Column({ name: 'mo_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'mo_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @OneToMany(() => UrlModuleModel, url => url.module, { cascade: true })
  urlList!: UrlModuleModel[];
}
