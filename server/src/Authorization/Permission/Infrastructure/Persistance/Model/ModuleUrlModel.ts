import { ID } from 'Shared/Domain/Vo/Id.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ModuleModel } from './ModuleModel';
import { UrlModel } from './UrlModule';

@Entity('ta_module_url')
export class UserModuleModel {
  @PrimaryColumn({
    name: 'mu_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'mu_module_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  moduleId!: ID;

  @OneToOne(() => ModuleModel)
  @JoinColumn({ name: 'mu_module_id', referencedColumnName: 'id' })
  module!: ModuleModel;

  @Column({
    name: 'mu_url_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  urlId!: ID;

  @OneToOne(() => UrlModel)
  @JoinColumn({ name: 'mu_url_id', referencedColumnName: 'id' })
  url!: UrlModel;
}
