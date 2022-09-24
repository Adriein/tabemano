import { ID } from 'Shared/Domain/Vo/Id.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AuthModel } from '../../../../Auth/Infrastructure/Persistance/Model/AuthModel';
import { ModuleModel } from './ModuleModel';

@Entity('ta_permission')
export class PermissionModel {
  @PrimaryColumn({
    name: 'um_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'um_tenant_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  tenantId!: ID;

  @ManyToOne(() => AuthModel)
  @JoinColumn({ name: 'um_tenant_id', referencedColumnName: 'id' })
  tenant!: AuthModel;

  @Column({
    name: 'um_module_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  moduleId!: ID;

  @ManyToOne(() => ModuleModel)
  @JoinColumn({ name: 'um_module_id', referencedColumnName: 'id' })
  module!: ModuleModel;
}
